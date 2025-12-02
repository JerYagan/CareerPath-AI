import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;

  showFilter?: boolean;
  onFilterPress?: () => void;

  placeholder?: string;
};

const brandBlue = "#1C388E";

export default function SearchBar({
  value,
  onChange,
  showFilter = false,
  onFilterPress,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-white rounded-xl px-4 py-2 shadow-md mb-4">
      <Ionicons name="search-outline" size={20} color="#9ca3af" />

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        className="flex-1 ml-2 text-gray-900"
      />

      {showFilter && (
        <TouchableOpacity
          className="ml-3 w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
          onPress={onFilterPress}
        >
          <Ionicons name="options-outline" size={20} color={brandBlue} />
        </TouchableOpacity>
      )}
    </View>
  );
}