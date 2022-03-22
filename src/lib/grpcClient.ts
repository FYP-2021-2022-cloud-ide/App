import { DockerClient } from "../proto/dockerGet/dockerGet";
// import * as grpc from "grpc";
import * as grpc from "@grpc/grpc-js";

const target = process.env.APIIP;
const channel = grpc.credentials.createInsecure();

const grpcClient = new DockerClient(target, channel);

export { grpcClient };
