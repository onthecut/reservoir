import { DATASETS } from "../lib/open-data";
import Axios from "axios";
import { redis, set } from "../lib/redis";

interface Datasets {
  [key: string]: string;
}

(async () => {
  console.log("[CRT-DATA] Refreshing Open Data");
  // for (const name in DATASETS) {
  const name = "canals";
  const url = (DATASETS as Datasets)[name];

  console.error(`[CRT-DATA] Retrieving ${name}`);
  const response = await Axios.get(url, {
    timeout: 20 * 1000,
  });

  if (response.data.type == "FeatureCollection") {
    await set(
      `/datasets/${name}.geojson`,
      JSON.stringify(response.data, null, 2)
    );
  } else {
    console.error(
      `[CRT-DATA] Invalid GeoJSON response for ${name}`,
      response.data
    );
  }

  redis.quit();
  // }
})();
