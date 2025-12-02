import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import type { Application, ApplicationStatus } from "@/app/employer/Applications";
import TagsModal from "@/components/ui/TagsModal";
import TagsPreview from "@/components/ui/TagsPreview";

const brandBlue = "#1C388E";

const badgeStyles: Record<ApplicationStatus, string> = {
  Accepted: "bg-green-100 border-green-300 text-green-700",
  Shortlisted: "bg-blue-100 border-blue-300 text-blue-700",
  "Under Review": "bg-amber-100 border-amber-300 text-amber-700",
  "Not Qualified": "bg-red-100 border-red-300 text-red-700",
  Interview: "bg-purple-100 border-purple-300 text-purple-700",
};

type Props = {
  item: Application;
  onViewProfile: () => void;
};

export default function ApplicationCard({ item, onViewProfile }: Props) {
  const [tagsVisible, setTagsVisible] = useState(false);

  const badgeStyle =
    badgeStyles[item.status] ?? "bg-gray-100 border-gray-300 text-gray-700";

  return (
    <>
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-gray-100">

        {/* HEADER */}
        <View className="flex-row items-center">
          <View className="w-14 h-14 rounded-full bg-brandBlue items-center justify-center shadow">
            <Text className="text-white font-bold text-xl">{item.initials}</Text>
          </View>

          <View className="ml-4 flex-1">
            <Text className="text-2xl font-bold text-gray-900">
              {item.name}
            </Text>

            <View className="flex-row items-center mt-1">
              <Ionicons name="briefcase-outline" size={16} color="#6b7280" />
              <Text className="ml-2 text-gray-700 text-base">{item.role}</Text>
            </View>

            <View className="flex-row items-center mt-1">
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text className="ml-2 text-gray-600 text-base">
                {item.submittedAgo}
              </Text>
            </View>
          </View>
        </View>

        {/* STATUS BADGE (smaller, placed under header) */}
        <View
          className={`self-start mt-3 rounded-full px-3 py-1 border ${badgeStyle}`}
        >
          <Text className="font-semibold text-sm">{item.status}</Text>
        </View>

        {/* APPLICANT INFO */}
        <View className="mt-4">
          <View className="flex-row items-center mt-1">
            <Ionicons name="school-outline" size={18} color="#6b7280" />
            <Text className="ml-2 text-gray-700 text-base">
              {item.education}
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Ionicons name="bar-chart-outline" size={18} color="#6b7280" />
            <Text className="ml-2 text-gray-700 text-base">
              {item.experience} • {item.level}
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Ionicons name="location-outline" size={18} color="#6b7280" />
            <Text className="ml-2 text-gray-700 text-base">
              {item.city}, {item.province}
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Ionicons name="call-outline" size={18} color="#6b7280" />
            <Text className="ml-2 text-gray-700 text-base">{item.phone}</Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Ionicons name="mail-outline" size={18} color="#6b7280" />
            <Text className="ml-2 text-gray-700 text-base">{item.email}</Text>
          </View>
        </View>

        {/* BIO */}
        <View className="mt-4">
          <Text className="text-gray-600 text-base leading-relaxed">
            {item.bio}
          </Text>
        </View>

        {/* TAGS */}
        <View className="mt-5">
          <Pressable onPress={() => setTagsVisible(true)}>
            <TagsPreview
              skills={item.skills}
              showAll={false}
              onPress={() => setTagsVisible(true)}
            />
          </Pressable>
        </View>

        {/* MATCH SCORE (Optional but looks pro) */}
        <View className="mt-4 flex-row items-center">
          <Ionicons name="sparkles-outline" size={20} color={brandBlue} />
          <Text className="ml-2 text-gray-900 font-semibold text-base">
            Match Score: {item.match}%
          </Text>
        </View>

        {/* ACTION BUTTONS */}
        <View className="flex-row gap-3 mt-6">
          <CustomButton
            title="View Profile"
            icon="person-outline"
            className="flex-1 bg-gray-100 rounded-xl py-3 gap-2"
            textClassName="text-gray-900 text-base"
            iconColor="#4b5563"
            onPress={onViewProfile}
          />

          <CustomButton
            title="Message"
            icon="chatbubble-ellipses-outline"
            className="flex-1 bg-brandBlue rounded-xl py-3 gap-2"
            textClassName="text-white text-base"
            iconColor="white"
          />
        </View>
      </View>

      {/* TAGS MODAL */}
      <TagsModal
        visible={tagsVisible}
        onClose={() => setTagsVisible(false)}
        skills={item.skills}
      />
    </>
  );
}