import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Modal,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SheetSize = "full" | "large" | "half";

type Props = {
  visible: boolean;
  onClose: () => void;
  height?: SheetSize;
  children: React.ReactNode;
};

const DraggableSheet: React.FC<Props> = ({
  visible,
  onClose,
  height = "full",
  children,
}) => {
  const insets = useSafeAreaInsets();

  // HEIGHT MAP
  const HEIGHT_MAP: Record<SheetSize, `${number}%`> = {
    full: "100%",
    large: "80%",
    half: "50%",
  };
  
  const START_MAP = {
    full: 1000,
    large: 900,
    half: 600,
  };

  const translateY = useRef(new Animated.Value(START_MAP[height])).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const [mounted, setMounted] = useState(false);

  // OPEN / CLOSE animations
  useEffect(() => {
    if (visible) {
      setMounted(true);

      translateY.setValue(START_MAP[height]);
      overlayOpacity.setValue(0);

      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 260,
            useNativeDriver: true,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 0.5,
            duration: 260,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: START_MAP[height],
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setMounted(false));
    }
  }, [visible]);

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: START_MAP[height],
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(onClose);
  };

  // DRAG gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 3,

      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },

      onPanResponderRelease: (_, g) => {
        if (g.dy > 120 || g.vy > 0.6) {
          closeSheet();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!mounted) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={closeSheet}>
      {/* Dimmed Background */}
      <TouchableWithoutFeedback onPress={closeSheet}>
        <Animated.View
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateY }],
          height: HEIGHT_MAP[height] as `${number}%`,
        }}
        className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl p-5"
      >
        {/* Grabber */}
        <View className="w-14 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

        {children}
      </Animated.View>
    </Modal>
  );
};

export default DraggableSheet;