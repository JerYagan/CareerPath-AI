import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRegister } from "../../../../context/RegisterContext";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step4Skills = ({ onNext, onBack }: Props) => {
  const { data, update } = useRegister();
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (!skill.trim()) return;
    update({ skills: [...data.skills, skill] });
    setSkill("");
  };

  const valid = data.skills.length >= 3;

  return (
    <View>
      <Text className="font-semibold text-lg mb-4">Skills</Text>

      <View className="flex-row items-center mb-4">
        <TextInput
          placeholder="Add a skill"
          value={skill}
          onChangeText={setSkill}
          className="flex-1 bg-gray-100 p-3 rounded-lg mr-2"
        />

        <TouchableOpacity
          onPress={addSkill}
          className="bg-black px-4 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap mb-6">
        {data.skills.map((s, i) => (
          <View key={i} className="bg-black/10 px-3 py-2 rounded-full mr-2 mb-2">
            <Text className="text-sm">{s}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row justify-between">
        <TouchableOpacity onPress={onBack} className="border px-6 py-3 rounded-lg">
          <Text className="font-medium">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!valid}
          onPress={onNext}
          className={`px-6 py-3 rounded-lg ${
            valid ? "bg-black" : "bg-gray-400"
          }`}
        >
          <Text className="text-white font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step4Skills;
