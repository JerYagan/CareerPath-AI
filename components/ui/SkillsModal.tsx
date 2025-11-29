import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  skills: string[];
};

const SkillsModal: React.FC<Props> = ({ visible, onClose, skills }) => {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade">
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/40 justify-center items-center px-6"
      >
        <Pressable className="bg-white w-full rounded-xl p-6">
          <Text className="text-xl font-bold mb-4">Skills Required</Text>

          <View className="flex-row flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <View
                key={idx}
                className="py-1.5 px-3 bg-gray-200 rounded-lg"
              >
                <Text className="text-gray-800 font-semibold">{skill}</Text>
              </View>
            ))}
          </View>

          <Pressable
            onPress={onClose}
            className="mt-6 bg-brandBlue py-3 rounded-lg"
          >
            <Text className="text-center text-white font-semibold text-lg">
              Close
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default SkillsModal;