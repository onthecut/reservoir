import { Request, Response } from "express";
import { get } from "../lib/redis";

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
  const waterways = JSON.parse(
    (await get("/datasets/canals.geojson")) as string
  );

  console.log(waterways);

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
