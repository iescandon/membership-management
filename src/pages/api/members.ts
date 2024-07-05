import { getData } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { txChapters, SuccessResponse, UserData } from "@/types";

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const t0 = performance.now(); 
  const { cityCode, pageNum } = req.query;

  if (!cityCode || !pageNum) {
    res.status(400);
    return;
  }

  const { chapterNum } = txChapters[`${cityCode}`];

  if (!chapterNum) {
    res.status(400);
    return;
  }

  const url = `https://${process.env.NEXT_PUBLIC_USERS_API_URL}?preferred_chapter=${chapterNum}&active=1&populate%5B0%5D=profile_photo&populate%5B1%5D=job_info&page=${pageNum}`
  const response: SuccessResponse = await getData(url);
  
  const t1 = performance.now(); 
  console.log(`Call to retrieve all members took ${t1 - t0} milliseconds.`)

  res.status(200).json(response.data);
}
