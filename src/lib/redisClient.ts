import ioredis from "ioredis";

export const redisClient = new ioredis({
  port: Number(process.env.REDISHOST.split(":")[1]),
  host: process.env.REDISHOST.split(":")[0],
  connectionName: "frontend",
});
