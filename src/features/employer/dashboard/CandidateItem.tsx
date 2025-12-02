import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/src/components/ui/CustomButton";

const brandBlue = "#1C388E";

type CandidateItemProps = {
  initials: string;
  name: string;
  role: string;
  savedAgo: string;
  experience: string;
  strengths: string[];
  skills: string[];
  match: number; // 0–100
};

const CandidateItem = ({
  initials,
  name,
  role,
  savedAgo,
  experience,
  strengths,
  skills,
  match,
}: CandidateItemProps) => {
  return (
    <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm">

      {/* Header Section */}
      <View className="flex-row items-center justify-between mb-4">

        {/* Avatar */}
        <View
          className="w-14 h-14 rounded-full justify-center items-center"
          style={{ backgroundColor: brandBlue }}
        >
          <Text className="text-white font-bold text-lg">{initials}</Text>
        </View>

        {/* Basic Info */}
        <View className="flex-1 ml-4">
          <Text className="font-semibold text-gray-900 text-lg">{name}</Text>

          <View
            className="self-start px-2 py-1 rounded-lg mt-1"
            style={{ backgroundColor: "#E6ECFF" }}
          >
            <Text style={{ color: brandBlue }} className="text-sm font-medium">
              {role}
            </Text>
          </View>
        </View>

        <Text className="text-gray-400 text-sm">{savedAgo}</Text>
      </View>

      {/* Experience */}
      <Text className="text-gray-700 font-semibold mb-1">Experience</Text>
      <Text className="text-gray-500 mb-4">{experience}</Text>

      {/* Strengths */}
      <Text className="text-gray-700 font-semibold mb-1">Top Strengths</Text>
      <View className="mb-4">
        {strengths.map((s, i) => (
          <View key={i} className="flex-row items-center mb-1">
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color={brandBlue}
            />
            <Text className="ml-2 text-gray-600">{s}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <Text className="text-gray-700 font-semibold mb-1">Skills</Text>
      <View className="flex-row flex-wrap mb-4">
        {skills.map((skill) => (
          <View
            key={skill}
            className="py-1 px-2 rounded-lg mr-2 mb-2 bg-gray-200"
          >
            <Text className="font-semibold text-sm text-gray-600">
              {skill}
            </Text>
          </View>
        ))}
      </View>

      {/* Match Score */}
      {/* <Text className="text-gray-700 font-semibold mb-2">Match Score</Text>

      <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-4">
        <View
          className="h-full"
          style={{
            width: `${match}%`,
            backgroundColor: brandBlue,
          }}
        />
      </View> */}

      {/* Action Buttons */}
      <View className="flex-row justify-between items-center gap-3">
        <CustomButton
          title="View Profile"
          className="flex-1 bg-[#1C388E] rounded-xl gap-2"
          textClassName="text-white font-semibold"
          icon="person-circle-outline"
          iconColor="white"
          iconSize={18}
        />

        <CustomButton
          title="Contact"
          className="flex-1 border border-gray-300 rounded-xl gap-2"
          textClassName="text-gray-700 font-semibold"
          icon="chatbubble-ellipses-outline"
          iconSize={18}
        />
      </View>
    </View>
  );
};

export default CandidateItem;