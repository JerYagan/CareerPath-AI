import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import CustomButton from "@/components/ui/CustomButton";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function EmployerStep2Company({ onNext, onBack }: Props) {
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let valid = true;
    let e: any = {};

    if (!company.trim()) {
      e.company = "Company Name is required.";
      valid = false;
    }

    if (!address.trim()) {
      e.address = "Company Address is required.";
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <View>
      <Text className="text-lg font-semibold text-[#1C388E] mb-1">
        Company Details
      </Text>
      <Text className="text-gray-500 mb-4">
        Provide your company’s legal information
      </Text>

      {/* COMPANY NAME */}
      <TextInput
        value={company}
        onChangeText={setCompany}
        placeholder="Company Legal Name *"
        className={`bg-white p-4 rounded-xl border ${
          errors.company ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.company && <Text className="text-red-500 text-xs">{errors.company}</Text>}

      {/* ADDRESS */}
      <View className="mt-4">
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Company Address *"
          className={`bg-white p-4 rounded-xl border ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.address && <Text className="text-red-500 text-xs">{errors.address}</Text>}
      </View>

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