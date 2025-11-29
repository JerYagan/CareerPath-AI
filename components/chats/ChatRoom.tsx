import React, { useState, useEffect, useRef } from "react";
import { Text, View, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Chat, Message } from "@/types/chat";
import ChatHeader from "@/components/chats/ChatHeader";
import ChatInput from "@/components/chats/ChatInput";
import MessageBubble from "@/components/chats/MessageBubble";
import ChatOptionsSheet from "./ChatOptionsSheet";

import { castMessages, simulateReply, formatTime } from "@/helpers/chat";
import { useChatRouteBase } from "@/helpers/chatNavigation";
import { useLocalSearchParams, useRouter } from "expo-router";

import * as DocumentPicker from "expo-document-picker";

type Props = {
  chats: Chat[];
};

export default function ChatRoom({ chats }: Props) {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const chatId = Number(id);
  const chat = chats.find((c) => c.id === chatId);

  const flatListRef = useRef<FlatList<Message>>(null);
  const router = useRouter();
  const routeBase = useChatRouteBase();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  useEffect(() => {
    if (!chat) return;
    setMessages(castMessages(chat.messages));
    setTimeout(
      () => flatListRef.current?.scrollToEnd({ animated: false }),
      50
    );
  }, [chatId]);

  if (!chat) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Chat not found.</Text>
      </SafeAreaView>
    );
  }

  const onSend = () => {
    if (!input.trim()) return;

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

    setTimeout(
      () => flatListRef.current?.scrollToEnd({ animated: true }),
      50
    );

    simulateReply(setTyping, setMessages);
  };

  return (
    <View className="mt-8 flex-1">
      <ChatHeader
        chat={chat}
        onBack={() => router.push(routeBase)}
        onOptions={() => setOptionsVisible(true)}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(m) => m.id.toString()}
          renderItem={({ item }) => <MessageBubble item={item} />}
          contentContainerStyle={{ padding: 12 }}
        />

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={onSend}
          onAttach={async () => {
            try {
              const result = await DocumentPicker.getDocumentAsync({
                multiple: false,
                copyToCacheDirectory: true,
              });

              if (result.canceled || !result.assets?.length) return;

              const file = result.assets[0];

              const newMsg: Message = {
                id: Date.now(),
                text: `📎 Attached: ${file.name ?? "Unnamed file"}`,
                sender: "me",
                time: formatTime(new Date()),
                read: false,
                attachment: {
                  uri: file.uri,
                  name: file.name ?? "Untitled",
                  mimeType: file.mimeType ?? "",
                },
              };

              setMessages((prev) => [...prev, newMsg]);

              setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
            } catch (err) {
              console.log("Attachment error:", err);
            }
          }}
        />
      </KeyboardAvoidingView>


      <ChatOptionsSheet
        visible={optionsVisible}
        onClose={() => setOptionsVisible(false)}
      />
    </View>
  );
}