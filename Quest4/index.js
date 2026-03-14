const axios = require("axios");      // HTTP requests
const cheerio = require("cheerio");  // HTML parsing
const fs = require("fs");            // File system operations

// Get website URL from command-line argument
const URL = process.argv[2];  

// Check if URL is provided
if (!URL) {
    console.error("Please provide a website URL as a command-line argument!");
    console.error("Example: node crawler.js https://example.com");
    process.exit(1); // Stop execution if no URL
}

/**
 * Main async function
 */
async function crawl() {
    try {
        console.log(`Crawling ${URL} ...`);

        // Fetch HTML from the website
        const { data } = await axios.get(URL);

        // Load HTML into cheerio for parsing
        const $ = cheerio.load(data);

        // Object to store all extracted data
        const results = {
            links: [],
            images: []
        };

        // Extract all <a> links and their visible text
        $("a").each((i, el) => {
            const href = $(el).attr("href");           // Get href attribute
            const text = $(el).text().trim();          // Get visible text inside the <a> tag
            if (href) results.links.push({ href, text });
        });

        // Extract all <img> tags
        $("img").each((i, el) => {
            const src = $(el).attr("src");             // Get image source URL
            const alt = $(el).attr("alt") || "";       // Get alt text if exists
            if (src) results.images.push({ src, alt });
        });

        // Save results to JSON file (pretty printed)
        fs.writeFileSync("output.json", JSON.stringify(results, null, 2));

        console.log("Crawl complete! Saved to output.json");

    } catch (err) {
        // Log errors if something goes wrong
        console.error("Error crawling site:", err.message);
        fs.writeFileSync("crawl.log", err.stack);  // Save error stack for debugging
    }
}

// Run the crawler
crawl();