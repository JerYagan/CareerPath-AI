import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import profileData from "@/assets/data/employerData/employerProfile.json";

type JobOffer = {
  id: string;
  title: string;
  status: string;
  applicants: number;
};

const Profile = () => {
  const jobOffers: JobOffer[] = profileData.jobOffers;

  return (
    <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
      {/* Company Header */}
      <View className="items-center mb-6">
        <Image
          source={{ uri: profileData.logo }}
          className="w-24 h-24 rounded-full mb-3"
        />

        <Text className="text-2xl font-bold text-gray-900">
          {profileData.companyName}
        </Text>

        <Text className="text-gray-500 mt-1">{profileData.industry}</Text>
      </View>

      {/* Info Block */}
      <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          Company Information
        </Text>

        <InfoRow icon="location-outline" label={profileData.location} />
        <InfoRow icon="mail-outline" label={profileData.email} />
        <InfoRow icon="call-outline" label={profileData.phone} />

        <TouchableOpacity
          onPress={() => Linking.openURL(profileData.website)}
          className="flex-row items-center mt-2"
        >
          <Ionicons name="globe-outline" size={18} color="#2563eb" />
          <Text className="text-blue-600 ml-2">{profileData.website}</Text>
        </TouchableOpacity>
      </View>

      {/* About */}
      <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <Text className="text-lg font-semibold text-gray-900 mb-3">About</Text>

        <Text className="text-gray-700 leading-5">{profileData.description}</Text>
      </View>

      {/* Job Offers */}
      <View className="bg-white rounded-2xl p-5 shadow-sm mb-12">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Job Offers ({jobOffers.length})
        </Text>

        {jobOffers.map((job) => (
          <View
            key={job.id}
            className="flex-row justify-between items-center bg-gray-50 p-4 rounded-xl mb-2"
          >
            <View className="flex-1 mr-3">
              <Text className="font-bold text-gray-900">{job.title}</Text>
              <Text className="text-gray-500">{job.applicants} applicants</Text>
            </View>

            <View className={`px-3 py-1 rounded-full ${getStatusColors(job.status).bg}`}>
              <Text className={`${getStatusColors(job.status).text} font-medium`}>
                {job.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Profile;

const InfoRow = ({ icon, label }: { icon: any; label: string }) => (
  <View className="flex-row items-center mb-2">
    <Ionicons name={icon} size={18} color="#6b7280" />
    <Text className="text-gray-800 ml-2">{label}</Text>
  </View>
);

const getStatusColors = (status: string) => {
  switch (status) {
    case "Active":
      return { bg: "bg-green-100", text: "text-green-700" };
    case "Draft":
      return { bg: "bg-yellow-100", text: "text-yellow-700" };
    case "Closed":
      return { bg: "bg-red-100", text: "text-red-700" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700" };
  }
};
