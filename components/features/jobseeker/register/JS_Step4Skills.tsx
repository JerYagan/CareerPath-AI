import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CustomButton from "@/components/ui/CustomButton";

type Skill = {
  name: string;
  level: string; // store as string, validate as number
};

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function JS_Step4Skills({ onBack, onNext }: Props) {
  const [skills, setSkills] = useState<Skill[]>([
    { name: "", level: "" },
  ]);

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let valid = true;
    let e: any = {};

    skills.forEach((s, idx) => {
      if (!s.name.trim()) {
        valid = false;
        e[`name_${idx}`] = "Skill name is required.";
      }
      const lvl = Number(s.level);
      if (isNaN(lvl) || lvl < 1 || lvl > 100) {
        valid = false;
        e[`level_${idx}`] = "Level must be between 1 and 100.";
      }
    });

    setErrors(e);
    return valid;
  };

  const handleNext = () => validate() && onNext();

  const addSkill = () => {
    setSkills([...skills, { name: "", level: "" }]);
  };

  const updateField = (
    i: number,
    field: keyof Skill,
    value: string
  ) => {
    setSkills((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], [field]: value };
      return updated;
    });
  };

  return (
    <View>
      <Text className="text-lg font-bold text-[#1C388E]">Skills</Text>
      <Text className="text-gray-500 mb-4">
        Add skills that represent your strengths
      </Text>

      {skills.map((skill, i) => (
        <View
          key={i}
          className="bg-white p-4 rounded-2xl border border-gray-300 mb-6"
        >
          {/* SKILL NAME */}
          <View className="mt-4">
            <TextInput
              value={skill.name}
              onChangeText={(t) => updateField(i, "name", t)}
              placeholder="Skill Name *"
              className={`bg-white p-4 rounded-xl border ${
                errors[`name_${i}`] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[`name_${i}`] && (
              <Text className="text-red-500 text-xs mt-1">
                {errors[`name_${i}`]}
              </Text>
            )}
          </View>

          {/* SKILL LEVEL */}
          <View className="mt-4">
            <TextInput
              value={skill.level}
              onChangeText={(t) => updateField(i, "level", t)}
              placeholder="Proficiency (1–100) *"
              keyboardType="numeric"
              className={`bg-white p-4 rounded-xl border ${
                errors[`level_${i}`] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[`level_${i}`] && (
              <Text className="text-red-500 text-xs mt-1">
                {errors[`level_${i}`]}
              </Text>
            )}
          </View>
        </View>
      ))}

      {/* ADD MORE */}
      <TouchableOpacity
        className="bg-gray-100 py-3 rounded-xl border border-gray-300 mb-4"
        onPress={addSkill}
      >
        <Text className="text-center text-gray-700 font-medium">
          + Add More Skills
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