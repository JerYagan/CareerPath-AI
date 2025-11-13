import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useRegister } from "../../context/RegisterContext";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step5Resume = ({ onNext, onBack }: Props) => {
  const { data, update } = useRegister();

  const pickResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    });

    if (result.assets && result.assets[0]) {
      update({ resumeUri: result.assets[0].uri });
    }
  };

  return (
    <View>
      <Text className="font-semibold text-lg mb-4">Upload Resume</Text>

      <TouchableOpacity
        onPress={pickResume}
        className="border-2 border-dashed border-gray-300 p-10 rounded-xl mb-6 items-center"
      >
        <Text className="text-gray-600">
          {data.resumeUri ? "Resume Selected" : "Tap to upload resume"}
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-between">
        <TouchableOpacity onPress={onBack} className="border px-6 py-3 rounded-lg">
          <Text className="font-medium">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNext}
          className="bg-black px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step5Resume;
