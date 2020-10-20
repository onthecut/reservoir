const playwright = require('playwright');

/**
 * Scrape a notice page.
 */
async function getNotice (url) {
    const browser = await playwright['chromium'].launch({
        headless: false, slowMo: 50 
    });

    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);

    const notice = await page.evaluate(() => {
        const notice = {
            title: document.getElementsByClassName('text-header-headline')[0].innerText,
            href: window.location.href
        }
        
        for (const panel of document.getElementsByClassName('panel-contact')) {
            const panelHeading = panel.getElementsByClassName('heading')[0].innerText;
            const panelHeadingLower = panelHeading.toLowerCase();

            notice[panelHeadingLower] = {};

            switch (panelHeadingLower) {
                case 'detail':
                case 'location':
                    for (const para of panel.getElementsByTagName('p')) {
                        const boldText = para.children[0].innerText.trim();
                        const bodyText = para.innerText.substr(boldText.length).trim();

                        notice[panelHeadingLower][boldText] = bodyText;
                    }

                    break;

                case 'updates':
                case 'description':

                    break;
            }
        }

        return notice;
    });

    await browser.close();

    return notice;
};

/**
 * Scrape the notices list.
 */
async function getNotices () {

};

getNotice('https://canalrivertrust.org.uk/notices/18561-river-severn-carrington-road-bridge').then(data => {
    console.log('data:', data);
}).catch((error) => {
    console.error(error)
})