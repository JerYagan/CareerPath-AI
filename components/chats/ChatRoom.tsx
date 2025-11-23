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
import { SafeAreaView } from "react-native-safe-area-context";
import { Chat, Message, RawMessage } from "@/types/chat";

type ChatRoomProps = {
  chats: Chat[];
};

const formatTime = (date: Date): string => {
  const h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m} ${ampm}`;
};

const ChatRoom: React.FC<ChatRoomProps> = ({ chats }) => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const chatId = Number(id);

  const chatIndex = chats.findIndex((c) => c.id === chatId);
  const chat = chats[chatIndex];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (!chat) return;

    const loaded: Message[] = chat.messages.map((m) => ({
      id: m.id,
      text: m.text,
      sender: (m.sender === "me" ? "me" : "them") as "me" | "them",
      time: m.time,
      read: m.read ?? true,
    }));

    setMessages(loaded);

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 50);
  }, [chatId]);

  const sendMessage = () => {
    if (!input.trim() || !chat) return;

    const now = new Date();

    const newMsg: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "me",
      time: formatTime(now),
      read: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 80);

    // Fake reply simulation
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      const reply: Message = {
        id: Date.now() + 1,
        text: "Got it!",
        sender: "them",
        time: formatTime(new Date()),
        read: true,
      };

      setMessages((prev) => {
        const updated = prev.map((m) =>
          m.sender === "me" ? { ...m, read: true } : m
        );
        return [...updated, reply];
      });

      setTimeout(
        () => flatListRef.current?.scrollToEnd({ animated: true }),
        60
      );
    }, 2000);
  };

  if (!chat) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Chat not found.</Text>
      </SafeAreaView>
    );
  }

return (
  <View className="mt-8 flex-1">
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Image source={{ uri: chat.logo }} className="w-10 h-10 rounded-full mr-3" />

          <View>
            <Text className="font-semibold text-base">{chat.company}</Text>
            <Text className="text-gray-500 text-sm">{chat.representative}</Text>
            <Text className="text-xs text-gray-400">
              {chat.lastSeen || "Last seen recently"}
            </Text>
          </View>
        </View>

        <Entypo name="dots-three-vertical" size={20} color="black" />
      </View>

    {/* CHAT + INPUT MOVES WITH KEYBOARD */}
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 30}
    >
      <View className="flex-1">

        {/* MESSAGES */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 12,
          }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          renderItem={({ item }) => (
            <View
              className={`my-1 p-3 rounded-2xl max-w-[80%] ${
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
                  item.sender === "me" ? "text-indigo-100" : "text-gray-500"
                }`}
              >
                {item.time}
              </Text>

              {item.sender === "me" && (
                <Text className="text-[10px] mt-1 text-indigo-200 self-end">
                  {item.read ? "Seen" : "Delivered"}
                </Text>
              )}
            </View>
          )}
        />

        {/* INPUT BAR */}
        <View className="flex-row items-center p-3 border-t border-gray-200 bg-white">
          <TextInput
            className="flex-1 bg-gray-100 rounded-xl px-4 py-3 mr-2"
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
            onFocus={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={26} color="#4f46e5" />
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>

  </View>
);

};

export default ChatRoom;
