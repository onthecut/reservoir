import { createClient } from "redis";
import { REDIS_URL } from "./base";

export const redis = createClient({ url: REDIS_URL });

redis.on("ready", () => console.log("[REDIS] Ready"));
redis.on("connect", () => console.log("[REDIS] Connected"));
redis.on("reconnecting", () => console.log("[REDIS] Reconnecting"));

redis.on("error", (err) => {
  console.error(err);
});

export const get = async (key: string) => {
  if (redis.isOpen === false) {
    await redis.connect();
  }
  return await redis.get.call(redis, key);
};
export const set = async (key: string, value: string | Buffer) => {
  if (redis.isOpen === false) {
    await redis.connect();
  }
  return await redis.set.call(redis, key, value);
};
