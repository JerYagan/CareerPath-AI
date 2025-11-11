import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import profileData from "@/assets/data/profile.json";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
] as const;

const SETTINGS_ITEM = { label: "Settings", icon: "settings-outline" };

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
};

const Sidebar = ({ visible, onClose }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const screenWidth = Dimensions.get("window").width;
  const sidebarWidth = screenWidth * 0.75;
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current; // <-- animated opacity
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: visible ? screenWidth - sidebarWidth : screenWidth,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: visible ? 0.5 : 0, // target opacity
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dx > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0)
          slideAnim.setValue(screenWidth - sidebarWidth + gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) onClose();
        else
          Animated.timing(slideAnim, {
            toValue: screenWidth - sidebarWidth,
            duration: 200,
            useNativeDriver: true,
          }).start();
      },
    })
  ).current;

  return (
    <>
      {/* Animated dark overlay */}
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
          transform: [{ translateX: slideAnim }],
          backgroundColor: "white",
          zIndex: 10,
        }}
        {...panResponder.panHandlers}
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          {/* Top bar */}
          <View className="flex-row justify-between items-center mb-6 px-6">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="menu-outline" size={28} color="#2563eb" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/Setting");
                onClose();
              }}
            >
              <Ionicons
                name={SETTINGS_ITEM.icon as any}
                size={24}
                color="#6b7280"
              />
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

            {/* Profile completion */}
            <View className="mt-4 mb-3 bg-blue-50 p-6">
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm text-gray-500">
                  Profile Completion
                </Text>
                <Text className="text-sm font-bold text-gray-400">
                  {profileData.completion}% completed
                </Text>
              </View>

              <View className="w-full h-2 bg-gray-200 rounded-full">
                <View
                  style={{
                    width: `${profileData.completion}%`,
                    height: 8,
                    backgroundColor: "#2563eb",
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
          </View>

          {/* Navigation Items */}
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.route;
            return (
              <TouchableOpacity
                key={item.label}
                onPress={() => {
                  router.push(item.route);
                  onClose();
                }}
                activeOpacity={0.7}
                className="flex-row items-center gap-4 p-4 relative"
              >
                {/* Left active bar */}
                {isActive && (
                  <View
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      backgroundColor: "#2563eb",
                      borderRadius: 2,
                    }}
                  />
                )}

                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={isActive ? "#2563eb" : "#6b7280"}
                  className="w-12 text-center"
                />
                <Text
                  className={`text-lg font-semibold ${
                    isActive ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default Sidebar;