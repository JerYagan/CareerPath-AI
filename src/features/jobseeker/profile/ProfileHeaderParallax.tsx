import React from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  scrollY: Animated.Value;
  user: {
    name: string;
    position?: string;
    location?: string;
    company?: string;
    email?: string;
    openToWork?: boolean;
  };
  onEditPress: () => void;
  onChangePhoto: () => void;
}

export default function ProfileHeaderParallax({
  scrollY,
  user,
  onEditPress,
  onChangePhoto,
}: Props) {
  // HEIGHT: 260 → 140 on scroll
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [260, 140],
    extrapolate: "clamp",
  });

  // Image shrink
  const imageSize = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [130, 70],
    extrapolate: "clamp",
  });

  // Name fade + move
  const nameOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const nameTranslateY = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -20],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{ height: headerHeight }}
      className="w-full items-center bg-brandBlue shadow-md px-4 pt-10 pb-4"
    >
      {/* PROFILE PIC */}
      <Animated.View style={{ transform: [{ translateY: nameTranslateY }] }}>
        <Animated.Image
          source={{ uri: "https://i.pravatar.cc/190" }}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: 9999,
          }}
          className="border-4 border-white shadow-xl"
        />

        <TouchableOpacity
          onPress={onChangePhoto}
          className="absolute bottom-1 right-1 bg-black/70 p-2 rounded-full"
        >
          <Ionicons name="camera-outline" size={18} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* NAME + POSITION */}
      <Animated.View
        style={{
          opacity: nameOpacity,
          transform: [{ translateY: nameTranslateY }],
        }}
        className="items-center mt-3"
      >
        <Text className="text-3xl font-bold text-white">{user.name}</Text>

        {user.position && (
          <Text className="text-white text-base mt-1">{user.position}</Text>
        )}
      </Animated.View>

      {/* EDIT BUTTON */}
      <TouchableOpacity
        onPress={onEditPress}
        className="mt-3 bg-white py-2 px-4 rounded-full flex-row items-center gap-2 shadow-md"
      >
        <Ionicons name="pencil-outline" size={18} color="#1C388E" />
        <Text className="text-brandBlue font-semibold">Edit Profile</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}