const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto('https://collection.cloudinary.com/dphq33wah/1e5b72b6ac11b35639b8abbf50c4c8cd', {
            waitUntil: 'networkidle0',
        });
        
        // Extract all image sources
        const images = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('img')).map(img => img.src);
        });
        
        console.log("Found images:", JSON.stringify(images, null, 2));
        
        // Or find background images
        const bgImages = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('*'));
            return elements
                .map(el => window.getComputedStyle(el).backgroundImage)
                .filter(bg => bg !== 'none' && bg.includes('url('));
        });
        console.log("Found background images:", JSON.stringify(bgImages, null, 2));

        await browser.close();
    } catch (e) {
        console.error("Error:", e.message);
    }
})();
