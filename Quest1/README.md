# Quest 1 - PDF Crawler

A Node.js PDF crawler that automatically extracts PDFs from a given website and downloads them to a local `downloads/` folder.

---

## Features

- Accepts any **target URL** as a command-line input
- Detects **links and download buttons** containing PDFs
- Downloads PDFs in parallel
- Filters duplicate links
- Optimized with **request interception** and **browser-like headers** to avoid errors

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd project

Install dependencies:

npm install puppeteer axios fs

Usage

Run the crawler with a URL:

node src/index.js <TARGET_URL>

Example:

node src/index.js https://www.princexml.com/samples/

The PDFs will be saved in downloads/.