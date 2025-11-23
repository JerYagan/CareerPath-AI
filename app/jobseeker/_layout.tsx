import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "@/components/ui/Sidebar";

const JobseekerLayout = () => {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <View style={{ flex: 1 }}>
      {/* Render Sidebar at root */}
      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

      {/* Tabs */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginTop: 4 },
          tabBarStyle: { paddingTop: 8, height: 115, borderTopWidth: 1, borderTopColor: "#e5e7eb" },
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#9ca3af",
          headerRight: () => (
            <View className="flex-row items-center gap-4 mr-4">
              {/* Notifications bell */}
              <TouchableOpacity
                onPress={() => router.push("/Notifications")}
                className="relative"
              >
                <Ionicons name="notifications-outline" size={24} color="black" />
                {unreadCount > 0 && (
                  <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border border-white" />
                )}
              </TouchableOpacity>

              {/* Sidebar hamburger */}
              <TouchableOpacity onPress={() => setSidebarVisible(true)} className="ml-4">
                <Ionicons name="menu-outline" size={28} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "CareerPath AI",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Activity"
          options={{
            title: "My Activity",
            tabBarLabel: "Activity",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Chat"
          options={{
            title: "Chat",
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen name="(chats)" options={{ href: null, headerShown: false }} />
        <Tabs.Screen name="Chats" options={{ href: null, headerShown: false }} />
        <Tabs.Screen name="Chats/index" options={{ href: null, headerShown: false }} />
        <Tabs.Screen name="Chats/[id]" options={{ href: null, headerShown: false }} />
        <Tabs.Screen name="Career" options={{ href: null }} />
        <Tabs.Screen name="Companies" options={{ href: null }} />
        <Tabs.Screen name="Navigation" options={{ href: null }} />
      </Tabs>
    </View>
  );
};

export default JobseekerLayout;