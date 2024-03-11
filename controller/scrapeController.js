import axios from "axios";
import * as cheerio from "cheerio";

// Funktion zum Abrufen der HTML-Inhalte einer Website
export async function scrapeSite(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Site konnte nicht gescraped werden!", error);
    throw new Error("Fehler beim Scrapen der Seite.");
  }
}

// Funktion zum Parsen des HTML-Inhalts basierend auf dem gesuchten Typ
export async function parseHTML(htmlContent, searchType) {
  const $ = cheerio.load(htmlContent);
  // Arrays zum Speichern der href-Attribute, h1 headlines und der Wortsuche
  const links = [];
  const headlinesArr = [];
  const wordSearchArr = [];

  switch (searchType) {
    case "web-links":
      $("a").each((index, element) => {
        const href = $(element).attr("href");
        // Prüfen Sie, ob href existiert, mit "http" beginnt und länger als 5 Zeichen ist, bevor Sie es zum Array hinzufügen
        if (href && href.includes("http") && href.length > 5) {
          links.push(href); // Fügen Sie das href-Attribut zum Array hinzu, wenn es die Bedingungen erfüllt
        }
      });
      return links; // Geben Sie das Array der gesammelten href-Attribute zurück

    case "h1-headlines":
      $("h1").each((index, element) => {
        const headlineText = $(element).text();
        if (headlineText) headlinesArr.push(headlineText);
      });
      return headlinesArr;

    case "p-text":
      $("p").each((index, element) => {
        //p Texte sollen nach einem bestimmten Text durchsucht werden
        const pText = $(element).text();
        /* if (pText.toLowerCase().includes(" ".toLowerCase())) */
        wordSearchArr.push(pText);
      });
      return wordSearchArr;

    default:
      console.error("Unbekannter searchType: ", searchType);
      return [];
  }
}
