import React from "react";
import { View } from "react-native";

export default function SkeletonCard() {
  return (
    <View className="p-6 mb-4 bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <View className="flex-row justify-between mb-4">
        <View className="flex-row gap-3">
          <View className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
          <View className="space-y-2">
            <View className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
            <View className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
          </View>
        </View>
        <View className="w-12 h-5 bg-gray-200 rounded animate-pulse" />
      </View>

      {/* Info */}
      <View className="space-y-2">
        <View className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
        <View className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
        <View className="w-1/3 h-4 bg-gray-200 rounded animate-pulse" />
      </View>

      {/* Desc */}
      <View className="mt-4 space-y-2">
        <View className="w-full h-3 bg-gray-200 rounded animate-pulse" />
        <View className="w-5/6 h-3 bg-gray-200 rounded animate-pulse" />
      </View>

      {/* Buttons */}
      <View className="flex-row gap-3 mt-6">
        <View className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
        <View className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
      </View>
    </View>
  );
}