import React from "react";
import { View, Text, Pressable } from "react-native";

type Props = {
  skills: string[];
  onPress: () => void;
};

const SkillsPreview: React.FC<Props> = ({ skills, onPress }) => {
  const preview = skills.slice(0, 3);
  const extra = skills.length - preview.length;

  return (
    <View className="mt-4 flex-row flex-wrap gap-2">
      {preview.map((skill, i) => (
        <Pressable
          key={i}
          onPress={onPress}
          className="py-1 px-2 bg-gray-200 text-gray-600 font-bold rounded-lg"
        >
          <Text className="text-gray-600 font-semibold">{skill}</Text>
        </Pressable>
      ))}

      {extra > 0 && (
        <Pressable
          onPress={onPress}
          className="py-1 px-2 bg-gray-300 rounded-lg"
        >
          <Text className="text-gray-800 font-semibold">+{extra}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SkillsPreview;