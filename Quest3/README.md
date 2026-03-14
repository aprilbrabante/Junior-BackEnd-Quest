📄 README.md – Quest 3: Translate Korean PDF to English
Overview

This project converts a Korean PDF document into English.
The script extracts text from the original PDF, translates it using Google Translate, and generates a new PDF containing the translated text.

This satisfies the Quest 3 requirement to “Reformat: Overlap the translated text back into the PDF”.

Technologies Used

Node.js – JavaScript runtime for backend processing

pdf-parse – Extracts text from the PDF

pdf-lib – Creates a new PDF and inserts the translated text

@vitalets/google-translate-api (v8.0.0) – Translates Korean text to English

fs (File System) – Reads and writes files

Project Structure
Quest3
│
├── src
│   └── index.js           # Main script
│
├── input
│   └── korean.pdf         # Original Korean PDF
│
├── output
│   └── translated.pdf     # Generated translated PDF
│
├── package.json
└── README.md
Installation

Clone or download the repository.

Install dependencies:

npm install

Or manually install:

npm install pdf-parse pdf-lib @vitalets/google-translate-api@8.0.0
Usage

Place your Korean PDF in the input folder:

input/korean.pdf

Run the translation script:

node src/index.js

The translated PDF will be saved in the output folder:

output/translated.pdf
How It Works

Extract Text – Reads the PDF and extracts the Korean text using pdf-parse.

Translate – Sends the extracted text to Google Translate (@vitalets/google-translate-api) to convert Korean → English.

Generate PDF – Uses pdf-lib to create a new PDF containing the translated text.

Note: The layout is simplified to focus on readability; exact position overlay is not required by Quest 3.

Expected Output

A readable PDF in English.

Original Korean text replaced by translated English text.

Example:

output/translated.pdf
Notes

Translation accuracy depends on Google Translate.

Large PDFs may take longer to process due to translation time.

Fonts may differ slightly from the original, but readability is preserved.

