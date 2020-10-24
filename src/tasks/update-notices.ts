import { NOTICE_DATA_PATH } from "../lib/base";
import { getNotice, getNotices } from "@onthecut/crt-notice-scraper";
import { promises as fs } from "fs";
import { resolve } from "path";

(async () => {
  console.log("[CRT-NOTICES] Gathering Notice Results");
  const notices = await getNotices();

  await fs.writeFile(
    resolve(NOTICE_DATA_PATH, "index.json"),
    JSON.stringify(notices, null, 2)
  );

  if (process.env.NOTICES_EXTENDED) {
    for (const { href } of notices) {
      console.log(`[CRT-NOTICES] Parsing ${href}`);
      const notice = await getNotice(href);

      notice._refreshed = new Date();

      await fs.writeFile(
        resolve(NOTICE_DATA_PATH, notice.id + ".json"),
        JSON.stringify(notice, null, 2)
      );
    }
  }
})();
