import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import notifications from "@/assets/data/notifications.json";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const item = notifications.find((n) => n.id.toString() === id);

  if (!item) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Notification not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-6 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="pr-4">
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>

        <Text className="text-xl font-bold flex-1">{item.title}</Text>

        {/* Actions like Gmail */}
        <View className="flex-row gap-4">
          <Ionicons name="star-outline" size={24} color="#6b7280" />
          <Ionicons name="trash-outline" size={24} color="#ef4444" />
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 py-5">
        <Text className="text-gray-500 text-sm mb-3">
          {new Date(item.time).toLocaleString()}
        </Text>

        <Text className="text-gray-800 text-base leading-6">
          {item.message}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}