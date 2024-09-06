import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { Avatar, Button, Card } from "@nextui-org/react";
import { Mail } from "lucide-react";
import React from "react";
import CreateConversationButton from "./CreateConversationButton";

interface Props {
  term: string;
  currentUserId: string;
}

const Results: React.FC<Props> = async ({ term, currentUserId }) => {
  if (!term) {
    return null;
  }

  await connectDB();
  const users = await User.find({
    name: { $regex: term, $options: "i" },
    _id: { $ne: currentUserId },
  }).select("-password");

  return (
    <Card className="w-full max-w-xl">
      {users.length > 0 ? (
        users.map(user => (
          <div className="flex items-center justify-between p-4" key={user._id as string}>
            <div className="flex items-center gap-4">
              <Avatar src={process.env.AWS + "chatify-2.0/" + user.avatar} size="lg" />
              <h3 className="font-bold text-xl">{user.name}</h3>
            </div>
            <CreateConversationButton targetUserId={user._id as string} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center p-4 text-xl">
          No results found for <span className="font-bold">{`"${term}"`}</span>
        </div>
      )}
    </Card>
  );
};

export default Results;
