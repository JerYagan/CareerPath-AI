import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import jobsData from "@/assets/data/employerData/jobs.json";
import applicationsData from "@/assets/data/employerData/applications.json";

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const jobs = jobsData.jobs;
  const applications = applicationsData.applications;

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-600">Job not found.</Text>
      </View>
    );
  }

  const jobApplicants = applications.filter((app) =>
    job.applicants.includes(app.id)
  );

  return (
    <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center mb-4"
      >
        <Ionicons name="arrow-back" size={24} color="#2563eb" />
        <Text className="text-blue-600 ml-1">Back</Text>
      </TouchableOpacity>

      {/* Job Title */}
      <Text className="text-2xl font-bold text-gray-900 mb-1">{job.title}</Text>
      <Text className="text-gray-500 mb-3">{job.location}</Text>

      {/* Applicants Section */}
      <Text className="text-xl font-semibold text-gray-900 mb-2 mt-4">
        Applicants ({jobApplicants.length})
      </Text>

      {jobApplicants.length === 0 && (
        <View className="mt-5 items-center">
          <Ionicons name="people-outline" size={40} color="#9ca3af" />
          <Text className="mt-3 font-semibold text-gray-700">
            No applicants yet
          </Text>
          <Text className="text-gray-500 mt-1 text-center">
            You will see applicants listed here once people apply.
          </Text>
        </View>
      )}

      {jobApplicants.map((applicant) => (
        <View
          key={applicant.id}
          className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
        >
          <Text className="font-bold text-gray-900 text-lg">
            {applicant.name}
          </Text>

          <Text className="text-gray-500">{applicant.email}</Text>

          <Text className="text-gray-700 mt-2 font-medium">
            {applicant.role}
          </Text>

          <Text className="text-gray-500">{applicant.experience} experience</Text>

          <View className="flex-row justify-end mt-4 gap-2">
            <TouchableOpacity className="px-3 py-2 bg-gray-100 rounded-lg">
              <Text className="text-gray-800">View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-3 py-2 bg-blue-600 rounded-lg">
              <Text className="text-white">Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default JobDetails;