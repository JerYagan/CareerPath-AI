import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

type ViewDetailsSheetProps = {
  visible: boolean;
  onClose: () => void;
  job: any | null;
};

const ViewDetailsSheet = ({ visible, onClose, job }: ViewDetailsSheetProps) => {
  const startY = 800;
  const translateY = useRef(new Animated.Value(startY)).current;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      translateY.setValue(startY);

      requestAnimationFrame(() => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }).start();
      });
    } else {
      Animated.timing(translateY, {
        toValue: startY,
        duration: 240,
        useNativeDriver: true,
      }).start(() => setMounted(false));
    }
  }, [visible]);

  const close = () => {
    Animated.timing(translateY, {
      toValue: startY,
      duration: 220,
      useNativeDriver: true,
    }).start(onClose);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 2,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 120 || g.vy > 0.5) {
          close();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!mounted) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={close}>
      <TouchableWithoutFeedback onPress={close}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>

      <Animated.View
        {...panResponder.panHandlers}
        style={{ transform: [{ translateY }] }}
        className="bg-white rounded-t-3xl px-5 pt-3 h-3/4"
      >
        <View className="w-14 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

        {job && (
          <ScrollView showsVerticalScrollIndicator={false} className="pb-10">

            <Text className="text-2xl font-bold text-gray-900">
              {job.title}
            </Text>

            <Text className="text-gray-600 mt-1">{job.location}</Text>

            {/* Metrics */}
            <View className="flex-row items-center gap-4 mt-4">
              <Text className="text-gray-500">👁 {job.views} views</Text>
              <Text className="text-gray-500">
                👤 {job.applicants.length} applicants
              </Text>
            </View>

            <Text className="text-gray-700 font-medium mt-4">
              {job.jobType}
            </Text>

            <Text className="text-xl font-semibold text-gray-900 mt-1">
              {job.salaryRange}
            </Text>

            <Text className="text-gray-500 mt-2">
              Status: {job.status}
            </Text>

            <Text className="text-gray-400 mt-2">{job.postedAgo}</Text>

            {/* Description */}
            {job.description && (
              <Text className="text-gray-600 mt-4 leading-6">
                {job.description}
              </Text>
            )}

            <View className="h-12" />
          </ScrollView>
        )}
      </Animated.View>
    </Modal>
  );
};

export default ViewDetailsSheet;