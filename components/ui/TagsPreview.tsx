import React from "react";
import { View, Text, Pressable } from "react-native";

type Props = {
  skills: string[];
  showAll?: boolean;   // <--- NEW
  onPress?: () => void;
};

const TagsPreview: React.FC<Props> = ({ skills, showAll = false, onPress }) => {
  
  const preview = showAll ? skills : skills.slice(0, 3);
  const extra = skills.length - preview.length;

  return (
    <View className="mt-3 flex-row flex-wrap gap-2">
      {preview.map((skill, i) => (
        <Pressable
          key={i}
          onPress={onPress}
          className="py-1.5 px-3 bg-gray-200 rounded-xl"
        >
          <Text className="text-gray-700 font-semibold text-sm">{skill}</Text>
        </Pressable>
      ))}

      {!showAll && extra > 0 && (
        <Pressable
          onPress={onPress}
          className="py-1.5 px-3 bg-gray-200 rounded-full"
        >
          <Text className="text-gray-800 font-semibold">+{extra}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default TagsPreview;