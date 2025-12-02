import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import CustomButton from "@/src/components/ui/CustomButton";

export default function JS_Step1Personal({ onNext }: any) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let e: any = {};
    let valid = true;

    if (!fullName.trim()) ((valid = false), (e.fullName = "Required"));
    if (!email.includes("@")) ((valid = false), (e.email = "Invalid email"));
    if (pass.length < 6) ((valid = false), (e.pass = "Min 6 characters"));
    if (confirm !== pass)
      ((valid = false), (e.confirm = "Passwords do not match"));
    if (phone.length !== 11)
      ((valid = false), (e.phone = "11 digits required"));
    if (!location.trim()) ((valid = false), (e.location = "Required"));

    setErrors(e);
    return valid;
  };

  const handleNext = () => validate() && onNext();

  return (
    <View>
      <Text className="text-lg font-bold text-[#1C388E]">Personal Details</Text>
      <Text className="text-gray-500 mb-4">
        Please fill in the required information
      </Text>

      <View>
        {/* FULL NAME */}
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name *"
          className={`bg-white p-4 rounded-xl border ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && (
          <Text className="text-red-500 text-xs">{errors.fullName}</Text>
        )}

        {/* EMAIL */}
        <View className="mt-4">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address *"
            keyboardType="email-address"
            className={`bg-white p-4 rounded-xl border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <Text className="text-red-500 text-xs">{errors.email}</Text>
          )}
        </View>

        {/* PASSWORD */}
        <View className="mt-4">
          <TextInput
            value={pass}
            onChangeText={setPass}
            placeholder="Password *"
            secureTextEntry
            className={`bg-white p-4 rounded-xl border ${
              errors.pass ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.pass && (
            <Text className="text-red-500 text-xs">{errors.pass}</Text>
          )}
        </View>

        {/* CONFIRM PASSWORD */}
        <View className="mt-4">
          <TextInput
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Confirm Password *"
            secureTextEntry
            className={`bg-white p-4 rounded-xl border ${
              errors.confirm ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirm && (
            <Text className="text-red-500 text-xs">{errors.confirm}</Text>
          )}
        </View>

        {/* PHONE */}
        <View className="mt-4">
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number *"
            keyboardType="number-pad"
            maxLength={11}
            className={`bg-white p-4 rounded-xl border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <Text className="text-red-500 text-xs">{errors.phone}</Text>
          )}
        </View>

        {/* LOCATION */}
        <View className="mt-4">
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Location *"
            className={`bg-white p-4 rounded-xl border ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <Text className="text-red-500 text-xs">{errors.location}</Text>
          )}
        </View>

        {/* PROFESSIONAL SUMMARY */}
        <View className="mt-4">
          <TextInput
            value={summary}
            onChangeText={setSummary}
            placeholder="Professional Summary (optional)"
            multiline
            className="bg-white p-4 rounded-xl border border-gray-300"
          />
        </View>
      </View>

      <CustomButton
        title="Next"
        onPress={handleNext}
        className="mt-6 bg-[#1C388E]"
        textClassName="text-white"
      />
    </View>
  );
}
