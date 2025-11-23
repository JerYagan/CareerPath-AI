import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Option = {
  label: string;
  value: string;
};

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

const PostJob = () => {
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
  };

  const handleDraft = () => {
    alert("Saved as draft.");
  };

  return (
    <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
      {/* Title */}
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        Post a New Job
      </Text>
      <Text className="text-gray-500 mb-6">
        Fill in the details below to publish a new job posting.
      </Text>

      {/* FORM */}
      {/* Job Title */}
      <Text className="font-semibold text-gray-900 mb-1">Job Title</Text>
      <TextInput
        className="bg-white rounded-xl p-4 mb-4 shadow-sm text-gray-900"
        placeholder="Enter job title"
        placeholderTextColor="#9ca3af"
        value={title}
        onChangeText={setTitle}
      />

      {/* Job Type */}
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

      {/* Work Setup */}
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

      {/* Location */}
      <Text className="font-semibold text-gray-900 mb-1">Location</Text>
      <TextInput
        className="bg-white rounded-xl p-4 mb-4 shadow-sm text-gray-900"
        placeholder="e.g. Quezon City, Philippines"
        placeholderTextColor="#9ca3af"
        value={location}
        onChangeText={setLocation}
      />

      {/* Salary Range */}
      <Text className="font-semibold text-gray-900 mb-1">Salary Range</Text>
      <TextInput
        className="bg-white rounded-xl p-4 mb-4 shadow-sm text-gray-900"
        placeholder="₱30,000 - ₱50,000 / month"
        placeholderTextColor="#9ca3af"
        value={salary}
        onChangeText={setSalary}
      />

      {/* Description */}
      <Text className="font-semibold text-gray-900 mb-1">Job Description</Text>
      <TextInput
        className="bg-white rounded-xl p-4 mb-6 shadow-sm text-gray-900"
        placeholder="Describe the responsibilities, qualifications, and expectations..."
        placeholderTextColor="#9ca3af"
        multiline
        numberOfLines={5}
        value={description}
        onChangeText={setDescription}
      />

      {/* BUTTONS */}
      <View className="flex-row mb-20">
        <TouchableOpacity
          onPress={handleDraft}
          className="flex-1 bg-gray-200 py-3 rounded-xl mr-2"
        >
          <Text className="text-center text-gray-800 font-semibold">
            Save as Draft
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePublish}
          className="flex-1 bg-blue-600 py-3 rounded-xl"
        >
          <Text className="text-center text-white font-semibold">
            Publish Job
          </Text>
        </TouchableOpacity>
      </View>

      {/* ------------------------------------------------------ */}
      {/* Job Type Modal */}
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

            <TouchableOpacity
              onPress={() => setTypeModal(false)}
              className="mt-4 py-3 bg-gray-200 rounded-xl"
            >
              <Text className="text-center text-gray-700 font-semibold">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ------------------------------------------------------ */}
      {/* Work Setup Modal */}
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

            <TouchableOpacity
              onPress={() => setSetupModal(false)}
              className="mt-4 py-3 bg-gray-200 rounded-xl"
            >
              <Text className="text-center text-gray-700 font-semibold">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PostJob;