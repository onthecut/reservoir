import { promises as fs } from "fs";
import { basename } from "path";
import { OPEN_DATA_PATH } from "../lib/base";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  const files = (await fs.readdir(OPEN_DATA_PATH)).map((file) => {
    return { id: basename(file, ".geojson") };
  });

  res.json(files);
};

export const read = (req: Request, res: Response) => {
  res.json("TODO");
};
