import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";

type Props = {
  job: any;
  isAvailable: boolean;
  onApply?: () => void;
};

export default function SavedCard({ job, isAvailable, onApply }: Props) {
  return (
    <View className="mb-4 p-6 bg-white border border-gray-300 rounded-lg">
      {/* Header */}
      <View className="flex-row items-center gap-2">
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
        {isAvailable ? (
          <Text className="px-3 py-1 bg-green-100 text-green-700 rounded-lg w-fit text-sm font-semibold">
            Available
          </Text>
        ) : (
          <Text className="px-3 py-1 bg-red-100 text-red-700 rounded-lg w-fit text-sm font-semibold">
            Not Available
          </Text>
        )}
      </View>

      <View className="mt-6 space-y-2">
        <View className="flex-row items-center gap-2">
          <Ionicons name="location-outline" size={18} />
          <Text className="text-gray-600 ml-1">{job.location}</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="cash-outline" size={18} />
          <Text className="text-gray-600 ml-1">{job.salary}</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="briefcase-outline" size={18} />
          <Text className="text-gray-600 ml-1">{job.type}</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="time-outline" size={18} />
          <Text className="text-gray-600 ml-1">{job.posted}</Text>
        </View>
      </View>

      {/* Description */}
      <Text className="mt-4 text-gray-600">{job.description}</Text>

      {/* Buttons */}
      <View className="flex-row gap-3 mt-6">
        {isAvailable && (
          <CustomButton
            title="Apply Now"
            icon="paper-plane-outline"
            iconColor="white"
            className="bg-brandBlue gap-2 w-2/3"
            textClassName="text-white font-semibold"
            onPress={onApply}
          />
        )}

        <CustomButton
          title="Remove"
          icon="trash-outline"
          className="border border-gray-300 flex-1 gap-2 w-1/2"
          textClassName="text-gray-700"
        />
      </View>
    </View>
  );
}