import { DockerClient } from '../proto/dockerGet/dockerGet_grpc_pb';

import * as grpc from 'grpc';
type grpcClient=()=>DockerClient;
const grpcClient=()=>{
    var target= process.env.APIIP;
    var client = new DockerClient(
       target,
       grpc.credentials.createInsecure());
    return client
}


export {grpcClient}