import express from "express";
import cors from "cors";
import { parseHTML, scrapeSite } from "./controller/scrapeController.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/scrape", async (req, res) => {
  const url =
    req.query.url || "https://webscraper.io/test-sites/e-commerce/static";
  const searchType = req.query.searchType;

  try {
    const htmlContent = await scrapeSite(url);
    const result = await parseHTML(htmlContent, searchType);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message || "Fehler beim verarbeiten der Seite.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
