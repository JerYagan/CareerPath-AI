import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";
import type { Job } from "@/types/job";

type Props = {
  job: Job;
  showMatch?: boolean;
  bookmarked?: boolean;
  onApply?: () => void;
  onBookmark?: () => void;
  children?: React.ReactNode; 
};

export default function HomeCard({
  job,
  showMatch = true,
  bookmarked = false,
  onApply,
  onBookmark,
  children,
}: Props) {
  return (
    <View className="mb-5 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* HEADER ROW */}
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center gap-3">
          <Image
            source={{ uri: job.logo || "https://via.placeholder.com/50" }}
            className="w-12 h-12 rounded-lg bg-gray-200"
          />

          <View className="max-w-[90%]">
            <Text className="text-xl font-bold" numberOfLines={1}>
              {job.title}
            </Text>

            <Text className="text-gray-600" numberOfLines={1}>
              {job.company}
            </Text>
          </View>
        </View>

        {/* MATCH PERCENTAGE */}
        {showMatch && (
          <View className="px-2 py-1rounded-lg items-center">
            <Text className=" font-semibold">Match</Text>
            <Text className="text-white bg-brandBlue font-bold text-sm px-2 py-1 rounded-lg mt-1">
              {job.match}
            </Text>
          </View>
        )}
      </View>

      {/* TAG (Available, Position Filled, Saved, etc.)
      {tag && <View className="mt-3">{tag}</View>} */}

      {/* JOB INFO BLOCK */}
      <View className="mt-5 space-y-2">
        <View className="flex-row items-center gap-2">
          <Ionicons name="location-outline" size={18} color="#555" />
          <Text className="text-gray-700" numberOfLines={1}>
            {job.location}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="cash-outline" size={18} color="#555" />
          <Text className="text-gray-700" numberOfLines={1}>
            {job.salary}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="briefcase-outline" size={18} color="#555" />
          <Text className="text-gray-700" numberOfLines={1}>
            {job.type}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="time-outline" size={18} color="#555" />
          <Text className="text-gray-700" numberOfLines={1}>
            {job.posted}
          </Text>
        </View>
      </View>

      {/* DESCRIPTION + SKILLS injected by Home.tsx */}
      {children}

      {/* FIXED TWO BUTTONS */}
      <View className="flex-row gap-3 mt-6">
        {/* APPLY NOW */}
        <CustomButton
          title="Apply Now"
          icon="paper-plane-outline"
          iconColor="white"
          className="bg-brandBlue flex-1 gap-2"
          textClassName="text-white"
          onPress={onApply}
        />

        {/* BOOKMARK BUTTON */}
        <CustomButton
          icon={bookmarked ? "bookmark" : "bookmark-outline"}
          iconColor={bookmarked ? "#1C388E" : "#555"}
          className="border border-gray-300 px-4 py-4 rounded-lg"
          onPress={onBookmark}
        />
        </View>
    </View>
  );
}