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
    <DraggableSheet visible={visible} onClose={onClose} height="large">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-gray-900">Comments</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Post Mini Preview */}
        {post && (
          <View className="mb-4">
            <Text className="font-semibold text-gray-900 mb-1">{post.name}</Text>
            <Text className="text-gray-700" numberOfLines={2}>
              {post.text}
            </Text>
          </View>
        )}

        <View className="h-[1px] bg-gray-200 mb-4" />

        {/* Comment List */}
        <ScrollView className="flex-1">
          {comments?.length > 0 ? (
            comments.map((c: any) => (
              <View key={c.id} className="flex-row mb-5">
                <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mr-3">
                  <Text className="font-bold">{getInitials(c.author)}</Text>
                </View>

                <View className="flex-1">
                  <Text className="font-semibold text-gray-900">{c.author}</Text>
                  <Text className="text-gray-800">{c.text}</Text>
                  <Text className="text-xs text-gray-400 mt-1">{c.time}</Text>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center mt-10">
              <Ionicons name="chatbubbles-outline" size={32} color="#999" />
              <Text className="text-gray-500 mt-2">No comments yet.</Text>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View className="flex-row items-center mt-4">
          <TextInput
            placeholder="Write a comment..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 mr-2"
            value={newCommentText}
            onChangeText={setNewCommentText}
          />
          <TouchableOpacity
            onPress={onSubmit}
            disabled={!newCommentText.trim()}
            className={`p-3 rounded-xl ${
              newCommentText.trim() ? "bg-brandBlue" : "bg-blue-300"
            }`}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </DraggableSheet>
  );
};

export default CommentsSheet;