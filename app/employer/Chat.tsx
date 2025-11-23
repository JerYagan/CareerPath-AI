import ChatList from "@/components/chats/ChatList";
import employerChats from "@/assets/data/employerData/chats.json";

export default function EmployerChat() {
  return <ChatList chats={employerChats} routeBase="/employer/Chats" />;
}