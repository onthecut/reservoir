import { promises as fs } from "fs";
import { NOTICE_DATA_PATH } from "../lib/base";
import { Request, Response } from "express";
import { resolve } from "path";

export const index = async (req: Request, res: Response) => {
  const notices = JSON.parse(
    await fs.readFile(resolve(NOTICE_DATA_PATH, "index.json"), "utf8")
  );

  res.json(notices);
};

export const read = (req: Request, res: Response) => {
  res.json("TODO");
};
