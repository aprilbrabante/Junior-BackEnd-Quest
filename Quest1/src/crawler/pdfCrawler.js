const puppeteer = require("puppeteer");
const downloadPDF = require("../services/pdfDownloader");

/**
 * Function that automatically scrolls the page (useful for lazy-loaded content)
 * 
 * @param {*} page 
 */
async function autoScroll(page) {

    // Execute code inside the browser page
    await page.evaluate(async () => {

        // Create a Promise so we can wait until scrolling finishes
        await new Promise((resolve) => {

            // Keeps track of how much we have scrolled
            let totalHeight = 0;

            // Scroll distance for every step
            const distance = 100;

            // Scroll every 100 milliseconds
            const timer = setInterval(() => {

                // Total scrollable height of the page
                const scrollHeight = document.body.scrollHeight;

                // Scroll down by the specified distance
                window.scrollBy(0, distance);

                // Add the distance to total height scrolled
                totalHeight += distance;

                // If we reached the bottom of the page
                if (totalHeight >= scrollHeight) {

                    // Stop the scrolling timer
                    clearInterval(timer);

                    // Resolve the Promise (scroll finished)
                    resolve();
                }

            }, 100);
        });
    });
}


/**
 * Main crawler function that finds and downloads PDFs
 * 
 * @param {*} targetURL 
 */
async function crawlPDF(targetURL) {

    // Start measuring execution time
    console.time("Execution Time");

    // Launch a new browser instance
    const browser = await puppeteer.launch({

        // Run browser without opening a visible window
        headless: true,

        // Required for some environments like servers or Docker
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    // Open a new browser tab
    const page = await browser.newPage();


    // Set a realistic browser user agent (helps avoid bot blocking)
    await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
    );

    // Set browser viewport size (screen size simulation)
    await page.setViewport({
      width: 1366,
      height: 768
    });


    // Enable request interception
    // This allows us to control which resources are loaded
    await page.setRequestInterception(true);

    // Listen to every network request made by the page
    page.on("request", req => {

        // Get the type of resource being requested
        const type = req.resourceType();

        // If the request is for images, CSS, or fonts
        if (["image", "stylesheet", "font"].includes(type)) {

            // Abort the request to save bandwidth and speed
            req.abort();

        } else {

            // Allow all other requests
            req.continue();
        }
    });


    // Navigate to the target URL
    // networkidle2 waits until there are no more than 2 network requests
    await page.goto(targetURL, { waitUntil: "networkidle2" });


    // Optional: scroll the page if content loads dynamically
    // await autoScroll(page);   


    // Wait until at least one link (<a href="">) appears
    await page.waitForSelector("a[href]", { timeout: 8000 });


    // Extract all links from the page
    const pdfLinks = [...new Set(

        // $$eval runs code inside the page to get elements
        await page.$$eval("a[href]", links =>

            links

                // Convert link elements into their URL
                .map(link => link.href)

                // Keep only links that contain ".pdf"
                .filter(href => href.toLowerCase().includes(".pdf"))
        )
    )];


    // Log how many PDF links were found
    console.log("PDF Links Found:", pdfLinks.length);


    // Download all PDFs in parallel for faster performance
    await Promise.all(

        pdfLinks.map(url => {

            // Print which PDF is being downloaded
            console.log("Downloading:", url);

            // Call the downloader function
            return downloadPDF(url);
        })
    );


    // Close the browser
    await browser.close();


    // Print total execution time
    console.timeEnd("Execution Time");
}

module.exports = crawlPDF;