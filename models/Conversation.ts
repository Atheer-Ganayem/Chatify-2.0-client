import mongoose from "mongoose";
import { IUser } from "./User";
require("./User");
require("./Message");

export interface IConversation extends mongoose.Document {
  participants: IUser[];
  lastMessage: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const ConversationSchema: mongoose.Schema<IConversation> = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const Conversation: mongoose.Model<IConversation> =
  mongoose.models.Conversation || mongoose.model<IConversation>("Conversation", ConversationSchema);

export default Conversation;
