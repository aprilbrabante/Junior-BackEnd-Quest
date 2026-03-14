const crawlPDF = require("./crawler/pdfCrawler");
const timer = require("./utils/timer");

async function start() {

    // Get URL from command line arguments
    const targetURL = process.argv[2];

    if (!targetURL) {
        console.log("Please provide a target URL.");
        console.log("Example: node src/index.js https://example.com");
        process.exit(1);
    }

    console.log("Starting crawler...");

    const startTime = Date.now();

    try {
        await crawlPDF(targetURL);
    } catch (error) {
        console.error("Crawler failed:", error.message);
    }

    const totalTime = timer(startTime);
    console.log("Execution Time:", totalTime, "seconds");
}

start();