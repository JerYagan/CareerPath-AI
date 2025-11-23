import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  iconName?: keyof typeof Ionicons.glyphMap;
  className?: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  iconName,
  className = "",
}) => {
  const base =
    "flex-row items-center justify-center rounded-xl px-4 py-4 active:opacity-80";
  const variantClass =
    variant === "primary"
      ? "bg-indigo-600"
      : "bg-indigo-50";

  const textClass =
    variant === "primary"
      ? "text-white font-semibold"
      : "text-indigo-700 font-semibold";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${base} ${variantClass} ${className}`}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          size={16}
          color={variant === "primary" ? "#fff" : "#4338CA"}
          style={{ marginRight: 6 }}
        />
      )}
      <Text className={textClass}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ProfileButton;