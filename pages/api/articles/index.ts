import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";
import Headline from "../../../interfaces/Headline";
import Discover from "../../../interfaces/Discover";
import Favorite from "../../../interfaces/Favorite";
import Section from "../../../interfaces/Section";
import List from "../../../interfaces/List";

const url = "https://www.economist.com";

interface ArticlesResponse {
  headlines: Headline[];
  discovers: Discover[];
  favorites: Favorite[];
  sections: Section[];
}

interface Err {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticlesResponse | Err>
) {
  try {
    const articles = await getArticles();
    return res.status(200).json(articles);
  } catch (error: any) {
    console.log("fetching articles failed: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getArticles(): Promise<ArticlesResponse | Err> {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const $ = cheerio.load(data);

    const headlines: Headline[] = [];
    const favorites: Favorite[] = [];
    const sections: Section[] = [];
    const sectionArticlesLists: List[][] = [];
    let discovers: Discover[] = [];

    $("a", data).each((idx, el) => {
      if ($(el).attr("data-analytics")?.includes("top_stories")) {
        const headline = scrapHeadline($(el));
        headlines.push(headline);
      }

      if ($(el).attr("data-analytics")?.includes("discover_rail")) {
        const discover = scrapDiscover($(el));
        discovers.push(discover);
      }

      if ($(el).attr("data-analytics")?.includes("readers_favourites")) {
        const favorite = scrapFavorite($(el));
        favorites.push(favorite);
      }
    });

    $("ul", data).each((idx, el) => {
      const firstLi = $(el).children().first();

      if (firstLi.hasClass("_lead-article")) {
        const sectionArticles: List[] = [];
        const sectionTitle = $(el)
          .parent()
          .find(".ds-section-headline-link")
          .text();

        const section: Section = {
          sectionTitle,
          sectionArticles,
        };

        $(el)
          .children()
          .each((idx, li) => {
            const sectionArticle = scrapSectionArticle($(li));
            sectionArticles.push(sectionArticle);
          });

        sectionArticlesLists.push(sectionArticles);
        sections.push(section);
      }
    });

    //original page renders the discover rail twice
    discovers = discovers.slice(0, 3);

    return { headlines, discovers, favorites, sections };
  } catch (e) {
    console.log("scraping articles failed: ", e);
    throw e;
  }
}

function scrapHeadline(node: any) {
  const title = node.text();
  const content = node.parent().parent().find("p").last().text();
  const img = node.parent().siblings().find("img").attr("src") || "";
  let href = node.attr("href") || "";

  if (href) {
    href = encodeQuestionMark(encodeSlash(removeBaseURL(href)));
  }

  return { title, content, img, href };
}

function scrapDiscover(node: any) {
  const title = node.text();
  const content = node.parent().siblings().text();
  const img =
    node.parent().parent().parent().parent().find("img").attr("src") || "";
  let href = node.attr("href") || "";

  if (href) {
    href = encodeQuestionMark(encodeSlash(removeBaseURL(href)));
  }

  return { title, content, href, img };
}

function scrapFavorite(node: any) {
  const title = node.text();
  let href = node.attr("href") || "";

  if (href) {
    href = encodeQuestionMark(encodeSlash(removeBaseURL(href)));
  }

  return { title, href };
}

function scrapSectionArticle(node: any) {
  const a = node.find("a");
  const title = a.text();
  const img = node.find("img").attr("src") || "";
  let href = a.attr("href") || "";

  if (href) {
    href = encodeQuestionMark(encodeSlash(removeBaseURL(href)));
  }

  return { title, href, img };
}

function removeBaseURL(url: string) {
  return url.replace(/https:\/\/www.economist.com/g, "");
}

//encode slashes to prevent browser from parsing them as urls
function encodeSlash(url: string) {
  return url.replace(/\//g, "___");
}

//encode question marks to prevent browser from parsing them as params
function encodeQuestionMark(url: string) {
  return url.replace(/\?/g, "---");
}
