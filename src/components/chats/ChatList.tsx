import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Chat } from "@/src/types/chat";
import SearchBar from "../ui/SearchBar";

type ChatListProps = {
  chats: Chat[];
  routeBase: string;
};

const ChatList: React.FC<ChatListProps> = ({ chats, routeBase }) => {
  const [search, setSearch] = useState("");

  // Memoized search filter
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return chats.filter(
      (c) =>
        c.company.toLowerCase().includes(q) ||
        c.representative.toLowerCase().includes(q)
    );
  }, [search, chats]);
  

  return (
    <View className="flex-1 bg-white p-4">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search chats..."
        showFilter={false}
      />

      {/* Chat Items */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() => router.push(`${routeBase}/${chat.id}` as any)}
            className="flex-row items-center mb-4"
          >
            
            {/* PROFILE PIC + ONLINE DOT */}
            <View className="relative mr-4">
              <Image
                source={{ uri: chat.logo }}
                className="w-14 h-14 rounded-full bg-gray-200"
              />

              {/* Online / Offline Dot */}
              <View
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                  chat.online ? "bg-green-700" : "bg-gray-400"
                }`}
              />
            </View>

            {/* MAIN TEXT AREA */}
            <View className="flex-1 border-b border-gray-200 pb-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-900">
                  {chat.company}
                </Text>

                <Text className="text-xs text-gray-500">{chat.time}</Text>
              </View>

              <Text className="text-gray-600 text-sm">
                {chat.representative}
              </Text>

              <View className="flex-row justify-between items-center mt-1">
                <Text
                  className="text-gray-500 text-sm flex-1"
                  numberOfLines={1}
                >
                  {chat.lastMessage}
                </Text>

                {/* UNREAD BADGE ON THE RIGHT SIDE */}
                {chat.unreadCount > 0 && (
                  <View className="bg-brandBlue px-2 py-0.5 rounded-full ml-2 min-w-[20px] items-center justify-center">
                    <Text className="text-white text-xs font-bold">
                      {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatList;
