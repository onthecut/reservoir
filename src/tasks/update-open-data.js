import { OPEN_DATA_PATH } from "../lib/base.js";
import { promises as fs } from "fs";
import { resolve } from "path";
import { DATASETS } from "../lib/open-data.js";
import Axios from "axios";

(async () => {
  console.log("[CRT-DATA] Refreshing Open Data");
  for (const name in DATASETS) {
    const url = DATASETS[name];

    console.error(`[CRT-DATA] Retrieving ${name}`);
    const response = await Axios.get(url, {
      timeout: 20 * 1000,
    });

    if (response.data.type == "FeatureCollection") {
      await fs.writeFile(
        resolve(OPEN_DATA_PATH, `${name}.geojson`),
        JSON.stringify(response.data, null, 2)
      );
    } else {
      console.error(
        `[CRT-DATA] Invalid GeoJSON response for ${name}`,
        response.data
      );
    }
  }
})();
