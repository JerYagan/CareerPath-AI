import React, { useState, useEffect } from "react";
import { View, Text, Image, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SkeletonCard from "@/src/components/ui/SkeletonCard";
import CustomButton from "@/src/components/ui/CustomButton";
import * as Linking from "expo-linking";
import type { Job } from "@/src/types/job";

const openCalendarApp = () => {
  if (Platform.OS === "ios") Linking.openURL("calshow:");
  else Linking.openURL("content://com.android.calendar/time/");
};

export default function InterviewSection({ interviewJobs }: { interviewJobs: Job[] }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const t = setTimeout(() => {
    setLoading(false);
  }, 700);

  return () => clearTimeout(t); // ✅ cleanup function
}, []);

  if (loading) return <><SkeletonCard /><SkeletonCard /></>;

  return (
    <>
      {interviewJobs.map((job) => (
        <View
          key={job.id}
          className="mb-4 p-6 bg-blue-50 border border-blue-600 rounded-lg"
        >
          {/* Header */}
          <View className="flex-row items-start gap-2">
            <Image
              source={{ uri: job.logo || "https://via.placeholder.com/50" }}
              className="w-12 h-12 bg-gray-200 rounded-lg"
            />
            <View>
              <Text className="text-xl font-bold">{job.title}</Text>
              <Text className="text-gray-600">{job.company}</Text>
            </View>
          </View>

          {/* Details */}
          <View className="mt-6 space-y-2">
            <View className="flex-row items-center gap-2">
              <Ionicons name="calendar-outline" size={18} />
              <Text className="text-gray-700">{job.interviewDetails?.date}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Ionicons name="time-outline" size={18} />
              <Text className="text-gray-700">{job.interviewDetails?.time}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Ionicons name="location-outline" size={18} />
              <Text className="text-gray-700">{job.interviewDetails?.place}</Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="mt-6 gap-3">
            <CustomButton
              title="Join Interview"
              icon="caret-forward-outline"
              iconColor="white"
              className="bg-brandBlue gap-2"
              textClassName="text-white font-semibold"
              onPress={() => {
                const link = job.interviewDetails?.link || job.interviewDetails?.meetingLink;
                if (link) Linking.openURL(link);
              }}
            />

            <View className="flex-row gap-3">
              <CustomButton
                title="Reschedule"
                icon="calendar-outline"
                className="border border-gray-300 flex-1 gap-2"
                textClassName="text-gray-700"
                onPress={openCalendarApp}
              />
              <CustomButton
                title="Add to Calendar"
                icon="add-outline"
                className="border border-gray-300 flex-1 gap-2"
                textClassName="text-gray-700"
                onPress={openCalendarApp}
              />
            </View>
          </View>
        </View>
      ))}
    </>
  );
}