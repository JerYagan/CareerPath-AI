import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import jobs from "@/assets/data/jobs.json";
import JobCard from "@/components/features/jobseeker/home/HomeCard";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";

const options = ["saved", "applied", "interviews", "archived"] as const;
const labels = {
  saved: "Saved",
  applied: "Applied",
  interviews: "Interviews",
  archived: "Archived",
};

const statusColors: Record<string, string> = {
  "Under Review": "bg-yellow-200 text-yellow-800",
  Shortlisted: "bg-blue-100 text-blue-800",
  "Interview Scheduled": "bg-purple-100 text-purple-800",
  Rejected: "bg-red-100 text-red-800",
  Hired: "bg-green-100 text-green-800",
  "Position Filled": "bg-gray-200 text-gray-700",
  "No Longer Available": "bg-orange-100 text-orange-700",
};

const Activity = () => {
  const [selected, setSelected] = useState<keyof typeof labels>("saved");
  const [refreshing, setRefreshing] = useState(false);

  const savedJobs = jobs.filter((job) => job.saved);
  const appliedJobs = jobs.filter((job) => job.applied);
  const interviewJobs = jobs.filter(
    (job) => job.status === "Interview Scheduled"
  );
  const archivedJobs = jobs.filter((job) => job.archived);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate fetch or data reload
    setTimeout(() => {
      console.log("Data refreshed!");
      setRefreshing(false);
    }, 1200);
  }, []);

  return (
    <View className="mx-4 mt-4 flex-1">
      {/* Toggle Tabs */}
      <View className="flex-row justify-center bg-gray-200 border border-gray-200 rounded-lg mb-4">
        {options.map((option) => {
          const isActive = selected === option;
          return (
            <TouchableOpacity
              key={option}
              onPress={() => setSelected(option)}
              className={`flex-1 py-4 px-4 rounded-lg ${
                isActive ? "bg-white" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-center font-bold ${
                  isActive ? "text-black" : "text-gray-500"
                }`}
              >
                {labels[option]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content Section */}
      <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Saved Jobs */}
        {selected === "saved" &&
          savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              showMatch={false}
              buttons={[
                {
                  title: "Apply Now",
                  className: "bg-indigo-950 w-full flex-1",
                  textClassName: "text-white",
                  onPress: () => console.log("Apply to", job.title),
                },
                {
                  title: "Remove",
                  icon: "trash-outline",
                  className: "border border-gray-300 gap-2",
                  onPress: () => console.log("Remove", job.title),
                },
              ]}
            />
          ))}

        {/* Applied Jobs */}
        {selected === "applied" &&
          appliedJobs.map((job) => (
            <View
              key={job.id}
              className="mb-4 p-6 border border-gray-300 rounded-lg bg-white"
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

              {/* Status Badge */}
              {job.status && (
                <View className="flex-row mt-4">
                  <Text
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      statusColors[job.status] || "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {job.status}
                  </Text>
                </View>
              )}

              <View className="mt-8">
                <View className="flex-row items-center gap-4 mb-2">
                  <Ionicons name="location-outline" size={18} />
                  <Text className="text-gray-500">{job.location}</Text>
                </View>

                <View className="flex-row items-center gap-4 mb-2">
                  <Ionicons name="cash-outline" size={18} />
                  <Text className="text-gray-500">{job.salary}</Text>
                </View>

                <View className="flex-row items-center gap-4 mb-2">
                  <Ionicons name="briefcase-outline" size={18} />
                  <Text className="text-gray-500">{job.type}</Text>
                </View>

                <View className="flex-row space-between gap-2 mt-4">
                  <CustomButton
                    title="View Application"
                    icon="eye-outline"
                    className="border border-gray-300 w-2/3 flex-1 gap-2"
                  />
                  <CustomButton
                    title="Withdraw"
                    icon="return-up-back-outline"
                    className="border border-gray-300 w-1/3 gap-2"
                  />
                </View>
              </View>
            </View>
          ))}

        {/* Interview Jobs */}
        {selected === "interviews" &&
          interviewJobs.map((job) => (
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

              {/* Interview Info */}
              {job.interviewDetails && (
                <View className="mb-4 mt-8">
                  <View className="flex-row flex-wrap gap-4 mb-2">
                    <Ionicons name="calendar-outline" size={18} />
                    <Text className="text-gray-700">
                      {job.interviewDetails.date}
                    </Text>
                  </View>
                  <View className="flex-row gap-4 mb-2">
                    <Ionicons name="time-outline" size={18} />
                    <Text className="text-gray-700">
                      {job.interviewDetails.time}
                    </Text>
                  </View>
                  <View className="flex-row gap-4 mb-2">
                    <Ionicons name="briefcase-outline" size={18} />
                    <Text className="text-gray-700">
                      {job.interviewDetails.mode}
                    </Text>
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
                  className="bg-indigo-600 flex-1 gap-2"
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

        {/* Archived Jobs */}
        {selected === "archived" && (
          <View className="mt-2">
            <Text className="text-gray-600 mb-4 font-semibold">
              {archivedJobs.length} archived {archivedJobs.length === 1 ? "item" : "items"}
            </Text>

            {archivedJobs.map((job) => (
              <View
                key={job.id}
                className="mb-4 p-6 border border-gray-300 rounded-lg bg-white"
              >
                <View className="flex-row items-start justify-between mb-4">
                  <View className="flex-row items-center gap-2">
                    <Image
                      source={{ uri: "https://via.placeholder.com/50" }}
                      className="w-12 h-12 bg-gray-200 rounded-md"
                    />
                    <View>
                      <Text className="text-lg font-bold">{job.title}</Text>
                      <Text className="text-gray-600">{job.company}</Text>
                    </View>
                  </View>
                </View>

                {/* Tags */}
                <View className="flex-row gap-2 mb-4">
                  {job.statusTags?.map((tag: string, i: number) => (
                    <Text
                      key={i}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        statusColors[tag] || "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {tag}
                    </Text>
                  ))}
                </View>

                <View className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="briefcase-outline" size={18} />
                  <Text className="text-gray-500">{job.type}</Text>
                </View>

                <View className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="time-outline" size={18} />
                  <Text className="text-gray-500">
                    Archived {job.archivedDuration} ago
                  </Text>
                </View>

                <View className="mt-4">
                  <CustomButton
                    title="Restore"
                    icon="refresh-outline"
                    className="bg-white border border-gray-400 w-full gap-2"
                    onPress={() => console.log("Restore", job.title)}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Activity;