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
  iconColor = "black",
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
          color={iconColor}
        />
      )}

      <Text className={`font-semibold text-center ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}