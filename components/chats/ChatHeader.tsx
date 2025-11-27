import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Chat } from "@/types/chat";

type Props = {
  chat: Chat;
  onBack: () => void;
  onOptions: () => void;
};

export default function ChatHeader({ chat, onBack, onOptions }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-6 border-b border-gray-200">
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="relative mx-3">
        <Image source={{ uri: chat.logo }} className="w-10 h-10 rounded-full" />

        {/* ONLINE DOT */}
        <View
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            chat.online ? "bg-green-700" : "bg-gray-400"
          }`}
        />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold">{chat.company}</Text>
          <Text className="text-brandBlue font-semibold">
            {chat.representative}
          </Text>
        </View>

        <Text className="text-xs text-gray-400">
          {chat.lastSeen || "Last seen recently"}
        </Text>
      </View>

      <TouchableOpacity onPress={onOptions}>
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}
