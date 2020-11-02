import { NOTICE_DATA_PATH } from "../lib/base";
import { getNotice, getNotices } from "@onthecut/crt-notice-scraper";
import { redis, set } from "../lib/redis";

(async () => {
  console.log("[CRT-NOTICES] Gathering Notice Results");

  const notices = await getNotices({
    args: ["--no-sandbox"],
  });

  console.log("[CRT-NOTICES] Saving to Redis");
  await set("/notices", JSON.stringify(notices, null, 2));
  console.log("[CRT-NOTICES] Stored");

  if (process.env.NOTICES_EXTENDED) {
    for (const { href } of notices) {
      console.log(`[CRT-NOTICES] Parsing ${href}`);
      const notice = await getNotice(href);

      await set(`/notices/${notice.id}`, JSON.stringify(notice, null, 2));
    }
  }

  redis.quit();
})();
