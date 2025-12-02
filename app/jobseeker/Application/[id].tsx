import React, { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/src/components/ui/CustomButton";

// TEMP: Pull from your jobs.json
import jobs from "@/assets/data/jobs.json";
import type { Job } from "@/src/types/job";

export default function ApplicationDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const jobId = Number(id);

  const job: Job | undefined = useMemo(
    () => (jobs as Job[]).find((j) => j.id === jobId),
    [jobId]
  );

  if (!job) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Application not found.</Text>
      </View>
    );
  }

  // STATUS COLOR LOGIC
  const statusColors: Record<string, string> = {
    "Under Review": "bg-yellow-200 text-yellow-800",
    Shortlisted: "bg-blue-100 text-blue-800",
    "Interview Scheduled": "bg-purple-100 text-purple-800",
    Rejected: "bg-red-100 text-red-800",
    Hired: "bg-green-100 text-green-800",
  };

  const statusColor =
    statusColors[job.status || ""] || "bg-gray-200 text-gray-700";

  return (
    <View className="flex-1 bg-white">
      {/* HEADER */}
      <View className="flex-row items-center gap-4 px-4 py-4 border-b border-gray-200">
        <Ionicons
          name="arrow-back"
          size={26}
          onPress={() => router.back()}
          color="black"
        />
        <Text className="text-xl font-bold">Application Details</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4 mt-3">
        {/* STATUS BADGE */}
        <View className="flex-row mb-5">
          <Text
            className={`px-3 py-1 rounded-lg text-sm font-semibold ${statusColor}`}
          >
            {job.status}
          </Text>
        </View>

        {/* JOB HEADER */}
        <View className="mb-6">
          <Text className="text-2xl font-bold">{job.title}</Text>
          <Text className="text-gray-600">{job.company}</Text>
        </View>

        {/* JOB INFO */}
        <View className="space-y-2 mb-8">
          <View className="flex-row items-center gap-2">
            <Ionicons name="location-outline" size={18} />
            <Text className="text-gray-700">{job.location}</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Ionicons name="cash-outline" size={18} />
            <Text className="text-gray-700">{job.salary}</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Ionicons name="briefcase-outline" size={18} />
            <Text className="text-gray-700">{job.type}</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Ionicons name="time-outline" size={18} />
            <Text className="text-gray-700">{job.posted}</Text>
          </View>
        </View>

        {/* TIMELINE */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">Application Timeline</Text>

          <View className="border-l-2 border-gray-300 ml-2">
            {[
              "Applied",
              "Under Review",
              "Interview Scheduled",
              "Final Review",
              "Accepted / Rejected",
            ].map((step, i) => (
              <View key={i} className="mb-6 ml-3">
                <View className="flex-row items-center gap-2">
                  <View
                    className={`w-3 h-3 rounded-full ${
                      job.status === step
                        ? "bg-brandBlue"
                        : "bg-gray-300"
                    }`}
                  />
                  <Text
                    className={`${
                      job.status === step
                        ? "text-brandBlue font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {step}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* DOCUMENTS */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">Submitted Documents</Text>

          <View className="flex-row items-center gap-3 mb-3">
            <Ionicons name="document-text-outline" size={20} />
            <Text className="text-gray-700">Resume.pdf</Text>
          </View>

          <View className="flex-row items-center gap-3">
            <Ionicons name="document-outline" size={20} />
            <Text className="text-gray-700">CoverLetter.pdf</Text>
          </View>
        </View>

        {/* NOTES */}
        <View className="mb-8">
          <Text className="text-lg font-semibold mb-3">Your Notes</Text>
          <View className="p-4 border border-gray-300 rounded-xl bg-gray-50">
            <Text className="text-gray-700">
              You can store personal reminders or interview notes here.
            </Text>
          </View>
        </View>

        {/* ACTION BUTTONS */}
        <View className="mb-10 gap-3">
          <CustomButton
            title="Contact Recruiter"
            icon="mail-outline"
            className="bg-brandBlue py-3 gap-2"
            textClassName="text-white"
            iconColor="white"
            onPress={() => console.log("contact")}
          />

          <CustomButton
            title="Withdraw Application"
            icon="close-circle-outline"
            className="border border-red-500 py-3 gap-2"
            textClassName="text-red-600"
            onPress={() => console.log("withdraw")}
          />
        </View>

        <View className="h-20" />
      </ScrollView>
    </View>
  );
}