import { useState } from "react";
import axios from "axios";
import MembersTable from "./components/membersTable";
import ChapterDropdown from "./components/chapterDropdown";
import { Typography } from "@mui/material";
import { UserData } from "@/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<UserData[]>([]);

  const getMembers = async (cityCode: string) => {
    setIsLoading(true);
    const response = await axios.get(`/api/members?cityCode=${cityCode}`);
    setMemberData(response.data)
    setIsLoading(false);
  }

  return (
    <main
      className='flex justify-center'
    >
      <div className="flex flex-col items-center w-full h-screen text-sm p-12 py-8 space-y-6">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center">
            <img src="/images/logo.png" className="h-14 pr-2" />
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
