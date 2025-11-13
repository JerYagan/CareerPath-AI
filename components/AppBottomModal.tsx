import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number; // % height (default 50%)
  showClose?: boolean;
}

const AppBottomModal = ({
  visible,
  onClose,
  children,
  height = 0.5,
  showClose = true,
}: Props) => {

  const translateY = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const close = () => {
    Animated.timing(translateY, {
      toValue: 600,
      duration: 150,
      useNativeDriver: true,
    }).start(onClose);
  };

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 5,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 120 || g.vy > 0.65) close();
        else Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      {/* tap outside closes */}
      <TouchableWithoutFeedback onPress={close}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>

      <Animated.View
        {...pan.panHandlers}
        style={{ transform: [{ translateY }] }}
        className="bg-white rounded-t-3xl p-5"
      >

        {/* drag handle */}
        <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

        {/* close button */}
        {showClose && (
          <TouchableWithoutFeedback onPress={close}>
            <View className="absolute right-5 top-5 p-2">
              <Ionicons name="close" size={24} color="#333" />
            </View>
          </TouchableWithoutFeedback>
        )}

        {/* YOUR CONTENT */}
        <View style={{ height: `${height * 100}%` }}>
          {children}
        </View>

      </Animated.View>
    </Modal>
  );
};

export default AppBottomModal;
