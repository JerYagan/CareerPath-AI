import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRegister } from "../../context/RegisterContext";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step3Education = ({ onNext, onBack }: Props) => {
  const { data, update } = useRegister();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(data.degree.trim() !== "" && data.school.trim() !== "");
  }, [data]);

  return (
    <View>
      <Text className="font-semibold text-lg mb-4">Education</Text>

      <TextInput
        placeholder="Degree"
        value={data.degree}
        onChangeText={(t) => update({ degree: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="School"
        value={data.school}
        onChangeText={(t) => update({ school: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Year Graduated"
        value={data.year}
        onChangeText={(t) => update({ year: t })}
        className="bg-gray-100 p-3 rounded-lg mb-6"
      />

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

export default Step3Education;