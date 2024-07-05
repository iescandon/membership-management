import { useState } from "react";
import axios from "axios";
import MembersTable from "./components/membersTable";
import ChapterDropdown from "./components/chapterDropdown";
import { ChapterUserData, UserData } from "@/types";
import Title from "./components/title";

// const headers = {
//   'Cache-Control': 'no-cache',
//   'Pragma': 'no-cache',
//   'Expires': '0',
// };

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<ChapterUserData[]>([]);

  const getMembers = async (cityCode: string) => {
    setIsLoading(true);
    // const response = await axios.get(`/api/members?cityCode=${cityCode}&pageNum=1`);

    // let data: UserData[] = response.data.data;

    // const pageArray = Array.from(Array(response.data.last_page + 1).keys()).slice(2, response.data.last_page + 1);
    // const pagePromises = pageArray.map((num) => axios.get(`/api/members?cityCode=${cityCode}&pageNum=${num}`));
    // const pageResponses = await Promise.all(pagePromises);

    // pageResponses.forEach((response: any) => {
    //   data = data.concat(response.data.data);
    // })

    // setMemberData(data)
    const response = await axios.get(`/api/chapters?cityCode=${cityCode}`);
    console.log(Object.values(response.data.latinas_chapters))
    setMemberData(Object.values(response.data.latinas_chapters))
    setIsLoading(false);
  }

  return (
    <main>
      <div className="flex flex-col items-center w-full h-screen text-sm px-10 py-8 space-y-6">
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center">
          <Title />
          <ChapterDropdown callbackFn={getMembers} />
        </div>
        <div className="pb-10 md:pb-0">
          <MembersTable memberData={memberData} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
