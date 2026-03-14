const fs = require("fs");
const pdfParse = require("pdf-parse");
const { PDFDocument, StandardFonts } = require("pdf-lib");
const translate = require("@vitalets/google-translate-api"); // v8.0.0

// Define input and output PDF paths
const inputPDF = "../input/korean.pdf";      // Original Korean PDF
const outputPDF = "../output/translated.pdf"; // Translated PDF output

// Define an async function to handle the PDF translation process
async function translatePDF() {

  // Read the PDF file into a buffer (binary data)
  const dataBuffer = fs.readFileSync(inputPDF);

  // Extract the text content from the PDF
  const pdfData = await pdfParse(dataBuffer); // pdfData contains text + metadata
  const koreanText = pdfData.text;           // Extract only the text part

  console.log("Extracted Korean text");      // Log progress

  // Translate the extracted Korean text to English
  const result = await translate(koreanText, { from: "ko", to: "en" });
  const englishText = result.text;           // Get the translated text

  console.log("Translation complete");       // Log progress

  // Create a new PDF document to store the translated text
  const pdfDoc = await PDFDocument.create();

  // Add a new page to the PDF with width 600 and height 800 units
  const page = pdfDoc.addPage([600, 800]);

  // Embed a standard font (Helvetica) into the PDF for drawing text
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Draw the translated English text onto the new PDF page
  page.drawText(englishText, {
    x: 50,
    y: 750,
    size: 12,
    font,
    maxWidth: 500,
    lineHeight: 16
  });

  // Save the new PDF as a byte array
  const pdfBytes = await pdfDoc.save();

  // Write the new PDF to the output file
  fs.writeFileSync(outputPDF, pdfBytes);

  // Log success message
  console.log("Translated PDF saved:", outputPDF);
}

// Call the function to run the PDF translation
translatePDF();