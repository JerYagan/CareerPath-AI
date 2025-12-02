import React from "react";
import ChatRoom from "@/src/components/chats/ChatRoom";
import employerChats from "@/assets/data/employerData/chats.json";

export default function EmployerChatRoom() {
  return <ChatRoom chats={employerChats} />;
}