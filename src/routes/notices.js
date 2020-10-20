import { promises as fs } from "fs";
import { basename } from "path";
import { NOTICE_DATA_PATH } from "../lib/base.js";

export const index = async (req, res) => {
  const files = (await fs.readdir(NOTICE_DATA_PATH)).map((file) => {
    return { id: basename(file, ".json"), name: "TODO" };
  });

  res.json(files);
};

export const read = (req, res) => {
  res.json("TODO");
};
