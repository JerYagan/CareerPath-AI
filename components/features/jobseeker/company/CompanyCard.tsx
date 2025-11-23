import React from "react";
import { View, Text } from "react-native";
import CustomButton from "@/components/ui/CustomButton";

interface CompanyCardProps {
  item: Company;
}

const CompanyCard = ({ item }: CompanyCardProps) => {
  return (
    <View className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-gray-100">

      {/* Header */}
      <View className="flex-row items-center gap-4 mb-4">
        <View className="w-12 h-12 bg-gray-200 rounded-xl" />
        <View className="flex-1">
          <Text className="font-semibold text-lg">{item.name}</Text>
          <Text className="text-gray-600 text-sm mt-1">
            ⭐ {item.rating} ({item.reviews} reviews)
          </Text>
        </View>
      </View>

      {/* Info */}
      <View className="gap-1 mb-3">
        <Text className="text-sm bg-blue-100 px-2 py-1 text-blue-800 rounded-md self-start">
          {item.industry}
        </Text>

        <Text className="text-sm text-gray-700">{item.location}</Text>
        <Text className="text-sm text-gray-700">{item.employees}</Text>
        <Text className="text-sm text-gray-700">
          {item.openPositions} open positions
        </Text>
      </View>

      {/* Description */}
      <Text className="text-gray-700 text-base leading-5 mb-4">
        {item.description}
      </Text>

      {/* Tags */}
      <View className="flex-row flex-wrap gap-2 mb-4">
        {item.tags.map((tag) => (
          <Text
            key={tag}
            className="text-sm bg-gray-200 px-3 py-1 rounded-md"
          >
            {tag}
          </Text>
        ))}
      </View>

      {/* Buttons */}
      <View className="flex-row gap-3">

        <CustomButton
          title="View Jobs"
          className="flex-1 bg-indigo-600"
          textClassName="text-white text-base"
          onPress={() => console.log("View jobs for", item.name)}
        />

        <CustomButton
          title="Company Page"
          className="flex-1 bg-gray-200"
          textClassName="text-gray-800 text-base"
          onPress={() => console.log("Open company page:", item.name)}
        />

      </View>
    </View>
  );
};

export default CompanyCard;