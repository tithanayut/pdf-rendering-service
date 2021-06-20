const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.get("/api", async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res
            .status(400)
            .json({ errors: ["url not found in query params"] });
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
});

module.exports = app;
