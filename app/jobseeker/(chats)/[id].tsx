import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, Entypo } from "@expo/vector-icons";
import chats from "@/assets/data/chats.json";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  id: number;
  text: string;
  sender: "me" | "them";
  time: string;
};

// helper to format time like "10:45 AM"
const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

const ChatRoom = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const chatId = Number(id);
  const chatIndex = chats.findIndex((c) => c.id === chatId);
  const chat = chats[chatIndex];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  // Load messages whenever chat id changes
  useEffect(() => {
    if (chat) {
      const loadedMessages = chat.messages.map((msg) => ({
        id: msg.id,
        text: msg.text,
        sender: msg.sender as "me" | "them",
        time: msg.time || formatTime(new Date()), // add time if missing
      }));
      setMessages(loadedMessages);

      // Scroll to bottom after loading
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 50);
    }
  }, [id]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const now = new Date();
    const newMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "me",
      time: formatTime(now),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Scroll to bottom
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);

    // Update last message locally
    if (chatIndex !== -1) {
      chats[chatIndex].lastMessage = newMessage.text;
      chats[chatIndex].time = newMessage.time;
      chats[chatIndex].unread = true;
    }
  };

  if (!chat) return <Text>Chat not found.</Text>;

return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
  >
    {/* This replaces SafeAreaView WITHOUT breaking keyboard behavior */}
    <View className="flex-1 bg-white" style={{ paddingTop: Platform.OS === "android" ? 35 : 0 }}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">

          {/* HEADER */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => router.push("/jobseeker/Chat")}
                className="mr-3"
              >
                <Ionicons name="arrow-back" size={22} color="black" />
              </TouchableOpacity>

              {chat.logo && (
                <Image
                  source={{ uri: chat.logo }}
                  className="w-10 h-10 rounded-full mr-3 bg-gray-200"
                />
              )}

              <View>
                <Text className="text-lg font-semibold">{chat.company}</Text>
                <Text className="text-sm text-gray-500">{chat.representative}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => console.log("settings")} className="p-2">
              <Entypo name="dots-three-vertical" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* MESSAGES */}
          <View className="flex-1">
            <FlatList
              ref={flatListRef}
              data={[...messages].reverse()}
              inverted
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  className={`m-2 p-3 rounded-2xl max-w-[80%] ${
                    item.sender === "me"
                      ? "bg-indigo-600 self-end"
                      : "bg-gray-200 self-start"
                  }`}
                >
                  <Text className={item.sender === "me" ? "text-white" : "text-gray-800"}>
                    {item.text}
                  </Text>

                  <Text
                    className={`text-xs mt-1 ${
                      item.sender === "me"
                        ? "text-indigo-100 self-end"
                        : "text-gray-500"
                    }`}
                  >
                    {item.time}
                  </Text>
                </View>
              )}
              contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 6 }}
            />
          </View>

          {/* INPUT BAR */}
          <View className="flex-row items-center border-t border-gray-200 p-3 bg-white">
            <TouchableOpacity className="mr-2">
              <Ionicons name="attach-outline" size={24} color="gray" />
            </TouchableOpacity>

            <TextInput
              className="flex-1 bg-gray-100 rounded-lg px-4 py-3 mr-2"
              placeholder="Type a message..."
              value={input}
              onChangeText={setInput}
            />

            <TouchableOpacity onPress={sendMessage} className="p-3">
              <Ionicons name="send" size={22} color="indigo" />
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>

    </View>
  </KeyboardAvoidingView>
);


};

export default ChatRoom;