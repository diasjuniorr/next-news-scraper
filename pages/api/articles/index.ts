import type { NextApiRequest, NextApiResponse } from "next";
import { http } from "../../../util/http";
import * as cheerio from "cheerio";
import Headline from "../../../interfaces/Headline";
import Discover from "../../../interfaces/Discover";
import Favorite from "../../../interfaces/Favorite";
import Section from "../../../interfaces/Section";
import List from "../../../interfaces/List";

const website = "https://www.economist.com";

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
    console.log("request failed: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getArticles(): Promise<ArticlesResponse | Err> {
  try {
    const response = await http(website);
    const data = await response.text();
    const $ = cheerio.load(data);

    const headlines: Headline[] = [];
    const favorites: Favorite[] = [];
    const sections: Section[] = [];
    const lists: List[][] = [];
    let discovers: Discover[] = [];

    $("a", data).each((idx, el) => {
      const attr = $(el).attr("data-analytics");
      if (typeof attr !== typeof undefined) {
        if ($(el).attr("data-analytics")?.includes("top_stories")) {
          const title = $(el).text();
          const content = $(el).parent().parent().find("p").last().text();
          const img = $(el).parent().siblings().find("img").attr("src") || "";
          let href = $(el).attr("href") || "";

          if (href) {
            href = encodeQuestionMark(encodeSlash(removeBaseURL(href)));
          }

          headlines.push({
            title,
            content,
            href,
            img,
          });
        }

        if ($(el).attr("data-analytics")?.includes("discover_rail")) {
          const title = $(el).text();
          const content = $(el).parent().siblings().text();
          const img =
            $(el).parent().parent().parent().parent().find("img").attr("src") ||
            "";
          let href = $(el).attr("href") || "";

          if (href) {
            href = encodeQuestionMark(encodeSlash(removeBaseURL(href)));
          }

          discovers.push({
            title,
            href,
            content,
            img,
          });
        }

        if ($(el).attr("data-analytics")?.includes("readers_favourites")) {
          const title = $(el).text();
          let href = $(el).attr("href") || "";

          if (href) {
            href = encodeQuestionMark(encodeSlash(removeBaseURL(href)));
          }

          favorites.push({
            title,
            href,
          });
        }
      }
    });

    $("ul", data).each((idx, el) => {
      const firstLi = $(el).children().first();

      if (firstLi.hasClass("_lead-article")) {
        const ul: List[] = [];
        const s = $(el).parent().find(".ds-section-headline-link").text();
        const section: Section = {
          section: s,
          list: ul,
        };

        $(el)
          .children()
          .each((idx, li) => {
            const a = $(li).find("a");
            const title = a.text();
            const img = $(li).find("img").attr("src") || "";
            let href = a.attr("href") || "";

            if (href) {
              href = encodeQuestionMark(encodeSlash(removeBaseURL(href)));
            }

            ul.push({ title, href, img });
          });

        lists.push(ul);
        sections.push(section);
      }
    });

    discovers = discovers.slice(0, 3);

    return { headlines, discovers, favorites, sections };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

function removeBaseURL(url: string) {
  return url.replace(/https:\/\/www.economist.com/g, "");
}

function encodeSlash(url: string) {
  return url.replace(/\//g, "___");
}

function encodeQuestionMark(url: string) {
  return url.replace(/\?/g, "---");
}
