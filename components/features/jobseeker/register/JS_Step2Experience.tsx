import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CustomButton from "@/components/ui/CustomButton";

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function JS_Step2Experience({ onBack, onNext }: Props) {
  const [experiences, setExperiences] = useState([
    { title: "", company: "", duration: "", description: "" },
  ]);

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let valid = true;
    let e: any = {};

    experiences.forEach((exp, idx) => {
      if (!exp.title.trim()) {
        valid = false;
        e[`title_${idx}`] = "Job Title is required.";
      }
      if (!exp.company.trim()) {
        valid = false;
        e[`company_${idx}`] = "Company is required.";
      }
      if (!exp.duration.trim()) {
        valid = false;
        e[`duration_${idx}`] = "Duration is required.";
      }
    });

    setErrors(e);
    return valid;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  type ExpField = "title" | "company" | "duration" | "description";

  const updateField = (
    index: number,
    field: ExpField,
    value: string
  ) => {
    const updated = [...experiences];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { title: "", company: "", duration: "", description: "" },
    ]);
  };

  return (
    <View>
      <Text className="text-lg font-bold text-[#1C388E]">Work Experience</Text>
      <Text className="text-gray-500 mb-4">
        Please fill in the required information
      </Text>

      {experiences.map((exp, i) => (
        <View key={i} className="bg-white p-4 rounded-2xl border border-gray-300 mb-6">

          {/* TITLE */}
          <View className="mt-4">
            <TextInput
              value={exp.title}
              onChangeText={(t) => updateField(i, "title", t)}
              placeholder="Job Title *"
              className={`bg-white p-4 rounded-xl border ${
                errors[`title_${i}`] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[`title_${i}`] && (
              <Text className="text-red-500 text-xs mt-1">
                {errors[`title_${i}`]}
              </Text>
            )}
          </View>

          {/* COMPANY */}
          <View className="mt-4">
            <TextInput
              value={exp.company}
              onChangeText={(t) => updateField(i, "company", t)}
              placeholder="Company *"
              className={`bg-white p-4 rounded-xl border ${
                errors[`company_${i}`] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[`company_${i}`] && (
              <Text className="text-red-500 text-xs mt-1">
                {errors[`company_${i}`]}
              </Text>
            )}
          </View>

          {/* DURATION */}
          <View className="mt-4">
            <TextInput
              value={exp.duration}
              onChangeText={(t) => updateField(i, "duration", t)}
              placeholder="Duration (e.g. 2020–Present) *"
              className={`bg-white p-4 rounded-xl border ${
                errors[`duration_${i}`] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[`duration_${i}`] && (
              <Text className="text-red-500 text-xs mt-1">
                {errors[`duration_${i}`]}
              </Text>
            )}
          </View>

          {/* DESCRIPTION */}
          <View className="mt-4">
            <TextInput
              value={exp.description}
              onChangeText={(t) => updateField(i, "description", t)}
              placeholder="Description (optional)"
              multiline
              className="bg-white p-4 rounded-xl border border-gray-300"
            />
          </View>
        </View>
      ))}

      <TouchableOpacity
        className="bg-gray-100 py-3 rounded-xl border border-gray-300 mb-4"
        onPress={addExperience}
      >
        <Text className="text-center text-gray-700 font-medium">
          + Add More Experience
        </Text>
      </TouchableOpacity>

      {/* BUTTONS */}
      <View className="flex-row mt-4 mb-10">
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