import React from "react";
import { View, Text, Animated, Image } from "react-native";

const ProfileHeader = ({ scrollY, user }: any) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [180, 80],
    extrapolate: "clamp",
  });

  const imageSize = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [100, 45],
    extrapolate: "clamp",
  });

  const nameOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{ height: headerHeight }}
      className="w-full justify-center items-center bg-gray-50"
    >
      <Animated.Image
        source={{ uri: user.profilePicture }}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: 9999,
        }}
        className="border-2 border-white shadow-lg"
      />

      <Animated.Text
        style={{ opacity: nameOpacity }}
        className="text-2xl font-bold text-gray-900 mt-3"
      >
        {user.name}
      </Animated.Text>
    </Animated.View>
  );
};

export default ProfileHeader;