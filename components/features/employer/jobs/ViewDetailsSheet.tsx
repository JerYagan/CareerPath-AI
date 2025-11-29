import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DraggableSheet from "@/components/ui/DraggableSheet";
import { Job } from "@/types/jobs";

type ViewDetailsSheetProps = {
  visible: boolean;
  onClose: () => void;
  job: Job | null;
};

const brandBlue = "#1C388E";

const ViewDetailsSheet = ({ visible, onClose, job }: ViewDetailsSheetProps) => {
  if (!visible || !job) return null;

  const maxViews = Math.max(...job.analytics.map((p) => p.value));

  return (
    <DraggableSheet visible={visible} onClose={onClose} height="full">
      <ScrollView
        className="px-5 pb-20 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Text className="text-2xl font-bold text-gray-900">{job.title}</Text>
        <Text className="text-gray-600 mt-1">
          {job.location} • {job.workSetup}
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          {job.department} • {job.experienceLevel}
        </Text>

        {/* STATS */}
        <View className="flex-row items-center gap-4 mt-4">
          <View className="flex-row items-center gap-2">
            <Ionicons name="eye-outline" size={18} color="#6b7280" />
            <Text className="text-gray-500">{job.views} views</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="people-outline" size={18} color="#6b7280" />
            <Text className="text-gray-500">
              {job.applicants.length} applicants
            </Text>
          </View>
        </View>

        <Text className="text-gray-700 font-medium mt-4">{job.jobType}</Text>
        <Text className="text-xl font-semibold text-gray-900 mt-1">
          {job.salaryRange}
        </Text>
        <Text className="text-gray-500 mt-2">Status: {job.status}</Text>
        <Text className="text-gray-400 mt-1">{job.postedAgo}</Text>

        {/* ANALYTICS */}
        <View className="mt-6">
          <Text className="font-semibold text-gray-900 text-lg mb-2">
            Views (last 7 days)
          </Text>

          <View className="flex-row items-end justify-between h-32 rounded-2xl px-4 py-3 mt-4">
            {job.analytics.map((point, index) => {
              const heightPercent =
                maxViews === 0 ? 0 : (point.value / maxViews) * 100;

              return (
                <View
                  key={`${point.label}-${index}`}
                  className="items-center justify-end"
                  style={{ width: "10%" }}
                >
                  <View
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: brandBlue,
                      borderRadius: 999,
                      width: 14,
                    }}
                  />
                  <Text className="text-xs text-gray-500 mt-2">
                    {point.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* DESCRIPTION */}
        <View className="mt-6">
          <Text className="font-semibold text-gray-900 text-lg">
            Role overview
          </Text>
          <Text className="text-gray-600 mt-2 leading-6">
            {job.description}
          </Text>
        </View>

        {/* APPLICANTS */}
        <View className="mt-6">
          <Text className="font-semibold text-gray-900 text-lg mb-2">
            Applicants ({job.applicants.length})
          </Text>

          {job.applicants.map((applicant) => (
            <View
              key={applicant.id}
              className="flex-row items-center justify-between bg-gray-50 rounded-xl px-4 py-4 mb-2"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-brandBlue items-center justify-center">
                  <Text className="text-white font-bold text-sm">
                    {applicant.avatarInitials}
                  </Text>
                </View>
                <View className="ml-3">
                  <Text className="text-gray-900 font-semibold">
                    {applicant.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {applicant.role} • {applicant.experience}
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-sm font-semibold text-gray-700">
                  {applicant.status}
                </Text>
              </View>
            </View>
          ))}

          {job.applicants.length === 0 && (
            <Text className="text-gray-500 text-sm">
              No applicants yet for this role.
            </Text>
          )}
        </View>

        <View className="h-10" />
      </ScrollView>
    </DraggableSheet>
  );
};

export default ViewDetailsSheet;
