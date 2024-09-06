"use client";

import { Button, Card } from "@nextui-org/react";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const MainCard = ({ children }: { children: React.ReactNode }) => {
  const { chatId } = useParams();

  return (
    <>
      <Card className="grid-cols-3 h-[80vh] hidden lg:grid max-w-7xl mx-auto mt-6">{children}</Card>
      <div className="block lg:hidden">
        {chatId && (
          <div className="flex justify-between mt-2 mb-3">
            <Button className="w-fit mx-3" as={Link} href="/chat">
              <ArrowBigLeft />
            </Button>
            <Button className="w-fit mx-3" as={Link} href="/add-friend" color="primary">
              Add Friend
            </Button>
          </div>
        )}
        <Card className="h-[80vh] mx-3">
          {children
            ? chatId
              ? (children as React.ReactNode[])[1]
              : (children as React.ReactNode[])[0]
            : null}
        </Card>
      </div>
    </>
  );
};

export default MainCard;
