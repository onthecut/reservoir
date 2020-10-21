import { readFileSync } from "fs";
import { resolve } from "path";
import { OPEN_DATA_PATH } from "../lib/base.js";

const waterways = JSON.parse(
  readFileSync(resolve(OPEN_DATA_PATH, "canals.geojson"))
);

export const index = async (req, res) => {
  res.json(
    waterways.features
      .filter((canal) => canal.properties.SAP_CANAL_ID !== null)
      .map((canal) => {
        return {
          id: canal.properties.SAP_CANAL_ID,
          name: canal.properties.NAME,
        };
      })
  );
};
