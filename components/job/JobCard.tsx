import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../CustomButton";

type Job = {
  id: string | number;
  title: string;
  company: string;
  match: string | number;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  skills: string[];
};

type ButtonProps = {
  title?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  className?: string;
  textClassName?: string;
  onPress?: () => void;
};

type Props = {
  job: Job;
  buttons?: ButtonProps[];
  showMatch?: boolean; // whether to show match/status box
  statusText?: string; // custom text for status (e.g., "Under Review")
};

const JobCard: React.FC<Props> = ({ job, buttons, showMatch = true, statusText }) => {
  return (
    <View className="mb-4 p-6 border border-gray-300 bg-white rounded-lg">
      <View className="flex-row justify-between items-center">
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

        {/* Match / Status Section */}
        {showMatch && (
          <View className="items-end">
            <Text className="mb-1">Match</Text>
            <Text
              className={`text-sm font-semibold py-1 px-2 rounded-md text-center ${
                statusText
                  ? "bg-yellow-600 text-white"
                  : "bg-indigo-700 text-white"
              }`}
            >
              {statusText || `${job.match}`}
            </Text>
          </View>
        )}
      </View>

      <View className="mt-8">
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="location-outline" size={18} />
          <Text className="text-gray-600 ml-1">{job.location}</Text>
        </View>
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="cash-outline" size={18} />
          <Text className="text-gray-600 ml-1">{job.salary}</Text>
        </View>
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="briefcase-outline" size={18} />
          <Text className="text-gray-600 ml-1">{job.type}</Text>
        </View>
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="time-outline" size={18} />
          <Text className="text-gray-600 ml-1">{job.posted}</Text>
        </View>
      </View>

      <Text className="mt-4 text-gray-600">{job.description}</Text>

      <View className="mt-4 flex-row gap-2">
        {job.skills.map((skill, i) => (
          <Text
            key={i}
            className="py-1 px-2 bg-gray-200 text-gray-600 font-bold rounded-lg text-sm"
          >
            {skill}
          </Text>
        ))}
      </View>

      {/* Buttons */}
      {buttons && buttons.length > 0 && (
        <View className="mt-4 flex-row gap-2">
          {buttons.map((btn, i) => (
            <CustomButton
              key={i}
              title={btn.title}
              icon={btn.icon}
              className={btn.className}
              textClassName={btn.textClassName}
              onPress={btn.onPress}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default JobCard;