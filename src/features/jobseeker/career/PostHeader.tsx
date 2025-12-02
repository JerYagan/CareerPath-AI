import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

const PostHeader = ({
  post,
  onOptions,
}: {
  post: any;
  onOptions: () => void;
}) => {
  return (
    <View className="flex-row justify-between">
      <View className="flex-row items-center flex-1">
        <View className="w-14 h-14 bg-gray-200 rounded-full items-center justify-center mr-3">
          <Text className="text-lg font-bold text-gray-800">
            {getInitials(post.name)}
          </Text>
        </View>

        <View className="flex-1">
          <Text className="font-semibold text-gray-900 text-base">
            {post.name}
          </Text>
          <Text className="text-gray-500 text-base">{post.position}</Text>
          <Text className="text-gray-400 text-sm">{post.time}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onOptions}>
        <Ionicons name="ellipsis-vertical" size={22} color="#555" />
      </TouchableOpacity>
    </View>
  );
};

export default PostHeader;
