import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export default function EmptyState({
  title,
  subtitle,
  icon = "information-circle-outline",
}: Props) {
  return (
    <View className="items-center justify-center py-20 px-6">
      <Ionicons name={icon} size={46} color="#9ca3af" />
      <Text className="text-xl font-bold text-gray-700 mt-4 text-center">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-gray-500 mt-2 text-center w-[80%]">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
