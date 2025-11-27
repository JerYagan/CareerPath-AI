import { View, Text } from "react-native";
import { Message } from "@/types/chat";

export default function MessageBubble({ item }: { item: Message }) {
  const isMe = item.sender === "me";

  return (
    <View
      className={`my-2 p-4 rounded-2xl max-w-[80%] ${
        isMe ? "bg-brandBlue self-end" : "bg-gray-200 self-start"
      }`}
    >
      <Text className={isMe ? "text-white" : "text-gray-800"}>
        {item.text}
      </Text>

      <Text
        className={`text-xs mt-2 ${
          isMe ? "text-indigo-200" : "text-gray-500"
        }`}
      >
        {item.time}
      </Text>
    </View>
  );
}