import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRegister } from "../../../../context/RegisterContext";

interface Props {
  onBack: () => void;
}

const Step6Goals = ({ onBack }: Props) => {
  const { data, update } = useRegister();

  return (
    <View>
      <Text className="font-semibold text-lg mb-4">Career Goals</Text>

      <TextInput
        placeholder="Your goals"
        value={data.goal}
        onChangeText={(t) => update({ goal: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Job types you want"
        value={data.jobTypes}
        onChangeText={(t) => update({ jobTypes: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Professional interests"
        value={data.interests}
        onChangeText={(t) => update({ interests: t })}
        className="bg-gray-100 p-3 rounded-lg mb-6"
      />

      <View className="flex-row justify-between">
        <TouchableOpacity onPress={onBack} className="border px-6 py-3 rounded-lg">
          <Text className="font-medium">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-black px-6 py-3 rounded-lg">
          <Text className="text-white font-semibold">
            Complete Registration
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step6Goals;