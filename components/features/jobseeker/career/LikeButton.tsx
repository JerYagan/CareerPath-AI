import React, { useRef } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LikeButton = ({
  liked,
  onPress,
}: {
  liked?: boolean;
  onPress: () => void;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const trigger = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.2, duration: 110, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 110, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity onPress={trigger} activeOpacity={0.8}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={28}
          color={liked ? "#ef4444" : "#555"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default LikeButton;