// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import type { NextApiRequest, NextApiResponse } from 'next'
//import { ServiceError } from 'grpc';
type Data = {
  message: string[]
}
import * as grpc from 'grpc';
import { SubRequest, ListContainerReply, InstantAddContainerRequest, AddContainerReply, SectionAndSubRequest, GetSectionInfoReply } from './proto/dockerGet/dockerGet_pb';
import { DockerClient } from './proto/dockerGet/dockerGet_grpc_pb';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Header } from 'next/dist/lib/load-custom-routes';
import { Socket } from 'node:dgram';
import axios from "axios";

// rest of the code remains same
//const { createProxyMiddleware } = require('http-proxy-middleware')
const next = require('next')
const port = 3000
const dev = process.env.NODE_ENV !== 'production'
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({ws: true});
// var proxy = require('express-http-proxy');
var http = require('http')
const cookieParser = require('cookie-parser');
const app = next({ dev })
const handle = app.getRequestHandler()
import { auth, requiresAuth } from 'express-openid-connect';
//import fetch from "node-fetch";

const SESSION_VALID_FOR = 8 * 60 * 60 * 1000;
const ID_LENGTH = 12;

app.prepare().then(() => {
  var server = express()
  var httpServer = http.createServer(server)

  httpServer.on('upgrade', function(req: Request, socket: Socket, head: Header){
    // req.url = req.url.replace('/user/container/'+ req.params.id, '');
    var baseURL = '/user/container/'
    var userPosition = req.url.search(baseURL)
    var id = req.url.slice(
      userPosition+ baseURL.length,
      userPosition+ baseURL.length + ID_LENGTH);
    req.url = req.url.slice(userPosition + baseURL.length + ID_LENGTH);
    console.log(id)
    proxy.ws(req, socket, head, {target: 'http://'+id+':8080/'} );
  })
  
  server.use(cookieParser())
  server.enable('trust proxy')


  // authentication 
  server.use(
   auth({
    issuerBaseURL: 'https://cas.ust.hk/cas/oidc',
    baseURL: 'https://codespace.ust.dev',
    clientID: '20008',
    clientSecret: 'YatwZXDyx52gz644DFn8ZsheigCaz5GPRuT48I7n',
    secret: 'thisisasddfvsdavsadfgvdsvdsgdfstest',
    authorizationParams:{
      response_type: 'code',
      scope: 'openid profile email'
    },
    afterCallback: async (req, res, session, decodedState) => {
      try {
        const additionalUserClaims = await axios('https://cas.ust.hk/cas/oidc'+'/profile', {
          headers:{
            Authorization: 'Bearer ' + session.access_token
          }
        });
        // @ts-ignore
        req.appSession!.openidTokens = session.access_token;
        // @ts-ignore
        req.appSession!.userIdentity = additionalUserClaims.data;
        const { sub, name, email } = additionalUserClaims.data;
        res.cookie('sub', sub, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `.${process.env.HOSTNAME}` });
        res.cookie('name', name, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `.${process.env.HOSTNAME}` });
        res.cookie('email', email, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `.${process.env.HOSTNAME}` });
      } catch (error) {
        throw error
      }
      return {
        ...session,
      };
    }
   })
  )


  // authentication logout 
  server.all('/logout', async function(req: Request, res: Response){
    console.log('logout inside')
    res.oidc!.logout({returnTo: '/' });
    // @ts-ignore
    req.appSession!.destroy((err) => {
      if(err) {
        console.error(err);
      }
      res.oidc!.logout({returnTo: '/' });
    });
  });


  // grpc api route 
  server.all('/course/:sectionId/:role', async function(req: Request, res: Response){
    try{
      console.log('inside role checking')
      var target= 'api:50051';
      var client = new DockerClient(
        target,
        grpc.credentials.createInsecure()
      );
      var docReq = new SectionAndSubRequest();
      docReq.setSub(req.oidc.user!.sub)
      docReq.setSectionid(req.params.sectionId)
      client.getSectionInfo(docReq, function(err, GolangResponse: GetSectionInfoReply){
        if(!GolangResponse.getSuccess()){
          console.log(GolangResponse.getMessage())
          res.redirect('/')
        }else{
          if(GolangResponse.getRole() != req.params.role){
            console.log(GolangResponse.getRole())
            console.log(req.params.role)
            res.redirect('/')
          }else{
            return handle(req, res);
          }
        }
      })
    }catch(error){
      console.log(error)
      res.redirect('/')
    }
  })

  // grpc api route 
  server.all('/quickAssignmentInit/:templateID', async function(req: Request, res: Response){
    try{
      var target= 'api:50051';
      var client = new DockerClient(
        target,
        grpc.credentials.createInsecure()
      );
      var docReq = new InstantAddContainerRequest();
      docReq.setSub(req.oidc.user!.sub)
      docReq.setTemplateId(req.params.templateID)
      client.instantAddContainer(docReq, function(err, GoLangResponse: AddContainerReply){
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
          res.redirect('/')
        }else{
          res.redirect(`/user/container/${GoLangResponse.getContainerid()}/`)
        }
      })
    }
    catch(error){
      console.log(error)
      res.redirect('/')
    }
  })
  
  // grpc api route 
  server.all('/user/container/:id/*', async function(req: Request, res: Response){    
    try{
      var target= 'api:50051';
      var client = new DockerClient(
        target,
        grpc.credentials.createInsecure()
      );
      var docReq = new SubRequest();
      docReq.setSub(req.oidc.user!.sub);
      client.listContainers(docReq, function(err, GoLangResponse: ListContainerReply) {
        if(!GoLangResponse.getSuccess()){
          console.log(GoLangResponse.getMessage())
          res.redirect('/')
        }
        var containers = GoLangResponse.getContainersList();
        var tempContainers = GoLangResponse.getTempcontainersList();
        const list = containers.map( containers =>{
          return (containers.getContainerid())
        })
        const tempList = tempContainers.map( containers =>{
          return (containers.getContainerid())
        })
        if(list.includes(req.params.id) || tempList.includes(req.params.id)){
          console.log('authenticated')
          req.url = req.url.replace('/user/container/'+ req.params.id+'/', '');
          proxy.web(req, res, {target: 'http://'+req.params.id+':8080/'})
        }else{
          console.log('unauthenticated')
          res.redirect('/')
        }
      })
    }
    catch(error){
      console.log(error)
      res.redirect('/')
    }
  });

  // real
  server.all('*',requiresAuth(), (req, res) => {
    return handle(req, res);
  })

  //testing 
  // server.all('*' ,  (req, res) => {
  //   res.cookie('sub', "mlkyeung");
  //   res.cookie('name', "Yeung Man Lung Ken");
  //   res.cookie('email', "mlkyeung@connect.ust.hk");
  //   return handle(req, res);
  // })

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})