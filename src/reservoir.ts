import { PORT } from "./lib/base";
import express from "express";
import cors from "cors";
import { index } from "./routes/index";
import {
  index as openDataIndex,
  read as openDataRead,
} from "./routes/open-data";
import {
  index as noticesIndex,
  indexGeoJSON as noticesGeoJsonIndex,
  indexGeoBuf as noticesGeoBufIndex,
  read as noticesRead,
} from "./routes/notices";
import { index as waterwaysIndex } from "./routes/waterways";

const app = express();

app.set("json spaces", 2);
app.disable("x-powered-by");

app.use(cors());

app.get("/", index);
app.get("/waterways", waterwaysIndex);
app.get("/notices", noticesIndex);
app.get("/notices.geojson", noticesGeoJsonIndex);
app.get("/notices.geobuf", noticesGeoBufIndex);
app.get("/notices/:name", noticesRead);
app.get("/datasets", openDataIndex);
app.get("/datasets/:name", openDataRead);

app.listen(PORT, () => {
  console.log(`[RESERVOIR] Listening on http://0.0.0.0:${PORT}`);
});
