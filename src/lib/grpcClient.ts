import { DockerClient } from '../proto/dockerGet/dockerGet_grpc_pb';
import * as grpc from 'grpc';

const target= process.env.APIIP;
const grpcClient=new DockerClient(
       target,
       grpc.credentials.createInsecure(),);


export {grpcClient}