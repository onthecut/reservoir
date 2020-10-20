import { NOTICE_DATA_PATH } from "../lib/base.js";
import { getNotice, getNotices } from "../lib/notices.js";
import { promises as fs } from "fs";
import { resolve } from "path";

(async () => {
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
