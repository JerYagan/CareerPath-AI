import React from "react";
import { View, Text } from "react-native";

const StatsRow = () => {
  return (
    <View className="flex-col gap-3 mb-6">

      <View className="flex-row gap-3">
        <View className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <Text className="text-indigo-600 text-2xl font-bold">4</Text>
          <Text className="text-gray-700 text-base mt-1">Companies</Text>
        </View>

        <View className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <Text className="text-green-600 text-2xl font-bold">48</Text>
          <Text className="text-gray-700 text-base mt-1">Open Positions</Text>
        </View>
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <Text className="text-purple-600 text-2xl font-bold">12</Text>
          <Text className="text-gray-700 text-base mt-1">Industries</Text>
        </View>

        <View className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <Text className="text-orange-500 text-2xl font-bold">4.4</Text>
          <Text className="text-gray-700 text-base mt-1">Avg Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default StatsRow;