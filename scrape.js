import axios from "axios";
import * as cheerio from "cheerio";


async function scrapeSite(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Site konnte nicht gescraped werden!", error);
    throw error;
  }
}

async function parseHTML(url) {
  const htmlContent = await scrapeSite(url);
  const $ = cheerio.load(htmlContent);

  /* $("a").each((index, element) => {
    console.log($(element).attr("href"));
  }); */

  /* $("p").each((index, element) => {
    console.log($(element).text());
  }); */

  console.log($("mark.has-inline-color").text());
}

/* scrapeSite("https://portraits-gegen-rechts.vercel.app/"); */
/* scrapeSite("https://www.youtube.com/watch?v=LoziivfAAjE&t=275s"); */
/* parseHTML("https://www.wuerzburg.de/rathaus"); */
/* parseHTML("https://www.linkedin.com/in/philipp-mulfinger-941498b1/"); */
parseHTML("http://millionpainter.de/");
/* parseHTML("https://portraits-gegen-rechts.vercel.app/"); */
