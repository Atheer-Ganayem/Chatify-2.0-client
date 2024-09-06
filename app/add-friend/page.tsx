import Search from "@/components/add-friend/Search";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import Results from "../../components/add-friend/Results";

interface Props {
  searchParams: {
    search: string;
  };
}

const page: React.FC<Props> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-10">
      <Search />
      <Results term={searchParams.search} currentUserId={session.user.id} />
    </div>
  );
};

export default page;
