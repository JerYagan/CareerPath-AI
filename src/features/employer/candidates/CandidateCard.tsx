// components/features/employer/candidates/CandidateCard.tsx
import React from "react";
import { View, Text } from "react-native";
import CustomButton from "@/src/components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";

const brandBlue = "#1C388E";

type CandidateCardProps = {
  candidate: any;
  onViewProfile: () => void;
};

export default function CandidateCard({ candidate, onViewProfile }: CandidateCardProps) {
  const visibleSkills = candidate.skills.slice(0, 3);
  const extra = candidate.skills.length - visibleSkills.length;

  return (
    <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">

      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-14 h-14 rounded-full bg-brandBlue items-center justify-center">
            <Text className="text-white font-bold text-lg">
              {candidate.initials}
            </Text>
          </View>

          <View className="ml-4">
            <Text className="text-lg font-semibold text-gray-900">{candidate.name}</Text>
            <Text className="text-gray-500 text-sm">{candidate.role}</Text>
            <Text className="text-gray-400 text-xs">
              {candidate.experience} yrs exp • {candidate.education}
            </Text>
          </View>
        </View>

        <Text className="text-sm text-gray-400">{candidate.status}</Text>
      </View>

      {/* Location */}
      <View className="flex-row items-center mt-3">
        <Ionicons name="location-outline" size={16} color="#6b7280" />
        <Text className="ml-1 text-gray-600">{candidate.province}, {candidate.city}</Text>
      </View>

      {/* Skills */}
      <View className="flex-row flex-wrap gap-2 mt-3">
        {visibleSkills.map((skill: string) => (
          <View key={skill} className="px-3 py-1 bg-gray-100 rounded-lg flex-row items-center">
            <Ionicons name="pricetag-outline" size={14} color="#6b7280" />
            <Text className="ml-1 text-gray-700 font-medium text-xs">{skill}</Text>
          </View>
        ))}
        {extra > 0 && (
          <View className="px-3 py-1 bg-gray-100 rounded-full">
            <Text className="text-gray-600 font-medium text-xs">+{extra} more</Text>
          </View>
        )}
      </View>

      {/* Match Score */}
      <View className="mt-4">
        <Text className="text-gray-700 font-semibold mb-1">Match Score</Text>
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full"
            style={{ width: `${candidate.match}%`, backgroundColor: brandBlue }}
          />
        </View>
      </View>

      {/* Actions */}
      <View className="flex-row gap-3 mt-5">
        <CustomButton
          title="View Profile"
          icon="person-outline"
          className="flex-1 bg-gray-100 rounded-xl py-3 gap-2"
          textClassName="text-gray-800"
          iconColor="#4b5563"
          onPress={onViewProfile}
        />

        <CustomButton
          title="Message"
          icon="chatbubble-outline"
          className="flex-1 bg-brandBlue rounded-xl py-3 gap-2"
          textClassName="text-white"
          iconColor="white"
        />
      </View>

    </View>
  );
}