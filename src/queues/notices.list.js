import { createJob, createQueue } from ".";


export default createQueue('notices/list', async (job) => {
    await createJob('notices/scrape', { url: '' });
    await job.done();
});
