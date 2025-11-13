import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import chats from "@/assets/data/chats.json";
import AppSearchBar from "@/components/AppSearchBar";


const Chat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredChats = chats.filter(
    (chat) =>
      chat.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.representative.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white p-4">
      {/* Search Bar */}
        <AppSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search chats..."
        />

      {/* Chat List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredChats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            className="flex-row items-center mb-4"
            onPress={() => router.push(`./(chats)/${chat.id}`)}
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
                <Text
                  className="text-gray-500 text-sm flex-1"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {chat.lastMessage}
                </Text>
                {chat.unread && (
                  <View className="w-3 h-3 bg-indigo-600 rounded-full ml-2" />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredChats.length === 0 && (
          <Text className="text-center text-gray-400 mt-10">No chats found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Chat;
