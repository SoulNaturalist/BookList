const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const quoteArray = ['https://mybook.ru/author/mihail-bulgakov/master-i-margarita-1/citations/']
    for (const quote of quoteArray) {
        await page.goto(quote);
        const texts = await page.evaluate(() => {
            const articles = document.querySelectorAll('article');
            return Array.from(articles).map(article => article.textContent.trim());
        });
    
        console.log(texts);
    }
    await browser.close();
})();