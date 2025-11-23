import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";

type JobStatus = "Active" | "Closed" | "Draft";

type Job = {
  id: string;
  title: string;
  location: string;
  applicants: string[];
  views: number;
  status: JobStatus | string;
  postedAgo: string;
  jobType: string;
  salaryRange: string;
};

type JobCardProps = {
  job: Job;
  onViewDetails: () => void;
  onEdit: () => void;
};

const getStatusStyles = (status: JobStatus) => {
  switch (status) {
    case "Active":
      return { bgClass: "bg-green-100", textClass: "text-green-700" };
    case "Closed":
      return { bgClass: "bg-red-100", textClass: "text-red-700" };
    case "Draft":
      return { bgClass: "bg-yellow-100", textClass: "text-yellow-700" };
    default:
      return { bgClass: "bg-gray-100", textClass: "text-gray-700" };
  }
};

const JobCard = ({ job, onViewDetails, onEdit }: JobCardProps) => {
  const router = useRouter();
  const { bgClass, textClass } = getStatusStyles(job.status as JobStatus);

  return (
    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">

        <View>
          <Text className="text-lg font-semibold text-gray-900">
            {job.title}
          </Text>
          <Text className="text-gray-500">{job.location}</Text>
        </View>

        <Text className="text-gray-400 text-sm w-1/3 text-right">
          Posted {job.postedAgo}
        </Text>

      </View>

      {/* Status + Views + Applicants */}
      <View className="flex-row items-center my-2">
        <View className={`px-2 py-[2px] rounded-full ${bgClass}`}>
          <Text className={`font-medium ${textClass}`}>{job.status}</Text>
        </View>

        {/* Metrics */}
        <View className="flex-row items-center ml-3 gap-3">
          {/* Views */}
          <View className="flex-row items-center">
            <Ionicons name="eye-outline" size={14} color="#6b7280" />
            <Text className="text-gray-500 ml-1">{job.views}</Text>
          </View>

          {/* Applicants */}
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={14} color="#6b7280" />
            <Text className="text-gray-500 ml-1">{job.applicants.length}</Text>
          </View>
        </View>
      </View>

      {/* Job Type + Salary */}
      <View className="my-2">
        <Text className="text-gray-700">{job.jobType}</Text>
        <Text className="text-gray-900 font-semibold">{job.salaryRange}</Text>
      </View>

      {/* Footer */}
      <View className="flex-row justify-between items-center gap-2 mt-4">
        <CustomButton
          title="View Details"
          icon="eye-outline"
          className="bg-gray-100 rounded-xl flex-1"
          textClassName="text-gray-800"
          iconColor="#1f2937"
          onPress={onViewDetails}
        />

        <CustomButton
          title="Edit"
          icon="create-outline"
          className="bg-blue-600 rounded-xl w-1/3"
          textClassName="text-white"
          iconColor="#fff"
          onPress={onEdit}
        />
      </View>
    </View>
  );
};

export default JobCard;