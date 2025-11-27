import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../ui/CustomButton";
import SkillsPreview from "./SkillsPreview";
import SkillsModal from "./SkillsModal";
import { Job } from "@/types/job";

type ButtonProps = {
  title?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  className?: string;
  textClassName?: string;
  onPress?: () => void;
};

type Props = {
  job: Job;
  buttons?: ButtonProps[];
  showMatch?: boolean;     // show the match/status section?
  statusText?: string;     // optional custom status
};

const JobCard: React.FC<Props> = ({ job, buttons, showMatch = true, statusText }) => {
  const [skillsVisible, setSkillsVisible] = useState(false);


  return (
    <View className="mb-4 p-6 border border-gray-300 bg-white rounded-lg">
      
      {/* HEADER ROW */}
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

        {/* MATCH / STATUS */}
        {showMatch && (
          <View className="items-end">
            <Text className="mb-1">Match</Text>
            <Text
              className={`text-sm font-semibold py-1 px-2 rounded-md text-center ${
                statusText
                  ? "bg-yellow-600 text-white"
                  : "bg-brandBlue text-white"
              }`}
            >
              {statusText || `${job.match}`}
            </Text>
          </View>
        )}
      </View>

      {/* JOB DETAILS */}
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

      {/* DESCRIPTION */}
      <Text className="mt-4 text-gray-600">{job.description}</Text>

      <SkillsPreview
        skills={job.skills}
        onPress={() => setSkillsVisible(true)}
      />

      <SkillsModal
        visible={skillsVisible}
        onClose={() => setSkillsVisible(false)}
        skills={job.skills}
      />

      {/* BUTTONS */}
      {buttons && buttons.length > 0 && (
        <View className="mt-4 flex-row gap-2">
          {buttons.map((btn, i) => (
            <CustomButton
              key={i}
              title={btn.title}
              icon={btn.icon}
              iconColor={btn.iconColor}
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