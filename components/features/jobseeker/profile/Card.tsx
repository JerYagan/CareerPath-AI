import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
}) => {
  return (
    <View className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
      <View className="flex-row items-center gap-2 mb-3">
        <Ionicons name={icon} size={20} color="#4B5563" />
        <Text className="text-xl font-semibold text-gray-900">{title}</Text>
      </View>
      {children}
    </View>
  );
};

export default Card;