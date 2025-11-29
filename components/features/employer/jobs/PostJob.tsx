import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";

type Option = {
  label: string;
  value: string;
};

type PostJobProps = {
  onClose?: () => void;
};

const brandBlue = "#1C388E";

const jobTypes: Option[] = [
  { label: "Full-time", value: "Full-time" },
  { label: "Part-time", value: "Part-time" },
  { label: "Contract", value: "Contract" },
  { label: "Internship", value: "Internship" },
];

const workSetups: Option[] = [
  { label: "On-site", value: "On-site" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Remote", value: "Remote" },
];

const PostJob = ({ onClose }: PostJobProps) => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [workSetup, setWorkSetup] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const [typeModal, setTypeModal] = useState(false);
  const [setupModal, setSetupModal] = useState(false);

  const handlePublish = () => {
    console.log({
      title,
      jobType,
      workSetup,
      location,
      salary,
      description,
    });

    alert("Job published successfully!");
    onClose?.();
  };

  const handleDraft = () => {
    alert("Saved as draft.");
    onClose?.();
  };

  return (
    <ScrollView
      className="flex-1 px-5 py-4 bg-gray-50"
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-2xl font-bold text-gray-900">
            Post a new job
          </Text>
          <Text className="text-gray-500 mt-1">
            Share an opportunity with PESO candidates.
          </Text>
        </View>

        <CustomButton
          title=""
          icon="close"
          className="w-9 h-9 rounded-full bg-white shadow-sm items-center justify-center"
          iconSize={20}
          iconColor="#4b5563"
          onPress={onClose}
        />
      </View>

      {/* FORM */}
      <Text className="font-semibold text-gray-900 mb-1">Job Title</Text>
      <TextInput
        className="bg-white rounded-xl p-4 mb-4 shadow-sm text-gray-900"
        placeholder="e.g. Frontend Developer"
        placeholderTextColor="#9ca3af"
        value={title}
        onChangeText={setTitle}
      />

      <Text className="font-semibold text-gray-900 mb-1">Job Type</Text>
      <TouchableOpacity
        onPress={() => setTypeModal(true)}
        className="bg-white rounded-xl p-4 mb-4 shadow-sm flex-row justify-between items-center"
      >
        <Text className="text-gray-700">
          {jobType || "Select job type"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#6b7280" />
      </TouchableOpacity>

      <Text className="font-semibold text-gray-900 mb-1">Work Setup</Text>
      <TouchableOpacity
        onPress={() => setSetupModal(true)}
        className="bg-white rounded-xl p-4 mb-4 shadow-sm flex-row justify-between items-center"
      >
        <Text className="text-gray-700">
          {workSetup || "Select setup"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#6b7280" />
      </TouchableOpacity>

      <Text className="font-semibold text-gray-900 mb-1">Location</Text>
      <TextInput
        className="bg-white rounded-xl p-4 mb-4 shadow-sm text-gray-900"
        placeholder="e.g. Quezon City, Philippines"
        placeholderTextColor="#9ca3af"
        value={location}
        onChangeText={setLocation}
      />

      <Text className="font-semibold text-gray-900 mb-1">Salary Range</Text>
      <TextInput
        className="bg-white rounded-xl p-4 mb-4 shadow-sm text-gray-900"
        placeholder="₱30,000 - ₱50,000 / month"
        placeholderTextColor="#9ca3af"
        value={salary}
        onChangeText={setSalary}
      />

      <Text className="font-semibold text-gray-900 mb-1">Job Description</Text>
      <TextInput
        className="bg-white rounded-xl p-4 mb-6 shadow-sm text-gray-900"
        placeholder="Describe responsibilities, qualifications, expectations..."
        placeholderTextColor="#9ca3af"
        multiline
        numberOfLines={5}
        value={description}
        onChangeText={setDescription}
      />

      {/* BUTTONS */}
      <View className="flex-row gap-3 mb-4">
        <CustomButton
          title="Save as draft"
          icon="document-outline"
          className="flex-1 bg-gray-200 py-3 rounded-xl gap-2"
          textClassName="text-gray-800 font-semibold"
          iconColor="#4b5563"
          onPress={handleDraft}
        />
        <CustomButton
          title="Publish job"
          icon="send-outline"
          className="flex-1 bg-brandBlue py-3 rounded-xl gap-2"
          textClassName="text-white font-semibold"
          iconColor="white"
          onPress={handlePublish}
        />
      </View>

      {/* Type Modal */}
      <Modal visible={typeModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white p-6 rounded-t-2xl">
            <Text className="text-lg font-bold mb-4">Select Job Type</Text>

            {jobTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                onPress={() => {
                  setJobType(type.value);
                  setTypeModal(false);
                }}
                className="py-3 border-b border-gray-200"
              >
                <Text className="text-gray-800">{type.label}</Text>
              </TouchableOpacity>
            ))}

            <CustomButton
              title="Close"
              className="mt-4 bg-gray-200 rounded-xl py-3"
              textClassName="text-gray-700 font-semibold"
              onPress={() => setTypeModal(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Setup Modal */}
      <Modal visible={setupModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white p-6 rounded-t-2xl">
            <Text className="text-lg font-bold mb-4">Select Work Setup</Text>

            {workSetups.map((setup) => (
              <TouchableOpacity
                key={setup.value}
                onPress={() => {
                  setWorkSetup(setup.value);
                  setSetupModal(false);
                }}
                className="py-3 border-b border-gray-200"
              >
                <Text className="text-gray-800">{setup.label}</Text>
              </TouchableOpacity>
            ))}

            <CustomButton
              title="Close"
              className="mt-4 bg-gray-200 rounded-xl py-3"
              textClassName="text-gray-700 font-semibold"
              onPress={() => setSetupModal(false)}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PostJob;