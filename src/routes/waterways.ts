import { readFileSync } from "fs";
import { resolve } from "path";
import { OPEN_DATA_PATH } from "../lib/base";
import { Request, Response } from "express";

const waterways = JSON.parse(
  readFileSync(resolve(OPEN_DATA_PATH, "canals.geojson"), "utf-8")
);

interface CRTCanalFeatures {
  properties: {
    SAP_CANAL_ID: string;
    NAME: string;
  };
}

interface CRTCanalDataset {
  features: Array<CRTCanalFeatures>;
}

export const index = async (req: Request, res: Response) => {
  res.json(
    (waterways as CRTCanalDataset).features
      .filter((canal) => canal.properties.SAP_CANAL_ID !== null)
      .map((canal) => {
        return {
          id: canal.properties.SAP_CANAL_ID,
          name: canal.properties.NAME,
        };
      })
  );
};
