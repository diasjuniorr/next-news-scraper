import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

interface ArticleResponse {
  title: string;
  paragraphs: string[];
}

interface Err {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleResponse | Err>
) {
  return new Promise<void>(async (resolve, reject) => {
    const { method } = req;

    if (method !== "POST") {
      res.status(404).json({ error: "Method not allowed" });
      return;
    }

    let { slug } = await req.body;
    slug = decodeQuestionMark(decodeSlash(slug));
    const paragraphs: string[] = [];

    try {
      axios(`https://www.economist.com${slug}`)
        .then((response) => {
          const data = response.data;
          const $ = cheerio.load(data);

          const title = $("span.article__headline").text();

          $("p.article__body-text", data).each((idx, el) => {
            paragraphs.push($(el).text());
          });

          return res.status(200).json({ title, paragraphs });
          resolve();
        })
        .catch((err) => {
          console.log("ERROR", err);
          res.status(404).json({ error: "Not found" });
          reject();
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
      resolve();
    }
  });
}

function decodeSlash(url: string) {
  return url.replace(/___/g, "/");
}

function decodeQuestionMark(url: string) {
  return url.replace(/---/g, "?");
}
