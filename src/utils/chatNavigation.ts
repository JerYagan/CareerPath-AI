import { useSegments } from "expo-router";

export const useChatRouteBase = () => {
  const segments = useSegments();
  const isJobseeker = segments[0] === "jobseeker";
  return isJobseeker ? "/jobseeker/Chats" : "/employer/Chats";
};