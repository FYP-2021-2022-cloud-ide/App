// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {grpcClient}from '../lib/grpcClient'
import { GetUserDataRequest,  InstantAddContainerRequest, AddContainerReply, GetUserDataReply, CheckHaveContainerRequest, SuccessStringReply } from '../proto/dockerGet/dockerGet_pb';

import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Socket } from 'node:dgram';
import axios from "axios";
import crypto from "crypto";
import redis from "redis";

// rest of the code remains same
//const { createProxyMiddleware } = require('http-proxy-middleware')
import next from 'next';
const port = 3000
const dev = process.env.NODE_ENV !== 'production'
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({ ws: true });
// var proxy = require('express-http-proxy');
var http = require('http')
// import cookieParser from 'cookie-parser';
const app = next({ dev })
const handle = app.getRequestHandler()
import { auth, requiresAuth, OpenidRequest } from 'express-openid-connect';
import { Header } from 'next/dist/lib/load-custom-routes';
import { parse } from 'cookie';
import { fetchAppSession } from '../lib/fetchAppSession';
//import fetch from "node-fetch";

const SESSION_VALID_FOR = 8 * 60 * 60 * 1000;
const ID_LENGTH = 36;
const client = redis.createClient(parseInt(process.env.REDIS_PORT!, 10), process.env.REDIS_HOST);


app.prepare().then(() => {
  var server = express()
  var httpServer = http.createServer(server)

  httpServer.on('upgrade', function (req: Request, socket: Socket, head: Header) {
    
    if (req.url.search('/_next/webpack-hmr') == -1){
      var baseURL = '/user/container/'
      var userPosition = req.url.search(baseURL)
      var id = req.url.slice(
        userPosition + baseURL.length,
        userPosition + baseURL.length + ID_LENGTH);
      console.log(id)

      req.headers.host = id
      req.url = req.url.slice(userPosition + baseURL.length + ID_LENGTH);

      proxy.ws(req, socket, head, { target: 'http://traefik.codespace.ust.dev' });
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
        genid: () => crypto.randomBytes(16).toString('hex'),
        store: {
          get: (sid, callback) => {
            const key = crypto.createHmac('sha1', process.env.SESSIONSECRET!).update(sid).digest().toString('base64');
            client.get(key, (err, data)=>{
              if(err) return callback(err)
              if(!data) return callback(null)
    
              let result
              try{
                result = JSON.parse(data);
              }catch(err){
                return callback(err)
              }
              return callback(null, result)
            });
          },
          set: (sid, data, callback) => {
            // console.log(data)
            const key = crypto.createHmac('sha1', process.env.SESSIONSECRET!).update(sid).digest().toString('base64');
            client.set(key, JSON.stringify(data),'EX', 86400, callback)
            // client.expire(key, 86400)
          },
          destroy: (sid,callback) => {
            const key = crypto.createHmac('sha1', process.env.SESSIONSECRET!).update(sid).digest().toString('base64');
            client.del(key, callback)
          },
        },
        absoluteDuration: SESSION_VALID_FOR,
        cookie: {
          domain: process.env.HOSTNAME,
          secure: true,
        }
      },
      afterCallback: async (req, res, session, decodedState) => {
        try {
          // // // @ts-ignore
          console.log("session: ",session)
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
          var client = grpcClient()
          // console.log(client)
          var docReq = new GetUserDataRequest()
          docReq.setSessionKey(session.id_token)
          docReq.setIsSessionKey(false)
          docReq.setSub(sub)

          await new Promise((resolve, reject) => {
            client.getUserData(docReq, function (err, GolangResponse: GetUserDataReply) {
              resolve({
                userId: GolangResponse.getUserid(),
                semesterId: GolangResponse.getSemesterid(),
                darkMode:GolangResponse.getDarkmode(),
                bio:GolangResponse.getBio(),
                role: GolangResponse.getRole()
              })
            })
          }).then((value) => {
            //@ts-ignore
            res.cookie('userId', value.userId, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `${process.env.HOSTNAME}` });
            //@ts-ignore
            res.cookie('role', value.role, { maxAge: SESSION_VALID_FOR, httpOnly: false, domain: `${process.env.HOSTNAME}` });
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

  // server.all('/course/:sectionId/:role', async function (req: Request, res: Response) {
  //   try {
  //     console.log('inside role checking')
  //     const response = await fetch("http://auth:8181/v1/data/section_role/section_id", {
  //       body: JSON.stringify({
  //         input: {
  //           itsc: req.oidc.user!.sub,
  //           path: [req.params.sectionId, req.params.role]
  //         }
  //       }),
  //       headers: {
  //         Authorization: `Bearer ${process.env.OPASECRET}`,
  //         "Content-Type": "application/json"
  //       },
  //       method: "POST"
  //     })
  //     const { result: { allow } } = await response.json()
  //     if (allow) {
  //       return handle(req, res);
  //     } else {
  //       res.redirect('/')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.redirect('/')
  //   }
  // })

  // grpc api route 
  server.all('/quickAssignmentInit/:templateID', async function (req: Request, res: Response) {
    try {
      var client = grpcClient()
      var docReq = new InstantAddContainerRequest();
      docReq.setSub(req.oidc.user!.sub)
      docReq.setTemplateId(req.params.templateID)
      client.instantAddContainer(docReq, function (err, GoLangResponse: AddContainerReply) {
        // console.log(err,GoLangResponse.getMessage())
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
    // req.url = req.url.replace('/user/container/' + req.params.id + '/', '');
    // req.header('User-Agent')

    try {
      var client = grpcClient()
      var docReq = new CheckHaveContainerRequest();
      const {appSession} = parse(req.headers.cookie!)
      const key = crypto.createHmac('sha1', process.env.SESSIONSECRET!).update(appSession).digest().toString('base64');
      docReq.setSessionKey(key)
      docReq.setSub(req.oidc.user!.sub)
      docReq.setContainerid(req.params.id)
      client.checkHaveContainer(docReq, function (err, GoLangResponse: SuccessStringReply) {
        // console.log(err,GoLangResponse.getMessage())
        if (GoLangResponse.getSuccess()) {
          const reqHost = req.headers.host
          req.headers.host = req.params.id
          // req.header("Host") = req.params.id
          req.url = req.url.replace('/user/container/' + req.params.id + '/', '');
          // req.url = req.params.id
          proxy.web(req, res, { target: 'http://traefik.codespace.ust.dev' })
        } else {
          console.log(GoLangResponse.getMessage())
          console.log("unauthenticated")
          res.redirect(`/`)
        }
      })
    }
    catch (error) {
      console.log(error)
      res.redirect('/')
    }


  });

  server.all('*', requiresAuth(), (req, res) => {
    return handle(req, res);
  })


  httpServer.listen(port, (err?: any) => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})