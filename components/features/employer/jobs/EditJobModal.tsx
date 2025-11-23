import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";

type EditJobModalProps = {
  visible: boolean;
  onClose: () => void;

  // job fields
  title: string;
  location: string;
  jobType: string;
  salaryRange: string;
  status: string;
  description: string;

  // setters
  setTitle: (v: string) => void;
  setLocation: (v: string) => void;
  setJobType: (v: string) => void;
  setSalaryRange: (v: string) => void;
  setStatus: (v: string) => void;
  setDescription: (v: string) => void;

  onSubmit: () => void;
};

const EditJobModal = ({
  visible,
  onClose,

  title,
  location,
  jobType,
  salaryRange,
  status,
  description,

  setTitle,
  setLocation,
  setJobType,
  setSalaryRange,
  setStatus,
  setDescription,

  onSubmit,
}: EditJobModalProps) => {
  const translateY = useRef(new Animated.Value(800)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : 800,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/30" />
      </TouchableWithoutFeedback>

      <Animated.View
        style={{ transform: [{ translateY }] }}
        className="absolute bottom-0 top-0 left-0 right-0 bg-white p-5"
      >
        {/* HEADER */}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold ml-3 text-gray-900">
            Edit Job
          </Text>
        </View>

        {/* BODY */}
        <ScrollView showsVerticalScrollIndicator={false}>

          <TextInput
            placeholder="Job title"
            placeholderTextColor="#9ca3af"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            placeholder="Location"
            placeholderTextColor="#9ca3af"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base mt-3"
            value={location}
            onChangeText={setLocation}
          />

          <TextInput
            placeholder="Job Type (Full-time, Part-time, Remote)"
            placeholderTextColor="#9ca3af"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base mt-3"
            value={jobType}
            onChangeText={setJobType}
          />

          <TextInput
            placeholder="Salary Range (₱30,000 - ₱50,000)"
            placeholderTextColor="#9ca3af"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base mt-3"
            value={salaryRange}
            onChangeText={setSalaryRange}
          />

          <TextInput
            placeholder="Status (Active, Draft, Closed)"
            placeholderTextColor="#9ca3af"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base mt-3"
            value={status}
            onChangeText={setStatus}
          />

          <TextInput
            placeholder="Job Description"
            placeholderTextColor="#9ca3af"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base mt-3 min-h-[120px]"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <CustomButton
            title="Save Changes"
            className="mt-6 bg-blue-600"
            textClassName="text-white text-base"
            onPress={onSubmit}
          />

          <View className="h-10" />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default EditJobModal;