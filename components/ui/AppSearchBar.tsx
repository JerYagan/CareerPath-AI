import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AppSearchBarProps {
  value: string;
  onChange: (v: string) => void;

  /** Placeholder */
  placeholder?: string;

  /** Optional callback when hitting search button */
  onSubmit?: () => void;

  /** Optional right button */
  rightButtonLabel?: string;
  onRightButtonPress?: () => void;

  /** Optional left icon toggle button (filters, menu, etc.) */
  leftIcon?: string;
  onLeftIconPress?: () => void;

  /** Enable or disable filter/mobile modal button etc. */
  showLeftIcon?: boolean;
  showRightButton?: boolean;
}

const AppSearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  onSubmit,
  rightButtonLabel = "Search",
  onRightButtonPress,

  leftIcon = "options-outline",
  onLeftIconPress,

  showLeftIcon = false,
  showRightButton = false,
}: AppSearchBarProps) => {
  return (
    <View className="rounded-lg mb-8">

      {/* Search Input */}
      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-1 gap-2">
        <Ionicons name="search-outline" size={20} color="#555" />

        <TextInput
          className="flex-1 text-base"
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
        />

        {/* Optional icon button */}
        {showLeftIcon && (
          <TouchableOpacity onPress={onLeftIconPress}>
            <Ionicons name={leftIcon} size={22} color="#444" />
          </TouchableOpacity>
        )}
      </View>

      {/* Optional right button */}
      {showRightButton && (
        <TouchableOpacity
          onPress={onRightButtonPress}
          className="mt-3 bg-indigo-600 py-2 rounded-lg items-center"
        >
          <Text className="text-white text-base font-semibold">
            {rightButtonLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppSearchBar;