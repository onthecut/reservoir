import { promises as fs } from "fs";
import { OPEN_DATA_PATH } from "../lib/base.js";
import { resolve } from "path";
import { pool, sql } from "../lib/postgres.js";

(async () => {
  console.log("IMPORT-CRT-WATERWAYS");

  const waterways = JSON.parse(
    await fs.readFile(resolve(OPEN_DATA_PATH, "canals.geojson"))
  ).features.filter((waterway) => {
    return (
      waterway.properties.SAP_CANAL_ID !== null &&
      waterway.properties.NAME !== null
    );
  });

  await pool.connect(async (connection) => {
    console.log("connected");
    console.log(
      await pool.query(
        sql`
        CREATE TABLE IF NOT EXISTS public.waterways (
            id VARCHAR(10) PRIMARY KEY,
            name VARCHAR(255) UNIQUE,
            geom GEOMETRY
        )`
      )
    );

    for (const waterway of waterways) {
      console.log(
        await pool.query(
          sql`
            INSERT INTO waterways (id, name, geom)
            VALUES (
                ${"CRT-" + waterway.properties.SAP_CANAL_ID},
                ${waterway.properties.NAME},
                ST_GeomFromGeoJSON(${JSON.stringify(waterway.geometry)}));
            `
        )
      );
    }
  });
})();
