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
  const {method } = req
  
  if (method !== "POST") {
    res.status(404).json({ error: "Method not allowed" });
    return;
  }
  
  let {slug} = await req.body
  slug = decodeQuestionMark(decodeSlash(slug))
  const paragraphs: string[] = []
  
  try {
    axios(`https://www.economist.com${slug}`).then((response) => {
      const data = response.data;
      const $ = cheerio.load(data);

      const title = $("span.article__headline").text();

      $("p.article__body-text", data).each((idx, el) => {
        paragraphs.push($(el).text())
      })

     console.log("DEBUG", title) 
    return res.status(200).json({title,paragraphs});
    }).catch((err) => {
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function decodeSlash(url: string) {
  return url.replace(/___/g, "/");
}

function decodeQuestionMark(url: string) {
  return url.replace(/---/g, "?");
}