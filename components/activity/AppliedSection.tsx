import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";

const AppliedSection = ({ appliedJobs, statusColors }: { appliedJobs: any[], statusColors: Record<string, string> }) => (
  <>
    {appliedJobs.map((job) => (
      <View
        key={job.id}
        className="mb-4 p-6 border border-gray-300 rounded-lg bg-white"
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-2">
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              className="w-12 h-12 bg-gray-200 rounded-md"
            />
            <View>
              <Text className="text-xl font-bold mb-1">{job.title}</Text>
              <Text className="text-gray-600">{job.company}</Text>
            </View>
          </View>
        </View>

        {job.status && (
          <View className="flex-row mt-4">
            <Text
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                statusColors[job.status] || "bg-gray-200 text-gray-600"
              }`}
            >
              {job.status}
            </Text>
          </View>
        )}

        <View className="mt-8">
          <View className="flex-row items-center gap-4 mb-2">
            <Ionicons name="location-outline" size={18} />
            <Text className="text-gray-500">{job.location}</Text>
          </View>

          <View className="flex-row items-center gap-4 mb-2">
            <Ionicons name="cash-outline" size={18} />
            <Text className="text-gray-500">{job.salary}</Text>
          </View>

          <View className="flex-row items-center gap-4 mb-2">
            <Ionicons name="briefcase-outline" size={18} />
            <Text className="text-gray-500">{job.type}</Text>
          </View>

          <View className="flex-row space-between gap-2 mt-4">
            <CustomButton
              title="View Application"
              icon="eye-outline"
              className="border border-gray-300 w-2/3 flex-1 gap-2"
            />
            <CustomButton
              title="Withdraw"
              icon="return-up-back-outline"
              className="border border-gray-300 w-1/3 gap-2"
            />
          </View>
        </View>
      </View>
    ))}
  </>
);

export default AppliedSection;
