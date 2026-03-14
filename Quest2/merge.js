const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

async function mergePDFs() {

    const fileName = "merged.pdf";

    try {
        // Paths to your PDFs
        const pdfAPath = path.join(__dirname, "sample", "A.pdf");
        const pdfBPath = path.join(__dirname, "sample", "B.pdf");

        // Load PDFs
        const pdfABytes = await fs.promises.readFile(pdfAPath);
        const pdfBBytes = await fs.promises.readFile(pdfBPath);

        const pdfA = await PDFDocument.load(pdfABytes);
        const pdfB = await PDFDocument.load(pdfBBytes);

        // Create new PDF for merged result
        const mergedPDF = await PDFDocument.create();

        // Copy first 10 pages from A
        const pagesA = await mergedPDF.copyPages(pdfA, [...Array(10).keys()]);
        pagesA.forEach((page) => mergedPDF.addPage(page));

        // Copy first 3 pages from B
        const pagesB = await mergedPDF.copyPages(pdfB, [0, 1, 2]);
        pagesB.forEach((page) => mergedPDF.addPage(page));

        // Save merged PDF
        const mergedBytes = await mergedPDF.save();
        await fs.promises.writeFile(path.join(__dirname, fileName), mergedBytes);

        console.log("PDFs merged successfully!");
        console.log(`Output file: ${fileName}`);
    } catch (error) {
        console.error("Error merging PDFs:", error);
    }
}

mergePDFs();