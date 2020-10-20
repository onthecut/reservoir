import { getNotice, getNotices } from "./lib/notices.js";
import { existsSync, mkdirSync, promises as fs } from "fs";
import { resolve } from "path";

const DATA_PATH = resolve(process.cwd(), "data/");
const NOTICE_DATA_PATH = resolve(DATA_PATH, "notices/");

(async () => {
  console.log("[RESERVOIR] Creating data folders if doesn't exist");
  for (const path of [DATA_PATH, NOTICE_DATA_PATH]) {
    if (!existsSync(path)) {
      mkdirSync(path);
    }
  }

  console.log("[CRT-NOTICES] Gathering Notice Results");
  const notices = await getNotices();

  for (const { href } of notices) {
    console.log(`[CRT-NOTICES] Parsing ${href}`);
    const notice = await getNotice(href);

    notice._refreshed = new Date();

    await fs.writeFile(
      resolve(NOTICE_DATA_PATH, notice.id + ".json"),
      JSON.stringify(notice, null, 2)
    );
  }
})();
