import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";
import { Job } from "@/types/jobs";

type JobCardProps = {
  job: Job;
  onViewDetails: () => void;
  onEdit: () => void;
};

const JobCard = ({ job, onViewDetails, onEdit }: JobCardProps) => {
  const STATUS_COLORS: Record<Job["status"], { bg: string; text: string }> = {
    Active: { bg: "#ECFDF5", text: "#047857" },
    Closed: { bg: "#FEF2F2", text: "#B91C1C" },
    Draft: { bg: "#FEF9C3", text: "#A16207" },
  };

  const { bg, text } = STATUS_COLORS[job.status];

  const visibleTags = job.tags.slice(0, 3);
  const extraTags = job.tags.length - visibleTags.length;

  return (
    <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      {/* TITLE + META */}
      <View className="flex-row items-start justify-between mb-1">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-bold text-gray-900">{job.title}</Text>
          <Text className="text-gray-500">
            {job.location} • {job.workSetup}
          </Text>
          <Text className="text-gray-500 text-sm mt-1">
            {job.department} • {job.experienceLevel}
          </Text>
        </View>
        <Text className="text-gray-400 text-sm text-right">
          Posted {job.postedAgo}
        </Text>
      </View>

      {/* STATUS + STATS */}
      <View className="flex-row items-center mt-3">
        <View
          style={{ backgroundColor: bg }}
          className="px-2 py-1 rounded-lg"
        >
          <Text style={{ color: text }} className="font-medium text-sm">
            {job.status}
          </Text>
        </View>

        <View className="flex-row items-center gap-4 ml-4">
          <View className="flex-row items-center">
            <Ionicons name="eye-outline" size={18} color="#6b7280" />
            <Text className="ml-1 text-gray-600 text-sm">{job.views}</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={18} color="#6b7280" />
            <Text className="ml-1 text-gray-600 text-sm">
              {job.applicants.length}
            </Text>
          </View>
        </View>
      </View>

      {/* SALARY + TAGS */}
      <View className="mt-3">
        <Text className="text-gray-700 text-sm">{job.jobType}</Text>
        <Text className="text-gray-900 font-semibold text-lg">
          {job.salaryRange}
        </Text>
      </View>

      <View className="flex-row flex-wrap mt-3 gap-2">
        {visibleTags.map((tag) => (
          <View
            key={tag}
            className="px-2 py-1 rounded-lg bg-gray-100 flex-row items-center"
          >
            <Ionicons name="pricetag-outline" size={14} color="#6b7280" />
            <Text className="ml-1 text-gray-700 text-sm font-semibold">{tag}</Text>
          </View>
        ))}
        {extraTags > 0 && (
          <View className="px-2 py-1 rounded-lg bg-gray-100">
            <Text className="text-gray-600 text-sm font-semibold">+{extraTags} more</Text>
          </View>
        )}
      </View>

      {/* ACTION BUTTONS */}
      <View className="flex-row gap-3 mt-5">
        <CustomButton
          title="View details"
          icon="eye-outline"
          className="flex-1 bg-gray-100 rounded-xl gap-2"
          textClassName="text-gray-800"
          iconColor="#4b5563"
          iconSize={18}
          onPress={onViewDetails}
        />

        <CustomButton
          title="Edit"
          icon="create-outline"
          className="w-1/3 rounded-xl bg-brandBlue gap-2"
          textClassName="text-white"
          iconColor="white"
          iconSize={18}
          onPress={onEdit}
        />
      </View>
    </View>
  );
};

export default JobCard;