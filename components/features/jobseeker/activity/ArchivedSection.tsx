import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SkeletonCard from "@/components/ui/SkeletonCard";
import CustomButton from "@/components/ui/CustomButton";

export default function ArchivedSection({
  archivedJobs,
  statusColors,
}: {
  archivedJobs: any[];
  statusColors: Record<string, string>;
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const t = setTimeout(() => {
    setLoading(false);
  }, 700);

  return () => clearTimeout(t); // ✅ cleanup function
}, []);

  if (loading) return <><SkeletonCard /><SkeletonCard /></>;

  return (
    <View className="mt-2">
      <Text className="text-gray-600 mb-4 font-semibold">
        {archivedJobs.length} archived{" "}
        {archivedJobs.length === 1 ? "item" : "items"}
      </Text>

      {archivedJobs.map((job) => (
        <View
          key={job.id}
          className="mb-4 p-6 bg-white border border-gray-300 rounded-lg"
        >
          <View className="flex-row items-start gap-2 mb-4">
            <Image
              source={{ uri: job.logo || "https://via.placeholder.com/50" }}
              className="w-12 h-12 bg-gray-200 rounded-lg"
            />
            <View>
              <Text className="text-xl font-bold">{job.title}</Text>
              <Text className="text-gray-600">{job.company}</Text>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-2 items-center justify-start mb-4">
            {job.statusTags?.map((tag: string, i: number) => (
              <Text
                key={i}
                className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  statusColors[tag] || "bg-gray-200 text-gray-600"
                }`}
              >
                {tag}
              </Text>
            ))}
          </View>

          <View className="space-y-2">
            <View className="flex-row items-center gap-2">
              <Ionicons name="briefcase-outline" size={18} />
              <Text className="text-gray-600">{job.type}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Ionicons name="time-outline" size={18} />
              <Text className="text-gray-600">
                Archived {job.archivedDuration} ago
              </Text>
            </View>
          </View>

          <View className="mt-6">
            <CustomButton
              title="Restore"
              icon="refresh-outline"
              className="border border-gray-400 gap-2"
              textClassName="text-gray-700"
              onPress={() => console.log("Restore", job.title)}
            />
          </View>
        </View>
      ))}
    </View>
  );
}