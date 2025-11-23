import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

interface Experience {
  title: string;
  company: string;
  years: string;
  description: string;
}

interface AddExperienceModalProps {
  visible: boolean;
  onSave: (exp: Experience) => void;
  onClose: () => void;
}

const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
  visible,
  onSave,
  onClose,
}) => {
  const [local, setLocal] = useState<Experience>({
    title: "",
    company: "",
    years: "",
    description: "",
  });

  const updateField = (key: keyof Experience, value: string) => {
    setLocal((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!local.title.trim() || !local.company.trim()) return;
    onSave(local);
    setLocal({ title: "", company: "", years: "", description: "" });
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible transparent animationType="slide">
      <View className="flex-1 bg-black/30 justify-center items-center px-6">
        <View className="bg-white rounded-2xl w-full max-h-[80%] p-6 shadow-xl">
          <Text className="text-lg font-semibold mb-3">
            Add Work Experience
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-sm text-gray-700 mb-1">Job Title</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-3"
              value={local.title}
              onChangeText={(v) => updateField("title", v)}
            />

            <Text className="text-sm text-gray-700 mb-1">Company</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-3"
              value={local.company}
              onChangeText={(v) => updateField("company", v)}
            />

            <Text className="text-sm text-gray-700 mb-1">Years</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-3"
              value={local.years}
              onChangeText={(v) => updateField("years", v)}
            />

            <Text className="text-sm text-gray-700 mb-1">Description</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-3 min-h-[90px]"
              multiline
              value={local.description}
              onChangeText={(v) => updateField("description", v)}
            />
          </ScrollView>

          <View className="flex-row justify-end gap-5 mt-4">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text className="text-indigo-600 font-bold">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExperienceModal;
