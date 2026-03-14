const fs = require("fs");
const path = require("path");
const axios = require("axios");

/**
 * Function that downloads a PDF from a given URL
 * 
 * @param {*} url 
 * 
 * @returns 
 */
async function downloadPDF(url) {

  try {

    // Resolve the downloads folder location
    const downloadDir = path.resolve(__dirname, "../../downloads");

    // Check if the folder exists
    if (!fs.existsSync(downloadDir)) {

      // Create the downloads folder if it doesn't exist
      fs.mkdirSync(downloadDir);
    }

    // Extract file name from the URL
    const fileName = path.basename(url.split("?")[0]);

    // Create the full path where the PDF will be saved
    const filePath = path.join(downloadDir, fileName);


    // Send HTTP request to download the PDF
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      timeout: 10000,
      headers: {
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Referer": "https://freetestdata.com/",
        "Accept": "application/pdf"
      }
    });

    // Create a writable file stream to save the PDF
    const writer = fs.createWriteStream(filePath);

    // Pipe the downloaded data stream into the file
    response.data.pipe(writer);

    // Return a Promise that resolves when writing is complete
    return new Promise((resolve, reject) => {

        // Triggered when the file finishes saving
        writer.on("finish", () => {
            console.log("Saved:", fileName);
            resolve(filePath);
        });


        // Triggered if an error occurs during writing
        writer.on("error", err => {
            // Delete the incomplete file
            fs.unlink(filePath, () => {});

            reject(err);
        });
    });

  } catch (error) {
    // Print error if download fails
    console.error("Download failed:", url);

    throw error;
  }
}

module.exports = downloadPDF;