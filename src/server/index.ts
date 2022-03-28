// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { grpcClient } from "../lib/grpcClient";
import {
  GetUserDataRequest,
  InstantAddContainerRequest,
  AddContainerReply,
  CheckHaveContainerRequest,
  GetUserDataReply,
  SuccessStringReply,
} from "../proto/dockerGet/dockerGet";

import express from "express";
import { Request, Response, NextFunction } from "express";
import { Socket } from "node:dgram";
import axios from "axios";
import crypto from "crypto";
import redis from "redis";

// rest of the code remains same
import next from "next";
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
import httpProxy from "http-proxy";
var proxy = httpProxy.createProxyServer({ ws: true });
import http from "http";
// import cookieParser from 'cookie-parser';
const app = next({ dev });
const handle = app.getRequestHandler();
import expressOpenidConnect from "express-openid-connect";
const { auth, requiresAuth } = expressOpenidConnect;
import { Header } from "next/dist/lib/load-custom-routes";
import { parse } from "cookie";
import { fetchAppSession } from "../lib/fetchAppSession";
import { String } from "lodash";
//import fetch from "node-fetch";

const SESSION_VALID_FOR = 8 * 60 * 60 * 1000;
const ID_LENGTH = 36;

console.log(process.env.REDISHOST);
export const redisClient = redis.createClient(
  process.env.REDISHOST.split(":")[1],
  process.env.REDISHOST.split(":")[0]
);

