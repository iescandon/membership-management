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
    return;
  }

  const { chapterNum } = txChapters[`${cityCode}`];

  if (!chapterNum) {
    return;
  }

  const houstonUrl = `https://${process.env.NEXT_PUBLIC_CHAPTERS_API_URL}/${chapterNum}/id?populate%5B%5D=latinas_chapters`
  const response = await getData(houstonUrl);
  
  const t1 = performance.now(); 
  console.log(`Call to doSomething took ${t1 - t0} milliseconds.`)

  res.status(200).json(response.data);
}
