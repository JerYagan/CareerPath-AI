import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import EmployerSidebar from "@/components/features/employer/EmployerSidebar";

const _layout = () => {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(4); // example unread count

  return (
    <View style={{ flex: 1 }}>
      {/* Render Employer Sidebar */}
      <EmployerSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

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

          // Header Right (Bell + Hamburger)
          headerRight: () => (
            <View className="flex-row items-center gap-4 mr-4">
              {/* Notifications */}
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

              {/* Sidebar toggle */}
              <TouchableOpacity onPress={() => setSidebarVisible(true)}>
                <Ionicons name="menu-outline" size={28} color="black" />
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
            title: "Jobs Posts",
            tabBarLabel: "Jobs",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="briefcase-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Chat"
          options={{
            title: "Messages",
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Candidates"
          options={{
            title: "Find Candidates",
            tabBarLabel: "Candidates",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />

        {/* HIDDEN ROUTES */}
        <Tabs.Screen name="Applications" options={{ href: null }} />
        <Tabs.Screen name="Profile" options={{ href: null }} />
        <Tabs.Screen name="PostJob" options={{ href: null }} />
        <Tabs.Screen name="Candidates/[id]" options={{ href: null }} />
        <Tabs.Screen
          name="Chats"
          options={{ href: null, headerShown: false }}
        />
        <Tabs.Screen
          name="Chats/index"
          options={{ href: null, headerShown: false }}
        />
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