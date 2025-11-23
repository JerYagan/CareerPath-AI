import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;          // <-- NEW PROP
  title?: string;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
};

export default function CustomButton({
  icon,
  iconSize = 18,
  iconColor = "black",        // <-- DEFAULT ICON COLOR
  title,
  onPress,
  className = "",
  textClassName = "",
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-center rounded-lg px-4 py-4 ${className}`}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}    // <-- USE NEW PROP HERE
        />
      )}

      <Text className={`font-semibold text-center ml-2 ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}