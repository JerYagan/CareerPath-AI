import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import EmployerSidebar from "@/components/features/employer/EmployerSidebar";
import SharedSidebar from "@/components/navigation/SharedSidebar";
import PesoLogo from "@/assets/images/peso-logo.png";

const _layout = () => {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(4); // example unread count

  return (
    <View style={{ flex: 1 }}>
      <SharedSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        role="employer"
      />

      {/* Tabs */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginTop: 4 },
          tabBarStyle: {
            paddingTop: 8,
            height: 115,
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
          },
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#9ca3af",
          headerTitleAlign: "center",

          // LEFT: hamburger
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => setSidebarVisible(true)}
              className="ml-4"
            >
              <Ionicons name="menu-outline" size={28} color="black" />
            </TouchableOpacity>
          ),

          // CENTER: PESO logo + text
          headerTitle: () => (
            <View className="flex-row items-center justify-center gap-2 mr-4">
              <Image
                source={PesoLogo}
                className="w-8 h-8 object-contain"
              />
              <Text className="text-lg font-bold">PESO Jobs PH</Text>
            </View>
          ),

          // RIGHT: notif bell
          headerRight: () => (
            <View className="flex-row items-center mr-6">
              <TouchableOpacity
                onPress={() => router.push("/Notifications")}
                className="relative"
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
                {unreadCount > 0 && (
                  <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border border-white" />
                )}
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        {/* MAIN EMPLOYER TABS */}
        <Tabs.Screen
          name="Dashboard"
          options={{
            title: "Dashboard & Analytics",
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Jobs"
          options={{
            title: "Jobs",
            tabBarLabel: "Jobs",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="briefcase-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Chats/index"
          options={{
            title: "Chats",
            tabBarLabel: "Chats",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Applications"
          options={{
            title: "Applications",
            tabBarLabel: "Applications",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
          }}
        />

        {/* HIDDEN ROUTES */}
        <Tabs.Screen name="Candidates" options={{ href: null }} />
        <Tabs.Screen name="Profile" options={{ href: null }} />
        <Tabs.Screen name="Candidates/[id]" options={{ href: null }} />

        <Tabs.Screen
          name="Chats/[id]"
          options={{ href: null, headerShown: false }}
        />
        <Tabs.Screen name="Jobs/[id]" options={{ href: null }} />
      </Tabs>
    </View>
  );
};

export default _layout;