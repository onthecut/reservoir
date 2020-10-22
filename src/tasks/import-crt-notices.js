import { promises as fs } from "fs";
import { OPEN_DATA_PATH } from "../lib/base.js";
import { resolve } from "path";
import { pool, sql } from "../lib/postgres.js";
import { getNotices } from "../lib/notices.js";

(async () => {
  console.log("IMPORT-CRT-NOTICES");

  const notices = await getNotices();

  console.log(notices[0]);

  //   headline: 'Boston Lock',
  //   startDate: '2018-11-01T00:00:00',
  //   endDate: null,
  //   startAt: null,
  //   endAt: null,
  //   noticeType: 7,
  //   towpathClosed: false,
  //   encoded: [ 'celbI|rFvNmU`NiUz@aBhAiCv@qBHUXs@LSJQ', [ -0.02966, 52.98172 ] ],
  //   href: 'https://canalrivertrust.org.uk/notices/14494-boston-lock'

  await pool.connect(async (connection) => {
    console.log("connected");
    console.log(
      await pool.query(
        sql`
          CREATE TABLE IF NOT EXISTS public.notices (
              id INTEGER PRIMARY KEY NOT NULL,
              headline VARCHAR(255) NOT NULL,
              startDate TIMESTAMP NOT NULL,
              endDate TIMESTAMP,
              startAt VARCHAR(255),
              endAt VARCHAR(255),
              href VARCHAR(255)
          );`
      )
    );

    for (const {
      path,
      headline,
      startDate,
      endDate,
      startAt,
      endAt,
      href,
    } of notices) {
      console.log(
        await pool.query(
          sql`
                INSERT INTO notices (id, headline, startDate, endDate, startAt, endAt, href)
                VALUES (
                    ${parseInt(path.split("/")[2].split("-")[0])},
                    ${headline},
                    ${startDate},
                    ${endDate},
                    ${startAt},
                    ${endAt},
                    ${href}
                );
                `
        )
      );
    }
  });
})();
