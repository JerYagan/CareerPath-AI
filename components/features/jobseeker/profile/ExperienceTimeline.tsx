import React from "react";
import { View, Text } from "react-native";

const ExperienceTimeline = ({ exp }: any) => {
  return (
    <View className="flex-row mb-6">
      {/* Timeline */}
      <View className="items-center mr-4">
        <View className="w-3 h-3 bg-indigo-600 rounded-full mt-1" />
        <View className="w-1 bg-indigo-200 flex-1 mt-1" />
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="font-semibold text-gray-900 text-lg">{exp.title}</Text>
        <Text className="text-gray-600">{exp.company}</Text>
        <Text className="text-gray-400 text-sm">{exp.years}</Text>
        <Text className="text-gray-700 mt-1 leading-6">{exp.description}</Text>
      </View>
    </View>
  );
};

export default ExperienceTimeline;