import { useState } from "react";
import axios from "axios";
import { MembersTable, Navbar } from "@components";
import { ChapterUserData } from "@types";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<ChapterUserData[]>([]);

  const getMembers = async (cityCode: string) => {
    setIsLoading(true);
    const response = await axios.get(`/api/chapters?cityCode=${cityCode}`);
    setMemberData(Object.values(response.data.latinas_chapters))
    setIsLoading(false);
  }

  return (
    <main>
      <div className="flex flex-col items-center w-full min-h-screen text-sm">
        <Navbar callbackFn={getMembers} />
        <MembersTable memberData={memberData} isLoading={isLoading} />
      </div>
    </main>
  );
}
