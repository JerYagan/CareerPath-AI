import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import notifications from "@/assets/data/notifications.json";

const Notifications = () => {
  const router = useRouter();

  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const openNotification = (item: any) => {
    router.push(`./Notifications/${item.id}`);
  };

  const closeSheet = () => {
    setSheetVisible(false);
    setSelectedNotification(null);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-6 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="pr-4">
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Notifications</Text>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openNotification(item)}
            className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 relative"
          >
            {/* Red dot for unread */}
            {item.unread && (
              <View className="absolute top-3 right-3 w-3 h-3 bg-red-600 rounded-full" />
            )}

            <Text className="font-semibold text-gray-800 mb-1">
              {item.title}
            </Text>

            <Text className="text-gray-600 mb-2" numberOfLines={2}>
              {item.message}
            </Text>

            <Text className="text-gray-400 text-sm">
              {new Date(item.time).toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Notifications;