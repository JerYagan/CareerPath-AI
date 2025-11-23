import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Modal,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native";

const DraggableSheet = ({
  visible,
  onClose,
  height = "full",
  children,
}: {
  visible: boolean;
  onClose: () => void;
  height?: "full" | "half";
  children: React.ReactNode;
}) => {
  const startY = height === "half" ? 500 : 800;
  const translateY = useRef(new Animated.Value(startY)).current;
  const [mounted, setMounted] = useState(false);

  // Prevent instant pop (VERY IMPORTANT FIX)
  useEffect(() => {
    if (visible) {
      setMounted(true); // mount sheet BEFORE animating

      // ensure translateY starts offscreen
      translateY.setValue(startY);

      requestAnimationFrame(() => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 280,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          useNativeDriver: true,
        }).start();
      });
    } else {
      // animate down THEN unmount
      Animated.timing(translateY, {
        toValue: startY,
        duration: 240,
        easing: (t) => Math.pow(t, 3),
        useNativeDriver: true,
      }).start(() => setMounted(false));
    }
  }, [visible]);

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: startY,
      duration: 240,
      useNativeDriver: true,
    }).start(onClose);
  };

  // FULL-SHEET PanResponder FIX
  const panResponder = useRef(
    PanResponder.create({
      // this makes it draggable ANYWHERE
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (_, g) => {
        return Math.abs(g.dy) > 3; // tiny movement triggers drag
      },

      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },

      onPanResponderRelease: (_, g) => {
        if (g.dy > 140 || g.vy > 0.6) {
          closeSheet();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 160,
            useNativeDriver: true,
          }).start();
        }
      },

      // prevents children from stealing gestures
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  if (!mounted) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={closeSheet}>
      {/* tap outside */}
      <TouchableWithoutFeedback onPress={closeSheet}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>

      <Animated.View
        {...panResponder.panHandlers}
        style={{ transform: [{ translateY }] }}
        className={`bg-white rounded-t-3xl px-5 pt-3 ${
          height === "half" ? "h-1/2" : "h-full"
        }`}
        
      >
        <View className="w-14 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

        {children}
      </Animated.View>
    </Modal>
  );
};

export default DraggableSheet;