import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type MetricCardProps = {
  label: string;
  value: string;
  icon: string;
  trend: string;
};

const MetricCard = ({ label, value, icon, trend }: MetricCardProps) => {
  return (
    <View className="w-[48%] bg-white rounded-xl p-4 mb-2 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-500">{label}</Text>
        <Ionicons name={icon as any} size={22} color="#1C388E" />
      </View>

      <Text className="text-2xl font-bold text-gray-900">{value}</Text>
      <Text className="text-green-600 text-sm mt-1">{trend}</Text>
    </View>
  );
};

export default MetricCard;