import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Chat } from "@/types/chat";

type ChatListProps = {
  chats: Chat[];
  routeBase: string;
};

const ChatList: React.FC<ChatListProps> = ({ chats, routeBase }) => {
  const [search, setSearch] = useState("");

  const filtered = chats.filter(
    (c) =>
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.representative.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white p-4">
      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-4">
        <Ionicons name="search-outline" size={20} color="#9ca3af" />
        <TextInput
          placeholder="Search chats..."
          placeholderTextColor="#9ca3af"
          className="flex-1 ml-2 text-gray-900"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            className="flex-row items-center mb-4"
            onPress={() =>
              router.push({
                pathname: `${routeBase}/${chat.id}` as any,
              })
            }
          >
            <Image
              source={{ uri: chat.logo }}
              className="w-14 h-14 rounded-full bg-gray-200 mr-4"
            />
            <View className="flex-1 border-b border-gray-200 pb-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-900">
                  {chat.company}
                </Text>
                <Text className="text-xs text-gray-500">{chat.time}</Text>
              </View>

              <Text className="text-gray-600 text-sm">{chat.representative}</Text>

              <View className="flex-row justify-between items-center mt-1">
                <Text className="text-gray-500 text-sm flex-1" numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
                {chat.unread && (
                  <View className="w-3 h-3 bg-indigo-600 rounded-full ml-2" />
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