import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onLeftIconPress?: () => void;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onRightButtonPress?: () => void;
  rightButtonLabel?: string;
}

const AppSearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  leftIcon = "options-outline",
  onLeftIconPress,
  onRightButtonPress,
  rightButtonLabel = "Search",
}: Props) => {
  return (
    <View className="bg-white rounded-2xl p-4 mb-5 shadow-sm border border-gray-200">

      {/* Input Row */}
      <View className="flex-row items-center gap-3 bg-gray-100 rounded-xl px-3 py-2">

        <TouchableOpacity onPress={onLeftIconPress}>
          <Ionicons name={leftIcon} size={22} color="#1C388E" />
        </TouchableOpacity>

        <TextInput
          className="flex-1 text-base"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChange}
        />

      </View>

      {/* Branded Search Button */}
      <TouchableOpacity
        onPress={onRightButtonPress}
        className="mt-3 py-3 rounded-xl bg-brandBlue"
      >
        <Text className="text-center text-white font-semibold text-base">
          {rightButtonLabel}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default AppSearchBar;