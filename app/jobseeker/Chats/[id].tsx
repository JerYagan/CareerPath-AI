import React from "react";
import ChatRoom from "@/components/chats/ChatRoom";
import jobseekerChats from "@/assets/data/chats.json";

export default function JobseekerChatRoom() {
  return <ChatRoom chats={jobseekerChats} />;
}
