# Quest 4: Node.js Web Crawler

This is a Node.js web crawler that runs in a Linux environment (WSL).  
It extracts links from a website, saves them in structured JSON format, and logs errors automatically.

---

## Setup

Install WSL (Ubuntu) on Windows
   ```bash
   wsl --install

Install Node.js and npm inside Ubuntu

sudo apt update
sudo apt install nodejs npm -y

Clone the repository

git clone <your-github-repo-url>
cd quest4-crawler
npm install

## Usage

Run the crawler manually:

node index.js https://web-scraping.dev/products

Output:

output.json → structured JSON data (links)

crawl.log → error logs (if any)

## Automation (Optional)

You can schedule the crawler to run automatically using cron:

Open your user’s cron editor:

crontab -e

Add a line to run the crawler daily at 2 AM:

0 2 * * * cd /home/<your-linux-username>/quest4-crawler && node crawler.js https://web-scraping.dev/products

Save and exit. The crawler will now run automatically every day.

## Loom Video URL
https://www.loom.com/share/f1cc58079004457fb3bf374231e2b695