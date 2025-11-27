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
import profileData from "@/assets/data/profile.json";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NAV_ITEMS = [
  { label: "Home", icon: "home-outline", route: "/jobseeker/Home" },
  { label: "Activity", icon: "time-outline", route: "/jobseeker/Activity" },
  { label: "Chats", icon: "chatbubble-outline", route: "/jobseeker/Chats" },
  {
    label: "Companies",
    icon: "business-outline",
    route: "/jobseeker/Companies",
  },
  { label: "Career", icon: "school-outline", route: "/jobseeker/Career" },
  { label: "Profile", icon: "person-outline", route: "/jobseeker/Profile" },
  { label: "Settings", icon: "settings-outline", route: "/Settings" },
] as const;

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
};

const Sidebar = ({ visible, onClose }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const screenWidth = Dimensions.get("window").width;
  const sidebarWidth = screenWidth * 0.8;
  const slideAnim = useRef(new Animated.Value(-sidebarWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // open / close animation only (no drag)
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
  }, [visible, sidebarWidth, slideAnim, overlayOpacity]);

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
          left: 0,
          width: sidebarWidth,
          backgroundColor: "white",
          transform: [{ translateX: slideAnim }],
          zIndex: 10,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 24,
          }}
        >
          {/* Top bar */}
          <View className="flex-row justify-between items-center mb-6 px-6">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="menu-outline" size={28} color="#2563eb" />
            </TouchableOpacity>
          </View>

          {/* User Profile */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4 px-6">
              <Image
                source={{ uri: profileData.profilePicture }}
                className="w-14 h-14 rounded-full mr-4"
              />
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">
                  {profileData.name}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {profileData.position}
                </Text>
              </View>
            </View>

            {/* Additional info */}
            <View className="space-y-1 px-6">
              {profileData.email && (
                <View className="flex-row items-center gap-2">
                  <Ionicons name="mail-outline" size={16} color="#6b7280" />
                  <Text className="text-gray-600 text-sm">
                    {profileData.email}
                  </Text>
                </View>
              )}
              {profileData.phone && (
                <View className="flex-row items-center gap-2">
                  <Ionicons name="call-outline" size={16} color="#6b7280" />
                  <Text className="text-gray-600 text-sm">
                    {profileData.phone}
                  </Text>
                </View>
              )}
              {profileData.location && (
                <View className="flex-row items-center gap-2">
                  <Ionicons name="location-outline" size={16} color="#6b7280" />
                  <Text className="text-gray-600 text-sm">
                    {profileData.location}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Navigation Items (including Settings) */}
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.route === "/Settings"
                ? pathname === "/Settings"
                : pathname.startsWith(item.route);

            return (
              <TouchableOpacity
                key={item.label}
                onPress={() => {
                  router.push(item.route);
                  onClose();
                }}
                activeOpacity={0.8}
                className="relative px-6 py-4 mb-2"
              >
                {isActive && (
                  <>
                    {/* Left glow bar */}
                    <View className="absolute left-0 top-0 bottom-0 w-1.5 bg-brandBlue rounded-r-full shadow-lg" />

                    {/* Background highlight */}
                    <View className="absolute left-3 right-3 top-1 bottom-1 bg-blue-50 rounded-2xl opacity-80" />
                  </>
                )}

                <View className="flex-row items-center gap-4 relative">
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
};

export default Sidebar;
