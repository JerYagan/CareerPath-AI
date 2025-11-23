import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DraggableSheet from "./DraggableSheet";

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

const CommentsSheet = ({
  post,
  comments,
  visible,
  onClose,
  newCommentText,
  setNewCommentText,
  onSubmit,
}: any) => {
  return (
    <DraggableSheet visible={visible} onClose={onClose}>
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-gray-900">Comments</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Post preview */}
        {post && (
          <View className="mb-3">
            <Text className="font-semibold text-base text-gray-900">
              {post.name}
            </Text>
            <Text className="text-base text-gray-700" numberOfLines={2}>
              {post.text}
            </Text>
          </View>
        )}

        <View className="h-[1px] bg-gray-200 mb-3" />

        {/* COMMENTS LIST */}
        <ScrollView className="flex-1">
          {comments?.length ? (
            comments.map((c: any) => (
              <View key={c.id} className="flex-row mb-4">
                <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mr-3">
                  <Text className="text-base font-bold">
                    {getInitials(c.author)}
                  </Text>
                </View>

                <View className="flex-1">
                  <Text className="font-semibold text-base">{c.author}</Text>
                  <Text className="text-base">{c.text}</Text>
                  <Text className="text-sm text-gray-400">{c.time}</Text>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center mt-8">
              <Ionicons name="chatbubbles-outline" size={32} color="#aaa" />
              <Text className="text-gray-500 text-base mt-2">
                No comments yet.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* INPUT */}
        <View className="flex-row items-center mb-8">
          <TextInput
            placeholder="Write a comment..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-base mr-2"
            value={newCommentText}
            onChangeText={setNewCommentText}
          />
          <TouchableOpacity
            onPress={onSubmit}
            disabled={!newCommentText.trim()}
            className={`p-3 rounded-xl ${
              newCommentText.trim() ? "bg-blue-600" : "bg-blue-300"
            }`}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </DraggableSheet>
  );
};

export default CommentsSheet;
