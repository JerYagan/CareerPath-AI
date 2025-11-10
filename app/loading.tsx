import { View, ActivityIndicator, Text } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Font.loadAsync(Ionicons.font);
        router.replace("/jobseeker/Home");
      } catch (error) {
        console.error("Error loading assets:", error);
      }
    };

    loadAssets();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="black" />
      <Text className="mt-4 text-gray-600">Loading...</Text>
    </View>
  );
}