app.prepare().then(() => {
  var server = express();
  var httpServer = http.createServer(server);

  httpServer.on(
    "upgrade",
    function (req: Request, socket: Socket, head: Header) {
      if (req.url.search("/_next/webpack-hmr") == -1) {
        var baseURL = "/user/container/";
        var userPosition = req.url.search(baseURL);
        var id = req.url.slice(
          userPosition + baseURL.length,
          userPosition + baseURL.length + ID_LENGTH
        );
        console.log(id);

        req.headers.host = id;
        req.url = req.url.slice(userPosition + baseURL.length + ID_LENGTH);

        proxy.ws(req, socket, head, {
          target: "http://traefik.codespace.ust.dev",
        });
      } else {
        proxy.ws(req, socket, head, { target: req.url });
      }
    }
  );

  // server.use(cookieParser())
  server.enable("trust proxy");

  // authentication
  server.use(
    auth({
      issuerBaseURL: process.env.OAUTH_ISSUER_BASE_URL,
      baseURL: process.env.OAUTH_BASE_URL,
      clientID: process.env.OAUTH_CLIENT_ID!,
      clientSecret: process.env.OAUTH_CLIENT_SECRET!,
      secret: process.env.OAUTH_SECRET!,
      authorizationParams: {
        response_type: "code",
        scope: "openid profile email",
      },
      idpLogout: false,
      session: {
        genid: () => crypto.randomBytes(16).toString("hex"),
        store: {
          get: (sid, callback) => {
            const key = crypto
              .createHmac("sha1", process.env.SESSIONSECRET!)
              .update(sid)
              .digest()
              .toString("base64");
            redisClient.get(key, (err, data) => {
              if (err) return callback(err);
              if (!data) return callback(null);

              let result;
              try {
                result = JSON.parse(data);
              } catch (err) {
                return callback(err);
              }
              return callback(null, result);
            });
          },
          set: (sid, data, callback) => {
            const key = crypto
              .createHmac("sha1", process.env.SESSIONSECRET!)
              .update(sid)
              .digest()
              .toString("base64");
            redisClient.set(key, JSON.stringify(data), "EX", 86400, callback);
            // client.expire(key, 86400)
          },
          destroy: (sid, callback) => {
            const key = crypto
              .createHmac("sha1", process.env.SESSIONSECRET!)
              .update(sid)
              .digest()
              .toString("base64");
            redisClient.del(key, callback);
          },
        },
        absoluteDuration: SESSION_VALID_FOR,
        cookie: {
          domain: process.env.HOSTNAME,
          secure: true,
        },
      },
      routes: {
        postLogoutRedirect: process.env.POST_LOGOUT_REDIRECT_URI,
      },
      afterCallback: async (req, res, session, decodedState) => {
        try {
          // // // @ts-ignore
          // console.log("session: ", session)
          const additionalUserClaims = await axios(
            "https://cas.ust.hk/cas/oidc" + "/profile",
            {
              headers: {
                Authorization: "Bearer " + session.access_token,
              },
            }
          );
          // console.log(additionalUserClaims)
          // @ts-ignore
          req.appSession!.openidTokens = session.access_token;
          session.expired_at;
          // @ts-ignore
          req.appSession!.userIdentity = additionalUserClaims.data;
          const { sub, name, email } = additionalUserClaims.data;
          if (sub == "" || name == "" || email == "")
            throw new Error("something goes wrong with data from cas.ust.hk ");
          // const {  name, email } = additionalUserClaims.data;
          // if (name == "" || email == "")
          //   throw new Error("something goes wrong with data from cas.ust.hk ");
          // const sub = "desmond"

          var client = grpcClient;
          // console.log(client)
          var docReq: GetUserDataRequest = {
            sessionKey: session.id_token,
            isSessionKey: false,
            sub: sub,
          };
          const encrypt = (val: string) => {
            let cipher = crypto.createCipheriv(
              "aes-256-cbc",
              crypto.scryptSync(process.env.SESSIONSECRET, "GfG", 32),
              process.env.SESSIONIV
            );
            let encrypted = cipher.update(val, "utf8", "base64");
            encrypted += cipher.final("base64");
            return encrypted;
          };
          await new Promise((resolve, reject) => {
            client.getUserData(
              docReq,
              function (err, GolangResponse: GetUserDataReply) {
                resolve({
                  userId: GolangResponse.userId,
                  semesterId: GolangResponse.semesterId,
                  darkMode: GolangResponse.darkMode,
                  bio: GolangResponse.bio,
                  role: GolangResponse.role,
                });

                if (err) reject(err);
              }
            );
          }).then(
            (value: {
              userId: string;
              semesterId: string;
              darkMode: boolean;
              bio: string;
              role: string;
            }) => {
              console.log(value);
              res.cookie("userId", encrypt(value.userId), {
                maxAge: SESSION_VALID_FOR,
                httpOnly: true,
                domain: `${process.env.HOSTNAME}`,
              });
              // res.cookie("role", encrypt(value.role), {
              //   maxAge: SESSION_VALID_FOR,
              //   httpOnly: true,
              //   domain: `${process.env.HOSTNAME}`,
              // });
              res.cookie("semesterId", encrypt(value.semesterId), {
                maxAge: SESSION_VALID_FOR,
                httpOnly: true,
                domain: `${process.env.HOSTNAME}`,
              });
              // res.cookie("darkMode", encrypt(value.darkMode), {
              //   maxAge: SESSION_VALID_FOR,
              //   httpOnly: true,
              //   domain: `${process.env.HOSTNAME}`,
              // });
              // res.cookie("bio", encrypt(value.bio), {
              //   maxAge: SESSION_VALID_FOR,
              //   httpOnly: true,
              //   domain: `${process.env.HOSTNAME}`,
              // });
            }
          );
          res.cookie("sub", encrypt(sub), {
            maxAge: SESSION_VALID_FOR,
            httpOnly: true,
            domain: `${process.env.HOSTNAME}`,
          });
          res.cookie("name", encrypt(name), {
            maxAge: SESSION_VALID_FOR,
            httpOnly: true,
            domain: `${process.env.HOSTNAME}`,
          });
          res.cookie("email", encrypt(email), {
            maxAge: SESSION_VALID_FOR,
            httpOnly: true,
            domain: `${process.env.HOSTNAME}`,
          });
        } catch (error) {
          throw error;
        }
        return {
          ...session,
        };
      },
    })
  );

  const serviceWorkers = [
    {
      filename: "service-worker.js",
      path: "./.next/service-worker.js",
    },
    {
      filename: "firebase-messaging-sw.js",
      path: "./public/fcm-sw.js",
    },
  ];
  serviceWorkers.forEach(({ filename, path }) => {
    server.get(`/${filename}`, (req, res) => {
      app.serveStatic(req, res, path);
    });
  });

  // // authentication logout
  // server.get("/logout", (req, res) => {
  //   // @ts-ignore
  //   req.appSession!.destroy((err) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //     console.log(req.params);
  //       res.oidc!.logout({ returnTo: process.env.POST_LOGOUT_REDIRECT_URI });
  //   });
  //   // res.oidc!.logout({ returnTo: process.env.POST_LOGOUT_REDIRECT_URI });
  // });

  // grpc api route
  server.all(
    "/quickAssignmentInit/:templateID",
    async function (req: Request, res: Response) {
      try {
        var client = grpcClient;
        const { appSession } = parse(req.headers.cookie!);
        const key = crypto
          .createHmac("sha1", process.env.SESSIONSECRET!)
          .update(appSession)
          .digest()
          .toString("base64");
        var docReq: InstantAddContainerRequest = {
          sub: req.oidc.user!.sub,
          templateId: req.params.templateID,
          sessionKey: key,
        };
        client.instantAddTemplateContainer(
          docReq,
          function (err, GoLangResponse: AddContainerReply) {
            if (!GoLangResponse.success) {
              console.log(GoLangResponse.error.error);
              res.redirect("/");
            } else {
              res.redirect(`/user/container/${GoLangResponse.containerID}/`);
            }
          }
        );
      } catch (error) {
        console.log(error);
        res.redirect("/");
      }
    }
  );

  // // grpc api route
  server.all(
    "/user/container/:id/*",
    async function (req: Request, res: Response) {
      //   // req.url = req.url.replace('/user/container/' + req.params.id + '/', '');
      //   // req.header('User-Agent')

      try {
        var client = grpcClient;
        const { appSession } = parse(req.headers.cookie!);
        const key = crypto
          .createHmac("sha1", process.env.SESSIONSECRET!)
          .update(appSession)
          .digest()
          .toString("base64");
        var docReq: CheckHaveContainerRequest = {
          sessionKey: key,
          sub: req.oidc.user!.sub,
          containerID: req.params.id,
        };
        client.checkHaveContainer(
          docReq,
          function (err, GoLangResponse: SuccessStringReply) {
            // console.log(err,GoLangResponse.getMessage())
            if (GoLangResponse.success) {
              const reqHost = req.headers.host;
              req.headers.host = req.params.id;
              // req.header("Host") = req.params.id
              req.url = req.url.replace(
                "/user/container/" + req.params.id + "/",
                ""
              );
              // req.url = req.params.id
              proxy.web(req, res, {
                target: "http://traefik.codespace.ust.dev",
              });
            } else {
              console.error(GoLangResponse.error.error);
              res.redirect(`/`);
            }
          }
        );
      } catch (error) {
        console.log(error);
        res.redirect("/");
      }
    }
  );

  server.all("*", requiresAuth(), (req, res) => {
    return handle(req, res);
  });
  // server.all('*', (req, res) => {
  //   return handle(req, res);
  // })

  httpServer.listen(port, (err?: any) => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

export {};
