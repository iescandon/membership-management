import { getData } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { ChapterDict, SuccessResponse, UserData } from "@/types";

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

  const houstonUrl = `https://${process.env.NEXT_PUBLIC_BASE_API_URL}?preferred_chapter=${chapterNum}&active=1&populate%5B0%5D=profile_photo&populate%5B1%5D=job_info`
  const page1response: SuccessResponse = await getData(`${houstonUrl}&page=1`);
  const totalPageCount: number = page1response.data.last_page;

  let data: UserData[] = page1response.data.data;
  const otherPagePromises = [];


  for (let i = 2; i < totalPageCount + 1; i++) {
    otherPagePromises.push(getData(`${houstonUrl}&page=${i}`));
  }

  const otherPageResponses: SuccessResponse[] = await Promise.all(otherPagePromises);

  otherPageResponses.forEach((response: SuccessResponse) => {
    data = data.concat(response.data.data);
  })

  const t1 = performance.now(); 
  console.log(`Call to doSomething took ${t1 - t0} milliseconds.`)

  res.status(200).json(data);
}
