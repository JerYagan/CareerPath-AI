import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Modal,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native";

export type DraggableSheetProps = {
  visible: boolean;
  onClose: () => void;
  height?: "full" | "half" | "large";
  children?: React.ReactNode;
};

const DraggableSheet: React.FC<DraggableSheetProps> = ({
  visible,
  onClose,
  height = "full",
  children,
}) => {
  let startY = 900;

  if (height === "half") startY = 500;
  if (height === "large") startY = 300;

  const translateY = useRef(new Animated.Value(startY)).current;
  const [mounted, setMounted] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 3,

      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },

      onPanResponderRelease: (_, g) => {
        if (g.dy > 120 || g.vy > 0.6) closeSheet();
        else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: startY,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setMounted(false);
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      setMounted(true);
      translateY.setValue(startY);

      requestAnimationFrame(() => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }).start();
      });
    } else {
      Animated.timing(translateY, {
        toValue: startY,
        duration: 220,
        useNativeDriver: true,
      }).start(() => setMounted(false));
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={closeSheet}>
      <TouchableWithoutFeedback onPress={closeSheet}>
        <View className="flex-1 bg-black/30" />
      </TouchableWithoutFeedback>

      <Animated.View
        {...panResponder.panHandlers}
        style={{ transform: [{ translateY }] }}
        className={`absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl p-5
          ${height === "half" ? "h-1/2" : ""}
          ${height === "full" ? "h-full" : ""}
          ${height === "large" ? "h-[80%]" : ""}
        `}
      >
        <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
        {children}
      </Animated.View>
    </Modal>
  );
};

export default DraggableSheet;