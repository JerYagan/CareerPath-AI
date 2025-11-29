import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { router } from "expo-router";

export default function EmployerStep4OTP({ onBack }: any) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code.");
      return false;
    }
    return true;
  };

  const handleComplete = () => {
    if (!validate()) return;
    router.replace("/auth/RegistrationSuccess");
  };

  return (
    <View>
      <Text className="text-lg font-semibold text-[#1C388E] mb-1">
        OTP Verification
      </Text>
      <Text className="text-gray-500 mb-4">
        Enter the code sent to your phone
      </Text>

      <TextInput
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
        keyboardType="numeric"
        placeholder="000000"
        className={`bg-white p-4 rounded-xl text-center text-xl tracking-widest border ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && (
        <Text className="text-red-500 text-xs mt-2 text-center">{error}</Text>
      )}

      <View className="flex-row gap-3 mt-6">
        <CustomButton
          title="Back"
          onPress={onBack}
          className="flex-1 bg-gray-200"
          textClassName="text-gray-600"
        />

        <CustomButton
          title="Complete Registration"
          onPress={handleComplete}
          className="flex-1 bg-[#1C388E]"
          textClassName="text-white"
        />
      </View>
    </View>
  );
}