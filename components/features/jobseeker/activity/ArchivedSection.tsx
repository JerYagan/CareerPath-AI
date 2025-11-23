import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";

const ArchivedSection = ({
  archivedJobs,
  statusColors,
}: {
  archivedJobs: any[];
  statusColors: Record<string, string>;
}) => (
  <View className="mt-2">
    <Text className="text-gray-600 mb-4 font-semibold">
      {archivedJobs.length} archived{" "}
      {archivedJobs.length === 1 ? "item" : "items"}
    </Text>

    {archivedJobs.map((job) => (
      <View
        key={job.id}
        className="mb-4 p-6 border border-gray-300 rounded-lg bg-white"
      >
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-row items-center gap-2">
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              className="w-12 h-12 bg-gray-200 rounded-md"
            />
            <View>
              <Text className="text-lg font-bold">{job.title}</Text>
              <Text className="text-gray-600">{job.company}</Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-2 mb-4">
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

        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="briefcase-outline" size={18} />
          <Text className="text-gray-500">{job.type}</Text>
        </View>

        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="time-outline" size={18} />
          <Text className="text-gray-500">
            Archived {job.archivedDuration} ago
          </Text>
        </View>

        <View className="mt-4">
          <CustomButton
            title="Restore"
            icon="refresh-outline"
            className="bg-white border border-gray-400 w-full gap-2"
            onPress={() => console.log("Restore", job.title)}
          />
        </View>
      </View>
    ))}
  </View>
);

export default ArchivedSection;