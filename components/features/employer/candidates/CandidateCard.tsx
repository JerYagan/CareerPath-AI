import React from "react";
import { View, Text, Image } from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";

type Candidate = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  experience: string;
  location: string;
  email: string;
  status: string;
  pfp?: string; // optional profile picture URL
};

const CandidateCard = ({ item }: { item: Candidate }) => {
  const statusStyles = getStatusColors(item.status);

  return (
    <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      {/* HEADER: Avatar + Name */}
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.pfp || "https://i.pravatar.cc/150?img=12" }}
          className="w-14 h-14 rounded-full mr-4"
        />

        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
          <Text className="text-gray-500">{item.email}</Text>
        </View>

        {/* Status */}
        <View className={`self-start mt-2 px-3 py-1 rounded-full ${statusStyles.bgClass}`}>
            <Text className={`font-medium text-sm ${statusStyles.textClass}`}>
            {item.status}
            </Text>
        </View>
      </View>

      {/* Role + Experience */}
      <View className="mt-3">
        <Text className="font-medium text-gray-800">{item.role}</Text>
        <Text className="text-gray-500">{item.experience} experience</Text>
        <Text className="text-gray-500">{item.location}</Text>
      </View>

      {/* Skills */}
      <View className="flex-row flex-wrap mt-3">
        {item.skills.map((skill) => (
          <View
            key={skill}
            className="px-3 py-1 bg-gray-100 rounded-lg mr-2 mb-2"
          >
            <Text className="text-gray-700 font-bold text-sm">{skill}</Text>
          </View>
        ))}
      </View>

      {/* BUTTONS */}
      <View className="mt-2 gap-2">
        <CustomButton
          title="View Profile"
          icon="person-circle-outline"
          className="bg-gray-200 rounded-xl px-4"
          textClassName="text-gray-800"
          iconColor="#333"
          onPress={() => router.push(`/employer/Candidates/${item.id}`)}
        />

        <View className="flex-row items-center justify-between gap-2">
          <CustomButton
            title="Save"
            icon="bookmark-outline"
            className="bg-gray-100 rounded-xl px-4 flex-1 w-1/2"
            textClassName="text-gray-800"
            iconColor="#333"
          />

          <CustomButton
            title="Contact"
            icon="chatbubble-ellipses-outline"
            className="bg-blue-600 rounded-xl px-4 flex-1 w-1/2"
            textClassName="text-white"
            iconColor="#fff"
            onPress={() => router.push(`/employer/Candidates/${item.id}`)}
          />
        </View>

      </View>
    </View>
  );
};

export default CandidateCard;

const getStatusColors = (status: string) => {
  switch (status) {
    case "Available":
      return { bgClass: "bg-green-100", textClass: "text-green-700" };
    case "Open to Work":
      return { bgClass: "bg-blue-100", textClass: "text-blue-700" };
    case "Not Available":
      return { bgClass: "bg-red-100", textClass: "text-red-700" };
    default:
      return { bgClass: "bg-gray-100", textClass: "text-gray-700" };
  }
};