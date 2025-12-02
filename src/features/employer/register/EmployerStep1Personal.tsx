import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import CustomButton from "@/src/components/ui/CustomButton";

interface Props {
  onNext: () => void;
}

export default function EmployerStep1Personal({ onNext }: Props) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let valid = true;
    let e: any = {};

    if (!first.trim()) {
      e.first = "First Name is required.";
      valid = false;
    }

    if (!last.trim()) {
      e.last = "Last Name is required.";
      valid = false;
    }

    if (!email.includes("@")) {
      e.email = "Enter a valid email address.";
      valid = false;
    }

    if (mobile.length !== 11) {
      e.mobile = "Mobile number must be 11 digits.";
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <View>
      <Text className="text-lg font-semibold text-[#1C388E] mb-1">
        Personal Info
      </Text>
      <Text className="text-gray-500 mb-4">Please fill in the required fields</Text>

      {/* FIRST NAME */}
      <TextInput
        value={first}
        onChangeText={setFirst}
        placeholder="First Name *"
        className={`bg-white p-4 rounded-xl border ${
          errors.first ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.first && <Text className="text-red-500 text-xs">{errors.first}</Text>}

      {/* LAST NAME */}
      <View className="mt-4">
        <TextInput
          value={last}
          onChangeText={setLast}
          placeholder="Last Name *"
          className={`bg-white p-4 rounded-xl border ${
            errors.last ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.last && <Text className="text-red-500 text-xs">{errors.last}</Text>}
      </View>

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
        {errors.email && <Text className="text-red-500 text-xs">{errors.email}</Text>}
      </View>

      {/* MOBILE */}
      <View className="mt-4">
        <TextInput
          value={mobile}
          onChangeText={setMobile}
          placeholder="Mobile Number *"
          keyboardType="number-pad"
          maxLength={11}
          className={`bg-white p-4 rounded-xl border ${
            errors.mobile ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.mobile && <Text className="text-red-500 text-xs">{errors.mobile}</Text>}
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