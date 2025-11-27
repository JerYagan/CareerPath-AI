import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DraggableSheet from "@/components/ui/DraggableSheet";
import CustomButton from "@/components/ui/CustomButton";
import { Job } from "@/types/job";

type Props = {
  visible: boolean;
  onClose: () => void;
  job: Job | null;
};

const JobApplySheet: React.FC<Props> = ({ visible, onClose, job }) => {
  if (!job) return null;

  return (
    <DraggableSheet visible={visible} onClose={onClose} height="full">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Job Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold">{job.title}</Text>
          <Text className="text-gray-600">{job.company}</Text>
        </View>

        {/* Quick Info */}
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="location-outline" size={18} />
          <Text className="text-gray-700">{job.location}</Text>
        </View>

        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="cash-outline" size={18} />
          <Text className="text-gray-700">{job.salary}</Text>
        </View>

        <View className="flex-row items-center gap-2 mb-6">
          <Ionicons name="briefcase-outline" size={18} />
          <Text className="text-gray-700">{job.type}</Text>
        </View>

        {/* Description */}
        <Text className="text-gray-600 mb-4">{job.description}</Text>

        {/* Buttons */}
        <View className="mt-4 gap-3">
          <CustomButton
            title="Apply"
            icon="paper-plane-outline"
            iconColor="white"
            className="bg-brandBlue py-3 gap-2"
            textClassName="text-white text-lg"
            onPress={() => {
              console.log("Apply to:", job.title);
              onClose();
            }}
          />

          <CustomButton
            title="Save Job"
            icon="bookmark-outline"
            className="border border-gray-300 py-3 gap-2"
            textClassName="text-gray-800"
            onPress={() => console.log("Saved:", job.title)}
          />

          <CustomButton
            title="Report Job"
            icon="alert-circle-outline"
            iconColor="red"
            className="border border-red-400 py-3 gap-2"
            textClassName="text-red-500"
            onPress={() => console.log("Report:", job.title)}
          />
        </View>

        <View className="h-10" />
      </ScrollView>
    </DraggableSheet>
  );
};

export default JobApplySheet;
