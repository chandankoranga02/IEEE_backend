import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

/**
 * Launches Puppeteer, renders the provided HTML string, and returns a PDF Buffer.
 * Supports both production (Render / Linux using @sparticuz/chromium) and local development (Windows / Mac).
 * @param {string} html - Fully rendered certificate HTML string.
 * @returns {Promise<Buffer>} - PDF as a Node.js Buffer.
 */
const generateCertificatePDF = async (html) => {
  let browser;

  try {
    let executablePath;
    let args;
    let defaultViewport = chromium.defaultViewport;
    let headless = chromium.headless;

    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
      args = [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ];
    } else if (process.platform === "linux") {
      // Production Linux / Render environment
      executablePath = await chromium.executablePath();
      args = [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--no-zygote",
        "--single-process",
      ];
    } else {
      // Local development (Windows / macOS)
      const puppeteerLocal = await import("puppeteer");
      executablePath = await puppeteerLocal.default.executablePath();
      args = [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ];
      defaultViewport = null;
      headless = true;
    }

    browser = await puppeteer.launch({
      executablePath,
      args,
      defaultViewport,
      headless,
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export default generateCertificatePDF;
