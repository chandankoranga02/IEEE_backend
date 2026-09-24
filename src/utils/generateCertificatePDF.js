import puppeteer from "puppeteer";

/**
 * Launches Puppeteer, renders the provided HTML string, and returns a PDF Buffer.
 * @param {string} html - Fully rendered certificate HTML string.
 * @returns {Promise<Buffer>} - PDF as a Node.js Buffer.
 */
const generateCertificatePDF = async (html) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
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
