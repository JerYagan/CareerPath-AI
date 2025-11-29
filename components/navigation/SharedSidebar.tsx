import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import profileData from "@/assets/data/profile.json";
import type { Href } from "expo-router";

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
  role: "jobseeker" | "employer";
};

const JOBSEEKER_NAV = [
  { label: "Home", icon: "home-outline", route: "/jobseeker/Home" },
  { label: "Activity", icon: "time-outline", route: "/jobseeker/Activity" },
  { label: "Chats", icon: "chatbubble-outline", route: "/jobseeker/Chats" },
  { label: "Companies", icon: "business-outline", route: "/jobseeker/Companies" },
  { label: "Career", icon: "school-outline", route: "/jobseeker/Career" },
  { label: "Profile", icon: "person-outline", route: "/jobseeker/Profile" },
  { label: "Settings", icon: "settings-outline", route: "/Settings" },
];

const EMPLOYER_NAV = [
  { label: "Dashboard", icon: "grid-outline", route: "/employer/Dashboard" },
  { label: "Job Posts", icon: "briefcase-outline", route: "/employer/Jobs" },
  { label: "Applications", icon: "layers-outline", route: "/employer/Applications" },
  { label: "Chat", icon: "chatbubble-outline", route: "/employer/Chat" },
  { label: "Profile", icon: "business-outline", route: "/employer/Profile" },
  { label: "Settings", icon: "settings-outline", route: "/Settings" },
];

export default function SharedSidebar({ visible, onClose, role }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const screenWidth = Dimensions.get("window").width;
  const sidebarWidth = screenWidth * 0.8;

  const slideAnim = useRef(new Animated.Value(-sidebarWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const NAV_ITEMS = role === "jobseeker" ? JOBSEEKER_NAV : EMPLOYER_NAV;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: visible ? 0 : -sidebarWidth,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: visible ? 0.5 : 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  return (
    <>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          pointerEvents={visible ? "auto" : "none"}
          style={{
            position: "absolute",
            top: insets.top,
            bottom: insets.bottom,
            left: 0,
            right: 0,
            backgroundColor: "black",
            opacity: overlayOpacity,
            zIndex: 5,
          }}
        />
      </TouchableWithoutFeedback>

      {/* Sidebar */}
      <Animated.View
        style={{
          position: "absolute",
          top: insets.top,
          bottom: insets.bottom,
          width: sidebarWidth,
          backgroundColor: "white",
          transform: [{ translateX: slideAnim }],
          zIndex: 10,
        }}
      >
        <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 24 }}>
          {/* Header button */}
          <View className="flex-row justify-between items-center mb-6 px-6">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="menu-outline" size={28} color="#2563eb" />
            </TouchableOpacity>
          </View>

          {/* Profile Section */}
          <View className="mb-8 px-6 items-center">
            <Image
              source={{ uri: "https://i.pravatar.cc/190" }}
              className="w-24 h-24 rounded-full bg-gray-200"
            />

            <Text className="text-xl font-bold text-gray-900 mt-3">
              {profileData.name}
            </Text>
            <Text className="text-gray-500 font-medium mt-1">
              {profileData.position}
            </Text>

            {/* Divider */}
            <View className="h-px bg-gray-200 my-5 w-full" />
          </View>

          {/* Navigation */}
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.route);

            return (
              <TouchableOpacity
                key={item.label}
                onPress={() => {
                  router.push(item.route as Href);
                  onClose();
                }}
                className="relative px-6 py-4 mb-2"
              >
                {isActive && (
                  <View className="absolute left-0 top-0 bottom-0 w-1.5 bg-brandBlue rounded-r-full" />
                )}

                <View className="flex-row items-center gap-4">
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={isActive ? "#2563eb" : "#6b7280"}
                  />

                  <Text
                    className={`text-lg font-semibold ${
                      isActive ? "text-blue-700" : "text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    </>
  );
}
