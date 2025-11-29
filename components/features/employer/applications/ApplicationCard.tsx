// components/features/employer/applications/ApplicationCard.tsx
import React from "react";
import { View, Text } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import type { ApplicationStatus, Application } from "@/app/employer/Applications";

const brandBlue = "#1C388E";

const badgeStyles: Record<ApplicationStatus, string> = {
  Accepted: "bg-green-100 text-green-700",
  Shortlisted: "bg-blue-100 text-blue-700",
  "Under Review": "bg-amber-100 text-amber-700",
  "Not Qualified": "bg-red-100 text-red-700",
  Interview: "bg-purple-100 text-purple-700",
};

type ApplicationCardProps = {
  item: Application;
  onViewProfile: () => void;
};

export default function ApplicationCard({ item, onViewProfile }: ApplicationCardProps) {
  const badge =
    badgeStyles[item.status] ?? "bg-gray-100 text-gray-700";

  return (
    <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      {/* HEADER */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-14 h-14 rounded-full bg-brandBlue items-center justify-center">
            <Text className="text-white font-bold text-lg">
              {item.initials}
            </Text>
          </View>

          <View className="ml-4">
            <Text className="text-lg font-semibold text-gray-900">
              {item.name}
            </Text>
            <Text className="text-gray-500 text-sm">{item.role}</Text>
            <Text className="text-gray-400 text-sm">
              {item.experience} • {item.education}
            </Text>
          </View>
        </View>
      </View>

      {/* LOCATION */}
      <View className="flex-row items-center mt-3">
        <Ionicons name="location-outline" size={16} color="#6b7280" />
        <Text className="ml-1 text-gray-600">
          {item.province}, {item.city}
        </Text>
      </View>

      {/* SKILLS */}
      <View className="flex-row flex-wrap gap-2 mt-3">
        {item.skills.slice(0, 3).map((skill) => (
          <View key={skill} className="px-3 py-1 bg-gray-100 rounded-lg">
            <Text className="text-gray-700 text-sm font-semibold">{skill}</Text>
          </View>
        ))}
      </View>

      {/* STATUS BADGE */}
      <View className={`self-start mt-4 rounded-full px-3 py-1 ${badge}`}>
        <Text className="font-medium text-sm">{item.status}</Text>
      </View>

      {/* ACTIONS */}
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
          icon="chatbubble-ellipses-outline"
          className="flex-1 bg-brandBlue rounded-xl py-3 gap-2"
          textClassName="text-white"
          iconColor="white"
        />
      </View>
    </View>
  );
}