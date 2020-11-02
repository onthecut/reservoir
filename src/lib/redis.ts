import { createClient } from "redis";
import { promisify } from "util";
import { REDIS_URL } from "./base";

export const redis = createClient(REDIS_URL);

redis.on("ready", () => console.log("[REDIS] Ready"));
redis.on("connect", () => console.log("[REDIS] Connected"));
redis.on("reconnecting", () => console.log("[REDIS] Reconnecting"));

redis.on("error", (err) => {
  console.error(err);
});

export const get = promisify(redis.get).bind(redis);
export const set = promisify(redis.set).bind(redis);
