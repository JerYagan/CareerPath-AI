import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/src/components/ui/CustomButton";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function JS_Step5Resume({ onBack, onNext }: Props) {
  const [resume, setResume] = useState<any>(null);
  const [error, setError] = useState("");

  const validate = () => {
    if (!resume) {
      setError("Resume is required.");
      return false;
    }
    return true;
  };

  const pickResume = async () => {
    // plug in expo-document-picker later
    setResume({ name: "resume.pdf" });
    setError("");
  };

  const handleNext = () => validate() && onNext();

  return (
    <View>
      <Text className="text-lg font-bold text-[#1C388E]">Resume Upload</Text>
      <Text className="text-gray-500 mb-4">
        Upload your most updated resume
      </Text>

      {/* UPLOAD CARD */}
      <TouchableOpacity
        onPress={pickResume}
        className={`bg-white p-6 rounded-2xl border ${
          error ? "border-red-500" : "border-gray-300"
        } items-center`}
      >
        <Ionicons name="cloud-upload-outline" size={40} color="#1C388E" />
        <Text className="text-gray-700 mt-3 font-medium">
          {resume ? resume.name : "Upload Resume (PDF, DOCX)"}
        </Text>
      </TouchableOpacity>

      {error !== "" && (
        <Text className="text-red-500 text-xs mt-2">{error}</Text>
      )}

      {/* BUTTONS */}
      <View className="flex-row mt-6">
        <CustomButton
          title="Back"
          onPress={onBack}
          className="flex-1 bg-gray-200 mr-3"
          textClassName="text-gray-600"
        />

        <CustomButton
          title="Next"
          onPress={handleNext}
          className="flex-1 bg-[#1C388E]"
          textClassName="text-white"
        />
      </View>
    </View>
  );
}