import React, { useState } from "react";
import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Job } from "@/types/jobs";
import TagsPreview from "@/components/ui/TagsPreview";
import TagsModal from "@/components/ui/TagsModal";
import CustomButton from "@/components/ui/CustomButton";

const brandBlue = "#1C388E";

type ViewDetailsSheetProps = {
  visible: boolean;
  onClose: () => void;
  job: Job | null;
};

const JobDetails = ({ visible, onClose, job }: ViewDetailsSheetProps) => {
  if (!visible || !job) return null;
  const [showAllTags, setShowAllTags] = useState(false);
  const [tagsModalVisible, setTagsModalVisible] = useState(false);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="flex-row items-center px-5 pt-4 pb-3 border-b border-gray-200">
          <TouchableOpacity onPress={onClose} className="mr-3 p-1 rounded-full">
            <Ionicons name="chevron-back" size={26} color={brandBlue} />
          </TouchableOpacity>

          <Text className="text-xl font-semibold text-gray-900">
            Job Details
          </Text>
        </View>

        {/* BODY */}
        <ScrollView
          className="flex-1 px-5 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* TITLE & META */}
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-900">
              {job.title}
            </Text>

            <Text className="text-gray-600 mt-1 text-base">
              {job.location} • {job.workSetup}
            </Text>

            <Text className="text-gray-500 mt-1 text-base">
              {job.department} • {job.experienceLevel}
            </Text>
          </View>

          {/* STATS */}
          <View className="flex-row items-center gap-4 mb-5">
            <View className="flex-row items-center gap-2">
              <Ionicons name="eye-outline" size={20} color="#4b5563" />
              <Text className="text-gray-700 text-base">{job.views} views</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Ionicons name="people-outline" size={20} color="#4b5563" />
              <Text className="text-gray-700 text-base">
                {job.applicants.length} applicants
              </Text>
            </View>
          </View>

          {/* SALARY + STATUS */}
          <View className="mb-6">
            <Text className="text-gray-700 font-medium text-base">
              {job.jobType}
            </Text>
            <Text className="text-xl font-semibold text-gray-900 mt-1">
              {job.salaryRange}
            </Text>

            <Text className="text-gray-500 mt-2 text-base">
              Status: {job.status}
            </Text>

            <Text className="text-gray-400 mt-1 text-base">
              {job.postedAgo}
            </Text>
          </View>

          {/* TAGS */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-2">
              Required Skills / Tags
            </Text>

            <TagsPreview
              skills={job.tags}
              showAll={true} // <--- ALWAYS show all tags
              onPress={() => setTagsModalVisible(true)}
            />
          </View>

          <TagsModal
            visible={tagsModalVisible}
            onClose={() => setTagsModalVisible(false)}
            skills={job.tags}
          />

          {/* DESCRIPTION */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900">
              Role Overview
            </Text>

            <Text className="text-gray-700 mt-2 leading-7 text-base">
              {job.description}
            </Text>
          </View>

          {/* APPLICANTS */}
          <View className="mb-2">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Applicants ({job.applicants.length})
            </Text>

            {job.applicants.map((applicant) => (
              <View
                key={applicant.id}
                className="flex-row items-center justify-between bg-gray-100 rounded-xl px-4 py-4 mb-3"
              >
                <View className="flex-row items-center">
                  <View className="w-11 h-11 rounded-full bg-brandBlue items-center justify-center">
                    <Text className="text-white font-semibold text-base">
                      {applicant.avatarInitials}
                    </Text>
                  </View>

                  <View className="ml-3">
                    <Text className="text-gray-900 font-semibold text-base">
                      {applicant.name}
                    </Text>
                    <Text className="text-gray-600 text-base">
                      {applicant.role} • {applicant.experience}
                    </Text>
                  </View>
                </View>

                <Text className="text-base font-semibold text-gray-700">
                  {applicant.status}
                </Text>
              </View>
            ))}

            {job.applicants.length === 0 && (
              <Text className="text-gray-500 text-base">
                No applicants yet for this role.
              </Text>
            )}
          </View>

          {/* BUTTON (OPTIONAL ACTION) */}
          <CustomButton
            title="View Applicants"
            icon="people-outline"
            className="w-full bg-brandBlue rounded-xl gap-2"
            textClassName="text-white"
            iconColor="white"
            onPress={() => console.log("View Applicants clicked")}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default JobDetails;
