import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
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

    if (method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    let { href } = req.query;

    if (!href) {
      return res.status(404).json({ error: "No href" });
    }

    href = decodeQuestionMark(decodeSlash(href as string));
    const paragraphs: string[] = [];

    try {
      axios(`https://www.economist.com${href}`)
        .then((response) => {
          const data = response.data;
          const $ = cheerio.load(data);

          const title = $("span.article__headline").text();

          $("p.article__body-text", data).each((idx, el) => {
            paragraphs.push($(el).text());
          });

          res.status(200).json({ title, paragraphs });
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
