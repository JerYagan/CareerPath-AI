import React from "react";
import { View, Text } from "react-native";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";

const PostCard = ({
  post,
  onOptions,
  onLike,
  onComment,
  onShare,
  onSave,
}: any) => {
  return (
    <View className="bg-white p-5 rounded-xl mb-6 border border-gray-200">
      
      <PostHeader post={post} onOptions={onOptions} />

      <Text className="text-gray-800 mt-4 mb-3 text-base">
        {post.text}
      </Text>

      {!!post.tags.length && (
        <View className="flex-row flex-wrap gap-2 mb-3">
          {post.tags.map((tag: string, i: number) => (
            <Text key={i} className="text-blue-600 text-base">
              #{tag}
            </Text>
          ))}
        </View>
      )}

      <PostActions
        post={post}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onSave={onSave}
      />
    </View>
  );
};

export default PostCard;
