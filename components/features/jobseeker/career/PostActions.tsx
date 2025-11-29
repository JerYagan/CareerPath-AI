import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LikeButton from "./LikeButton";

const PostActions = ({
  post,
  onLike,
  onComment,
  onShare,
  onSave,
}: {
  post: any;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onSave: () => void;
}) => {
  return (
    <View className="flex-row justify-between pt-3 border-t border-gray-200">

      {/* LIKE */}
      <View className="flex-row items-center gap-2 px-2 py-2">
        <LikeButton liked={post.isLiked} onPress={onLike} />
        <Text className="text-gray-800 text-base">{post.likes}</Text>
      </View>

      {/* COMMENT */}
      <TouchableOpacity
        className="flex-row items-center gap-2 px-2 py-2"
        onPress={onComment}
      >
        <Ionicons name="chatbubble-outline" size={28} color="#555" />
        <Text className="text-gray-800 text-base">
          {post.commentsCount}
        </Text>
      </TouchableOpacity>

      {/* SHARE */}
      <TouchableOpacity
        className="flex-row items-center gap-2 px-2 py-2"
        onPress={onShare}
      >
        <Ionicons
          name="share-social-outline"
          size={28}
          color="#555"
        />
        <Text className="text-gray-800 text-base">{post.shares}</Text>
      </TouchableOpacity>

      {/* SAVE */}
      <TouchableOpacity
        className="flex-row items-center gap-2 px-2 py-2"
        onPress={onSave}
      >
        <Ionicons
          name={post.isSaved ? "bookmark" : "bookmark-outline"}
          size={28}
          color={post.isSaved ? "#1C388E" : "#555"}
        />
        <Text className="text-gray-800 text-base">
          {post.isSaved ? 1 : 0}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default PostActions;
