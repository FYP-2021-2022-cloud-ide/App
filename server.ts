// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import type { NextApiRequest, NextApiResponse } from 'next'
//import { ServiceError } from 'grpc';
type Data = {
  message: string[]
}
import * as grpc from 'grpc';
import { SubRequest, ListContainerReply, InstantAddContainerRequest, AddContainerReply, SectionAndSubRequest, GetSectionInfoReply, GetUserDataReply } from './proto/dockerGet/dockerGet_pb';
import { DockerClient } from './proto/dockerGet/dockerGet_grpc_pb';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Socket } from 'node:dgram';
import axios from "axios";

// rest of the code remains same
//const { createProxyMiddleware } = require('http-proxy-middleware')
const next = require('next')
const port = 3000
const dev = process.env.NODE_ENV !== 'production'
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({ ws: true });
// var proxy = require('express-http-proxy');
var http = require('http')
const cookieParser = require('cookie-parser');
const app = next({ dev })
const handle = app.getRequestHandler()
import { auth, requiresAuth } from 'express-openid-connect';
import { Header } from 'next/dist/lib/load-custom-routes';
//import fetch from "node-fetch";

const SESSION_VALID_FOR = 8 * 60 * 60 * 1000;
const ID_LENGTH = 12;


app.prepare().then(() => {
  var server = express()
  var httpServer = http.createServer(server)

  httpServer.on('upgrade', function (req: Request, socket: Socket, head: Header) {
    // req.url = req.url.replace('/user/container/'+ req.params.id, '');
    if (req.url.search('/_next/webpack-hmr') == -1){
      var baseURL = '/user/container/'
      var userPosition = req.url.search(baseURL)
      var id = req.url.slice(
        userPosition + baseURL.length,
        userPosition + baseURL.length + ID_LENGTH);
      req.url = req.url.slice(userPosition + baseURL.length + ID_LENGTH);
      console.log(id)
      proxy.ws(req, socket, head, { target: 'http://' + id + ':8080/' });
    }else{
      proxy.ws(req, socket, head, { target: req.url });
    }
    
  })

  // server.use(cookieParser())
  server.enable('trust proxy')


  // authentication 
  server.use(
    auth({
      issuerBaseURL: 'https://cas.ust.hk/cas/oidc',
      baseURL: 'https://codespace.ust.dev',
      clientID: '20008',
      clientSecret: 'YatwZXDyx52gz644DFn8ZsheigCaz5GPRuT48I7n',
      secret: 'thisisasddfvsdavsadfgvdsvdsgdfstest',
      authorizationParams: {
        response_type: 'code',
        scope: 'openid profile email'
      },
      session:{
        rolling:false,
        absoluteDuration:SESSION_VALID_FOR/1000,
      },
      afterCallback: async (req, res, session, decodedState) => {
        try {
          const additionalUserClaims = await axios('https://cas.ust.hk/cas/oidc' + '/profile', {
            headers: {
              Authorization: 'Bearer ' + session.access_token
            }
          });
          // @ts-ignore
          req.appSession!.openidTokens = session.access_token;
          session.expired_at
          // @ts-ignore
          req.appSession!.userIdentity = additionalUserClaims.data;
          const { sub, name, email } = additionalUserClaims.data;
          var target = 'api:50051';
          var client = new DockerClient(
            target,
            grpc.credentials.createInsecure()
          );
          console.log(client)
          var docReq = new SubRequest()
          docReq.setSub(sub)

          await new Promise((resolve, reject) => {
            client.getUserData(docReq, function (err, GolangResponse: GetUserDataReply) {
              resolve({
                userId: GolangResponse.getUserid(),
                semesterId: GolangResponse.getSemesterid(),
                darkMode:GolangResponse.getDarkmode(),
                bio:GolangResponse.getBio(),
              })
            })
          }).then((value) => {
            //@ts-ignore
            res.cookie('userId', value.userId, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `${process.env.HOSTNAME}` });
            //@ts-ignore
            res.cookie('semesterId', value.semesterId, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `${process.env.HOSTNAME}` });
            //@ts-ignore
            res.cookie('darkMode', value.darkMode, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `${process.env.HOSTNAME}` });
            //@ts-ignore
            res.cookie('bio', value.bio, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `${process.env.HOSTNAME}` });
          })
          res.cookie('sub', sub, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `${process.env.HOSTNAME}` });
          res.cookie('name', name, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `${process.env.HOSTNAME}` });
          res.cookie('email', email, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `${process.env.HOSTNAME}` });
        } catch (error) {
          throw error
        }
        return {
          ...session,
        };
      }
    })
  )

  server.get('/service-worker.js', (req, res) => {
    app.serveStatic(req, res, './.next/service-worker.js')
  });

  const serviceWorkers = [
    {
      filename: 'service-worker.js',
      path: './.next/service-worker.js',
    },
    {
      filename: 'firebase-messaging-sw.js',
      path: './public/fcm-sw.js',
    },
  ]
  serviceWorkers.forEach(({ filename, path }) => {
    server.get(`/${filename}`, (req, res) => {
      app.serveStatic(req, res, path)
    })
  });

  

  // authentication logout 
  server.all('/logout', async function (req: Request, res: Response) {
    console.log('logout inside')
    res.oidc!.logout({ returnTo: '/' });
    // @ts-ignore
    req.appSession!.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.oidc!.logout({ returnTo: '/' });
    });
  });

  server.all('/course/:sectionId/:role', async function (req: Request, res: Response) {
    try {
      console.log('inside role checking')
      const response = await fetch("http://auth:8181/v1/data/section_role/section_id", {
        body: JSON.stringify({
          input: {
            itsc: req.oidc.user!.sub,
            path: [req.params.sectionId, req.params.role]
          }
        }),
        headers: {
          Authorization: `Bearer ${process.env.OPASECRET}`,
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      const { result: { allow } } = await response.json()
      if (allow) {
        return handle(req, res);
      } else {
        res.redirect('/')
      }
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  })

  // grpc api route 
  server.all('/quickAssignmentInit/:templateID', async function (req: Request, res: Response) {
    try {
      var target = 'api:50051';
      var client = new DockerClient(
        target,
        grpc.credentials.createInsecure()
      );
      var docReq = new InstantAddContainerRequest();
      docReq.setSub(req.oidc.user!.sub)
      docReq.setTemplateId(req.params.templateID)
      client.instantAddContainer(docReq, function (err, GoLangResponse: AddContainerReply) {
        if (!GoLangResponse.getSuccess()) {
          console.log(GoLangResponse.getMessage())
          res.redirect('/')
        } else {
          res.redirect(`/user/container/${GoLangResponse.getContainerid()}/`)
        }
      })
    }
    catch (error) {
      console.log(error)
      res.redirect('/')
    }
  })

  // grpc api route 
  server.all('/user/container/:id/*', async function (req: Request, res: Response) {
    try {
      const response = await fetch("http://auth:8181/v1/data/container", {
        body: JSON.stringify({
          input: {
            itsc: req.oidc.user!.sub,
            container_id: req.params.id
          }
        }),
        headers: {
          Authorization: `Bearer ${process.env.OPASECRET}`,
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      const { result: { allow } } = await response.json()
      if (allow) {
        console.log('authenticated')
        req.url = req.url.replace('/user/container/' + req.params.id + '/', '');
        proxy.web(req, res, { target: 'http://' + req.params.id + ':8080/' })
      } else {
        res.redirect('/')
      }
    }
    catch (error) {
      console.log(error)
      res.redirect('/')
    }
  });

  // real
  server.all('*', requiresAuth(), (req, res) => {
    return handle(req, res);
  })

  // server.all(/^\/_next\/webpack-hmr(\/.*)?/, async (req: Request, res: Response) => {
  //   void handle(req, res)
  // })


  httpServer.listen(port, (err?: any) => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})