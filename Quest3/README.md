# Quest 3: Translate Korean PDF to English

This project converts a Korean PDF document into English.
The script extracts text from the original PDF, translates it using Google Translate, and generates a new PDF containing the translated text.
This satisfies the Quest 3 requirement to “Reformat: Overlap the translated text back into the PDF”.

## Installation

Clone or download the repository.

Install dependencies:

npm install

Or manually install:

npm install pdf-parse pdf-lib @vitalets/google-translate-api@8.0.0

## Usage

Place your Korean PDF in the input folder:

input/korean.pdf

Run the translation script:

node src/index.js

The translated PDF will be saved in the output folder:

output/translated.pdf

## Loom Video URL
https://www.loom.com/share/2ff598d498894598b15455fa8dc038d1