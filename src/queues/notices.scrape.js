import fs from "fs/promises";
import path from "path";
import { DATA_PATH } from "../config";
import { getNotice } from "../lib/notices";

export const NOTICES_DATA_PATH = path.resolve(DATA_PATH, 'notices/');

export default Queue('notices/scrape', async (job) => {
    const notice = await getNotice(job.url);

    if (!await fs.exists(DATA_PATH)) {
        await fs.mkdir(DATA_PATH);
    }
    
    if (!await fs.exists(NOTICES_DATA_PATH)) {
        await fs.mkdir(NOTICES_DATA_PATH)
    }
    
    await fs.writeFile(
        path.resolve(NOTICES_DATA_PATH, `${notice.id}.json`),
        JSON.stringify(notice),
        'utf8'
    );
});
