import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";

const InterviewSection = ({ interviewJobs }: { interviewJobs: any[] }) => (
  <>
    {interviewJobs.map((job) => (
      <View
        key={job.id}
        className="mb-4 p-6 border border-blue-600 rounded-lg bg-blue-50"
      >
        <View className="flex-row items-start justify-between">
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
        </View>

        {job.interviewDetails && (
          <View className="mb-4 mt-8">
            <View className="flex-row flex-wrap gap-4 mb-2">
              <Ionicons name="calendar-outline" size={18} />
              <Text className="text-gray-700">{job.interviewDetails.date}</Text>
            </View>
            <View className="flex-row gap-4 mb-2">
              <Ionicons name="time-outline" size={18} />
              <Text className="text-gray-700">{job.interviewDetails.time}</Text>
            </View>
            <View className="flex-row gap-4 mb-2">
              <Ionicons name="briefcase-outline" size={18} />
              <Text className="text-gray-700">{job.interviewDetails.mode}</Text>
            </View>
            <View className="flex-row gap-4 mb-2 overflow-hidden">
              <Ionicons name="location-outline" size={18} />
              <Text className="text-gray-700 w-5/6">
                {job.interviewDetails.place}
              </Text>
            </View>
            <Text className="text-gray-500 mt-2">
              <Text className="font-semibold">Interviewer: </Text>
              <Text className="text-gray-800">
                {job.interviewDetails.interviewerPosition} -{" "}
                {job.interviewDetails.interviewerName}
              </Text>
            </Text>
          </View>
        )}

        <View className="mt-4">
          <CustomButton
            title="Join Interview"
            icon="caret-forward-outline"
            iconColor="white"
            className="bg-brandBlue flex-1 gap-2"
            textClassName="text-white"
          />

          <View className="flex-row gap-2 mt-2">
            <CustomButton
              title="Reschedule"
              icon="calendar-outline"
              className="bg-white border border-gray-300 flex-1 gap-2"
            />
            <CustomButton
              title="Add to Calendar"
              icon="add-outline"
              className="bg-white border border-gray-300 flex-1 gap-2"
            />
          </View>
        </View>
      </View>
    ))}
  </>
);

export default InterviewSection;