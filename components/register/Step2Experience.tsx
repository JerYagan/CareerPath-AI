import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRegister } from "../../context/RegisterContext";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2Experience = ({ onNext, onBack }: Props) => {
  const { data, update } = useRegister();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(data.jobTitle.trim() !== "" && data.company.trim() !== "");
  }, [data]);

  return (
    <View>
      <Text className="font-semibold text-lg mb-4">Work Experience</Text>

      <TextInput
        placeholder="Job Title"
        value={data.jobTitle}
        onChangeText={(t) => update({ jobTitle: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Company"
        value={data.company}
        onChangeText={(t) => update({ company: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Duration"
        value={data.workDuration}
        onChangeText={(t) => update({ workDuration: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Work Description"
        multiline
        value={data.workDescription}
        onChangeText={(t) => update({ workDescription: t })}
        className="bg-gray-100 p-3 rounded-lg h-24 mb-6"
      />

      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={onBack}
          className="border px-6 py-3 rounded-lg"
        >
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

export default Step2Experience;