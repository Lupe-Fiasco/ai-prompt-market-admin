import React, { FC } from "react";
import Sidebar from "@/components/Sidebar";
import Heading from "@/utils/Heading";
import AllPrompts from "@/components/Admin/AllPrompts";
import { GetPrompts } from "@/actions/prompt/getPrompts";

interface Props { }

const Page: FC<Props> = async (props) => {
  const data = await GetPrompts();

  return (
    <div>
      <Heading
        title="YoungMoney - Admin"
        description="YoungMoney Best!"
        keywords="YoungMoney,Fezco,Fez,Front-End"
      />
      <div className="flex min-h-screen">
        <div className="2xl:w-[16%] w-1/5">
          <Sidebar activeItem="All Prompts" />
        </div>
        <div className="2xl:w-[84%] w-[80%]">
          <AllPrompts data={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
