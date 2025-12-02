import React, { useState } from "react";
import { View, Text } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import SkillsPreview from "@/components/ui/TagsPreview";
import SkillsModal from "@/components/ui/TagsModal";

interface CompanyCardProps {
  item: Company;
}

const CompanyCard = ({ item }: CompanyCardProps) => {
  const [isTagsOpen, setIsTagsOpen] = useState(false);

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
        <Text className="text-sm font-semibold bg-blue-100 px-2 py-1 text-blue-800 rounded-md self-start mb-2">
          {item.industry}
        </Text>

        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="location-outline" size={18} />
          <Text className="text-gray-600">{item.location}</Text>
        </View>
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="people-outline" size={18} />
          <Text className="text-gray-600">{item.employees}</Text>
        </View>
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="briefcase-outline" size={18} />
          <Text className="text-gray-600">{item.openPositions} Open Positions</Text>
        </View>
      </View>

      {/* Description */}
      <Text className="text-gray-700 text-base leading-5 mb-4">
        {item.description}
      </Text>

      {/* Tags */}
      <SkillsPreview
        skills={item.tags}
        onPress={() => setIsTagsOpen(true)}
      />

      <SkillsModal
        visible={isTagsOpen}
        onClose={() => setIsTagsOpen(false)}
        skills={item.tags}
      />

      {/* Buttons */}
      <View className="flex-row gap-3 mt-4">

        <CustomButton
          title="View Jobs"
          icon="eye-outline"
          iconColor="white"
          className="flex-1 bg-brandBlue gap-2"
          textClassName="text-white text-base"
          onPress={() => console.log("View jobs for", item.name)}
        />

        <CustomButton
          title="Website"
          icon="globe-outline"
          className="flex-1 bg-gray-200 gap-2"
          textClassName="text-gray-800 text-base"
          onPress={() => console.log("Open company page:", item.name)}
        />

      </View>
    </View>
  );
};

export default CompanyCard;