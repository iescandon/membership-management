import { getData } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { ChapterDict } from "@/types";

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const txChapters: ChapterDict = {
    "atx": {
      chapterName: "Austin",
      chapterNum: 4622,
    },
    "dfw": {
      chapterName: "Dallas/Fort Worth",
      chapterNum: 9499,
    },
    "htx": {
      chapterName: "Houston",
      chapterNum: 9503,
    },
  };

  const t0 = performance.now(); 
  const { cityCode } = req.query;

  if (!cityCode) {
    res.status(400)
    return;
  }

  const { chapterNum } = txChapters[`${cityCode}`];

  if (!chapterNum) {
    res.status(400)
    return;
  }
  const url = `https://${process.env.NEXT_PUBLIC_CHAPTERS_API_URL}/${chapterNum}/id?populate%5B%5D=latinas_chapters`
  let jsonResponse;


  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    jsonResponse = await response.json();
  } catch (error) {
    console.error(error);
    res.status(400);
    throw error;
  }


  
  const t1 = performance.now(); 
  console.log(`Call to doSomething took ${t1 - t0} milliseconds.`)

  res.status(200).json(jsonResponse.data);
}
