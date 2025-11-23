import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import candidatesData from "@/assets/data/employerData/candidates.json";

type Candidate = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  experience: string;
  location: string;
  email: string;
  status: string;
};

const CandidateProfile = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const candidates: Candidate[] = candidatesData.candidates;
  const candidate = candidates.find((c) => c.id === id);

  if (!candidate) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-600">Candidate not found.</Text>
      </View>
    );
  }

  const statusStyles = getStatusColors(candidate.status);

  return (
    <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center mb-4"
      >
        <Ionicons name="arrow-back" size={24} color="#2563eb" />
        <Text className="ml-1 text-blue-600">Back</Text>
      </TouchableOpacity>

      {/* Name */}
      <Text className="text-2xl font-bold text-gray-900">{candidate.name}</Text>
      <Text className="text-gray-500">{candidate.role}</Text>
      <Text className="text-gray-400 mt-1">{candidate.experience} experience</Text>

      {/* Status */}
      <View
        className={`self-start mt-3 px-3 py-1 rounded-full ${statusStyles.bgClass}`}
      >
        <Text className={`font-medium ${statusStyles.textClass}`}>
          {candidate.status}
        </Text>
      </View>

      {/* LOCATION */}
      <Text className="text-gray-700 mt-4">
        <Ionicons name="location-outline" size={16} color="#6b7280" />{" "}
        {candidate.location}
      </Text>

      {/* EMAIL */}
      <Text className="text-gray-700 mt-1">
        <Ionicons name="mail-outline" size={16} color="#6b7280" />{" "}
        {candidate.email}
      </Text>

      {/* Skills */}
      <Text className="text-lg font-semibold text-gray-900 mt-6 mb-2">
        Skills
      </Text>

      <View className="flex-row flex-wrap">
        {candidate.skills.map((skill) => (
          <View
            key={skill}
            className="px-3 py-1 bg-gray-100 rounded-full mr-2 mb-2"
          >
            <Text className="text-gray-700">{skill}</Text>
          </View>
        ))}
      </View>

      {/* About Section */}
      <View className="mt-6 bg-white p-4 rounded-2xl shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-2">About</Text>
        <Text className="text-gray-700 leading-5">
          This candidate has not added a full biography yet. You can still view
          their skills, experience, and contact details above.
        </Text>
      </View>

      {/* ACTIONS */}
      <View className="flex-row mt-6 mb-12">
        <TouchableOpacity className="flex-1 bg-gray-200 py-3 rounded-xl mr-2">
          <Text className="text-center text-gray-800 font-semibold">
            Save Candidate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-blue-600 py-3 rounded-xl">
          <Text className="text-center text-white font-semibold">
            Contact
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CandidateProfile;

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