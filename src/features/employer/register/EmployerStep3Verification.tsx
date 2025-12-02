import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/src/components/ui/CustomButton";

export default function EmployerStep3Verification({ onNext, onBack }: any) {
  const [license, setLicense] = useState<any>(null);
  const [registration, setRegistration] = useState<any>(null);

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let valid = true;
    let e: any = {};

    if (!license) {
      e.license = "Business License is required.";
      valid = false;
    }

    if (!registration) {
      e.registration = "Registration Document is required.";
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const pickFile = async (setter: any) => {
    // integrate expo-document-picker here if needed
    setter({ name: "document.pdf" });
  };

  return (
    <View>
      <Text className="text-lg font-semibold text-[#1C388E] mb-1">
        Verification
      </Text>
      <Text className="text-gray-500 mb-4">
        Upload required business documents
      </Text>

      {/* BUSINESS LICENSE */}
      <TouchableOpacity
        onPress={() => pickFile(setLicense)}
        className={`border rounded-xl p-6 items-center gap-3 bg-white ${
          errors.license ? "border-red-500" : "border-gray-300"
        }`}
      >
        <Ionicons name="cloud-upload-outline" size={28} color="#1C388E" />
        <Text className="text-gray-700 font-medium">
          {license ? license.name : "Upload Business License *"}
        </Text>
      </TouchableOpacity>
      {errors.license && (
        <Text className="text-red-500 text-xs mt-1">{errors.license}</Text>
      )}

      {/* REGISTRATION DOC */}
      <TouchableOpacity
        onPress={() => pickFile(setRegistration)}
        className={`border rounded-xl p-6 items-center gap-3 bg-white mt-6 ${
          errors.registration ? "border-red-500" : "border-gray-300"
        }`}
      >
        <Ionicons name="cloud-upload-outline" size={28} color="#1C388E" />
        <Text className="text-gray-700 font-medium">
          {registration ? registration.name : "Upload Registration Document *"}
        </Text>
      </TouchableOpacity>
      {errors.registration && (
        <Text className="text-red-500 text-xs mt-1">{errors.registration}</Text>
      )}

      <View className="flex-row gap-3 mt-6">
        <CustomButton
          title="Back"
          onPress={onBack}
          className="flex-1 bg-gray-200"
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