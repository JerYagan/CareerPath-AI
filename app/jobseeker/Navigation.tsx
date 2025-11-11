import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const NAV_ITEMS = [
  { label: "Home", icon: "home-outline", route: "/jobseeker/Home" },
  { label: "Activity", icon: "time-outline", route: "/jobseeker/Activity" },
  { label: "Chat", icon: "chatbubble-outline", route: "/jobseeker/Chat" },
  {
    label: "Companies",
    icon: "business-outline",
    route: "/jobseeker/Companies",
  },
  { label: "Career", icon: "school-outline", route: "/jobseeker/Career" },
  { label: "Profile", icon: "person-outline", route: "/jobseeker/Profile" },
  { label: "Settings", icon: "settings-outline", route: "/jobseeker/Settings" },
] as const;

const Navigation = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 24 }} >
        <Text className="text-3xl font-bold mb-6 text-gray-900">
          Navigation
        </Text>

        <View className="flex w-full space-y-4">
          {NAV_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => router.push(item.route)}
              className="flex-row items-center gap-4 p-4"
              activeOpacity={0.7}
            >
              <View className="w-12 h-12 justify-center items-center">
                <Ionicons name={item.icon as any} size={24} color="#2563eb" />
              </View>
              <Text className="text-gray-900 font-semibold text-lg">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Navigation;
