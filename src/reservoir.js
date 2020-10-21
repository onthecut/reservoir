import { PORT } from "./lib/base.js";
import express from "express";
import { index } from "./routes/index.js";
import {
  index as openDataIndex,
  read as openDataRead,
} from "./routes/open-data.js";
import {
  index as noticesIndex,
  read as noticesRead,
} from "./routes/notices.js";
import { index as waterwaysIndex } from "./routes/waterways.js";

const app = express();

app.set("json spaces", 2);
app.disable("x-powered-by");

app.get("/", index);
app.get("/waterways", waterwaysIndex);
app.get("/notices", noticesIndex);
app.get("/notices/:name", noticesRead);
app.get("/datasets", openDataIndex);
app.get("/datasets/:name", openDataRead);

app.listen(PORT, () => {
  console.log(`[RESERVOIR] Listening on http://0.0.0.0:${PORT}`);
});
