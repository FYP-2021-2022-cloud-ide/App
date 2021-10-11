// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import type { NextApiRequest, NextApiResponse } from 'next'
//import { ServiceError } from 'grpc';
type Data = {
  message: string[]
}
import * as grpc from 'grpc';
import { LoginRequest , ListReply, CheckHaveContainerRequest , StringReply} from './proto/dockerGet/dockerGet_pb';
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
import { auth, claimEquals, OpenidRequest, requiresAuth } from 'express-openid-connect';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { parse } from 'url';
//import fetch from "node-fetch";

const SESSION_VALID_FOR = 8 * 60 * 60 * 1000;

type CASJwtPayload = JwtPayload & { 
  sub:string;
  name:string;
 };

app.prepare().then(() => {
  var server = express()
  var httpServer = http.createServer(server)

  httpServer.on('upgrade', function(req: Request, socket: Socket, head: Header){
    // req.url = req.url.replace('/user/container/'+ req.params.id, '');
    var sample = "/user/container/b00aa1064a69"
    var sample2 = '/user/container/'
    var userPosition = req.url.search("/user/container/")
    var id = req.url.slice(
      userPosition+ sample2.length,
      userPosition+ sample.length);
    req.url = req.url.slice(userPosition+sample.length,);
    console.log(id)
    proxy.ws(req, socket, head, {target: 'http://'+id+':8080/'} );
  })
  
  server.use(cookieParser())
  server.enable('trust proxy')
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
          const { sub, name } = additionalUserClaims.data;
          // const { userId, semesterId } = await getUserData(sub, name!);
          // const userId = '20605387'
          // const semesterId = 'testing2213'
          // res.cookie('semester', semesterId, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `.${process.env.HOSTNAME}` });
          res.cookie('sub', sub);
          res.cookie('user', name);
        } catch (error) {
          throw error
        }
        return {
          ...session,
        };


        // console.log(session)
        // var decodedJWT = jwt_decode<CASJwtPayload>(session.id_token);
        // var target= 'api:50051';
        // var client = new DockerClient(
        //   target,
        //   grpc.credentials.createInsecure());
        // var body = decodedJWT;
        // // set cookie
        // console.log(req.cookies) 

        // var docReq = new LoginRequest();
        // docReq.setSub(body.sub);
        // docReq.setName(body.name);
        // res.cookie('sub', body.sub)
        // res.cookie('name', body.name)
        // try{
        //   client.login(docReq, function(err, GoLangResponse:ListReply) {
        //     var mes = GoLangResponse.getMessageList();
        //     console.log(mes, err);
        //   })
        // }
        // catch(error) {
        //   console.log('error');
        // }
        // return session;
      }
   })
  )

  server.all('/user/container/:id/*', async function(req: Request, res: Response){    
    try{
      req.url = req.url.replace('/user/container/'+ req.params.id+'/', '');
      proxy.web(req, res, {target: 'http://'+req.params.id+':8080/'})
    }
    catch(error){
      console.log(error)
    }
  });

  server.all('*',requiresAuth(), (req, res) => {
    return handle(req, res);
  })

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})