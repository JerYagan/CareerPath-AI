import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SkeletonCard from "@/src/components/ui/SkeletonCard";
import CustomButton from "@/src/components/ui/CustomButton";
import type { Job } from "@/src/types/job";

export default function AppliedSection({
  appliedJobs,
  statusColors,
  onViewApplication,
}: {
  appliedJobs: Job[];
  statusColors: Record<string, string>;
  onViewApplication: (job: Job) => void;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);
  }, []);

  if (loading) return <><SkeletonCard /><SkeletonCard /></>;

  return (
    <>
      {appliedJobs.map((job) => (
        <View
          key={job.id}
          className="mb-4 p-6 bg-white border border-gray-300 rounded-lg"
        >
          {/* Header */}
          <View className="flex-row items-start gap-2">
            <Image
              source={{ uri: job.logo || "https://via.placeholder.com/50" }}
              className="w-12 h-12 bg-gray-200 rounded-lg"
            />
            <View className="flex-1">
              <Text className="text-xl font-bold">{job.title}</Text>
              <Text className="text-gray-600">{job.company}</Text>
            </View>
          </View>

          {/* Info */}
          <View className="mt-2 flex-wrap">
            {job.status && (
              <Text
                className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  statusColors[job.status] || "bg-gray-200 text-gray-700"
                }`}
              >
                {job.status}
              </Text>
            )}
          </View>
          <View className="mt-6 space-y-2">
            <View className="flex-row items-center gap-2">
              <Ionicons name="location-outline" size={18} />
              <Text className="text-gray-600">{job.location}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Ionicons name="cash-outline" size={18} />
              <Text className="text-gray-600">{job.salary}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Ionicons name="briefcase-outline" size={18} />
              <Text className="text-gray-600">{job.type}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Ionicons name="time-outline" size={18} />
              <Text className="text-gray-600">{job.posted}</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="mt-4 text-gray-600">{job.description}</Text>

          {/* Buttons */}
          <View className="flex-row gap-3 mt-6">
            <CustomButton
              title="View"
              icon="eye-outline"
              iconColor="white"
              className="bg-brandBlue flex-1 gap-2 w-2/3"
              textClassName="text-white font-semibold"
              onPress={() => onViewApplication(job)}
            />
            <CustomButton
              title="Withdraw"
              icon="return-up-back-outline"
              className="border border-gray-300 flex-1 gap-2 w-1/3"
              textClassName="text-gray-700"
            />
          </View>
        </View>
      ))}
    </>
  );
}