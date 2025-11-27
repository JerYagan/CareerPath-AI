import ChatList from "@/components/chats/ChatList";
import jobseekerChats from "@/assets/data/chats.json";

export default function JobseekerChat() {
  return <ChatList chats={jobseekerChats} routeBase="/jobseeker/Chats" />;
}
