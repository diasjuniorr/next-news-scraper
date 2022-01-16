import type { NextApiRequest, NextApiResponse } from "next";
import { http } from "../../../util/http";
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
    const response = await http(`https://economist.com${href}`);
    const data = await response.text();
    const $ = cheerio.load(data);

    const title = $("span.article__headline").text();

    $("p.article__body-text", data).each((idx, el) => {
      paragraphs.push($(el).text());
    });

    return res.status(200).json({ title, paragraphs });
  } catch (e) {
    console.log("request failed: ", e);
    return res.status(500).json({ error: "Failed to fetch article" });
  }
}

function decodeSlash(url: string) {
  return url.replace(/___/g, "/");
}

function decodeQuestionMark(url: string) {
  return url.replace(/---/g, "?");
}
