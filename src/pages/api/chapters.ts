import type { NextApiRequest, NextApiResponse } from "next";
import { txChapters } from "@types";
import { getData } from "@utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
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
  let response = await getData(url);
  
  const t1 = performance.now(); 
  console.log(`Call to retrieve chapter took ${t1 - t0} milliseconds.`)

  res.status(200).json(response.data);
}
