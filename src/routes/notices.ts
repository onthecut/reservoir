import { promises as fs } from "fs";
import { NOTICE_DATA_PATH } from "../lib/base";
import { Request, Response } from "express";
import { resolve } from "path";
import polyline from "@mapbox/polyline";
import geobuf from "geobuf";
import Pbf from "pbf";

const readNotices = async () => {
  return JSON.parse(
    await fs.readFile(resolve(NOTICE_DATA_PATH, "index.json"), "utf8")
  );
};

interface NoticeSummary {
  path: string;
  headling: string;
  startDate: string;
  endDate: string;
  startAt: string;
  endAt: string;
  noticeType: number;
  towpathClosed: boolean;
  encoded: [string, Array<number>];
  href: string;
}

const noticesToGeoJSON = (notices: Array<NoticeSummary>) => {
  return {
    type: "FeatureCollection",
    features: notices
      .filter(
        (notice) => notice.encoded && typeof notice.encoded[0] === "string"
      )
      .map((notice) => {
        return {
          type: "Feature",
          properties: notice,
          geometry: polyline.toGeoJSON(notice.encoded[0]),
        };
      }),
  };
};

export const index = async (req: Request, res: Response) => {
  res.json(await readNotices());
};

export const indexGeoJSON = async (req: Request, res: Response) => {
  res.json(noticesToGeoJSON(await readNotices()));
};

export const indexGeoBuf = async (req: Request, res: Response) => {
  res.send(
    Buffer.from(
      geobuf.encode(
        noticesToGeoJSON(await readNotices()) as GeoJSON.GeoJSON,
        new Pbf()
      )
    )
  );
};

export const read = (req: Request, res: Response) => {
  res.json("TODO");
};
