import { existsSync, mkdirSync, promises as fs } from "fs";
import { resolve } from "path";

export const PORT = process.env.PORT || 3000;

export const POSTGRES_URL =
  "postgres://postgres:postgres@127.0.0.1:5432/postgres";

export const DATA_PATH = resolve(process.cwd(), "data/");
export const NOTICE_DATA_PATH = resolve(DATA_PATH, "notices/");
export const OPEN_DATA_PATH = resolve(DATA_PATH, "open/");

console.log("[RESERVOIR] Creating data folders if doesn't exist");
for (const path of [DATA_PATH, NOTICE_DATA_PATH, OPEN_DATA_PATH]) {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
}
