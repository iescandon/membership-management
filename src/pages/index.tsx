import { useState } from "react";
import axios from "axios";
import MembersTable from "./components/membersTable";
import ChapterDropdown from "./components/chapterDropdown";
import { Typography } from "@mui/material";
import { ChapterUserData, UserData } from "@/types";

const headers = {
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<ChapterUserData[]>([]);

  const getMembers = async (cityCode: string) => {
    setIsLoading(true);
    // // const response = await axios.get(`/api/members?cityCode=${cityCode}&pageNum=1`, { headers });
    // const response = await axios.get(`/api/members?cityCode=${cityCode}&pageNum=1`);

    // let data: any[] = response.data.data;

    // const pageArray = Array.from(Array(response.data.last_page + 1).keys()).slice(2, response.data.last_page + 1);
    // // const pagePromises = Promise.all(pageArray.map((num) => axios.get(`/api/members?cityCode=${cityCode}&pageNum=${num}`, { headers })))
    // const pagePromises = Promise.all(pageArray.map((num) => axios.get(`/api/members?cityCode=${cityCode}&pageNum=${num}`)))
    // const pageResponses = await Promise.all([pagePromises]);

    // pageResponses[0].forEach((response: any) => {
    //   data = data.concat(response.data.data);
    // })

    // console.log(data);

    // setMemberData(data)
    const response = await axios.get(`/api/chapters?cityCode=${cityCode}`);
    console.log(Object.values(response.data.latinas_chapters))
    setMemberData(Object.values(response.data.latinas_chapters))
    setIsLoading(false);
  }

  return (
    <main
      className='flex justify-center'
    >
      <div className="flex flex-col items-center w-full h-screen text-sm p-12 py-8 space-y-6">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center">
            <img src="/images/logo.png" className="h-14 pr-2" alt="LIT logo" />
            <Typography variant="h1" className="text-3xl text-white font-semibold">
              Membership Management
            </Typography>
          </div>
          <ChapterDropdown callbackFn={getMembers} />
        </div>
        <div>
          <MembersTable memberData={memberData} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
