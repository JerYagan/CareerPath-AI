import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CustomButton from "@/src/components/ui/CustomButton";

export default function JS_Step3Education({ onBack, onNext }: any) {
  const [education, setEducation] = useState([
    { degree: "", school: "", year: "" },
  ]);

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let valid = true;
    let e: any = {};

    education.forEach((edu, idx) => {
      if (!edu.degree.trim()) {
        valid = false;
        e[`degree_${idx}`] = "Degree is required.";
      }
      if (!edu.school.trim()) {
        valid = false;
        e[`school_${idx}`] = "School is required.";
      }
      if (!edu.year.trim()) {
        valid = false;
        e[`year_${idx}`] = "Year is required.";
      }
    });

    setErrors(e);
    return valid;
  };

  const handleNext = () => validate() && onNext();

  type EduField = "degree" | "school" | "year";

  const updateField = (
    index: number,
    field: EduField,
    value: string
  ) => {
    const updated = [...education];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setEducation(updated);
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", school: "", year: "" }]);
  };

  return (
    <View>
      <Text className="text-lg font-bold text-[#1C388E]">Education</Text>
      <Text className="text-gray-500 mb-4">
        Add your degrees, certifications, and educational background
      </Text>

      {education.map((edu, i) => (
        <View key={i} className="bg-white p-4 rounded-2xl border border-gray-300 mb-6">

          {/* DEGREE */}
          <View className="mt-4">
            <TextInput
              value={edu.degree}
              onChangeText={(t) => updateField(i, "degree", t)}
              placeholder="Degree / Program *"
              className={`bg-white p-4 rounded-xl border ${
                errors[`degree_${i}`] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[`degree_${i}`] && (
              <Text className="text-red-500 text-xs mt-1">
                {errors[`degree_${i}`]}
              </Text>
            )}
          </View>

          {/* SCHOOL */}
          <View className="mt-4">
            <TextInput
              value={edu.school}
              onChangeText={(t) => updateField(i, "school", t)}
              placeholder="School / University *"
              className={`bg-white p-4 rounded-xl border ${
                errors[`school_${i}`] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[`school_${i}`] && (
              <Text className="text-red-500 text-xs mt-1">
                {errors[`school_${i}`]}
              </Text>
            )}
          </View>

          {/* YEAR */}
          <View className="mt-4">
            <TextInput
              value={edu.year}
              onChangeText={(t) => updateField(i, "year", t)}
              placeholder="Year Graduated *"
              keyboardType="numeric"
              className={`bg-white p-4 rounded-xl border ${
                errors[`year_${i}`] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[`year_${i}`] && (
              <Text className="text-red-500 text-xs mt-1">
                {errors[`year_${i}`]}
              </Text>
            )}
          </View>
        </View>
      ))}

      <TouchableOpacity
        className="bg-gray-100 py-3 rounded-xl border border-gray-300 mb-4"
        onPress={addEducation}
      >
        <Text className="text-center text-gray-700 font-medium">
          + Add More Education
        </Text>
      </TouchableOpacity>

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