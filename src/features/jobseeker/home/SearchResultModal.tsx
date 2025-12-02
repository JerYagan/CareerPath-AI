import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  PanResponder,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  query: string;
  setQuery: (text: string) => void;
  onSelect: (value: string) => void;
  data: string[];
  type: "job" | "location";
  recent?: string[];
};

const SearchResultModal = ({
  visible,
  onClose,
  title,
  query,
  setQuery,
  onSelect,
  data,
  type,
  recent = [],
}: Props) => {
  const startY = 900; // fullscreen slide amount
  const translateY = useRef(new Animated.Value(startY)).current;
  const [mounted, setMounted] = useState(false);

  const iconName = type === "job" ? "search" : "location-outline";

  useEffect(() => {
    if (visible) {
      setMounted(true);
      translateY.setValue(startY);

      requestAnimationFrame(() => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 240,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          useNativeDriver: true,
        }).start();
      });
    } else {
      Animated.timing(translateY, {
        toValue: startY,
        duration: 220,
        easing: (t) => Math.pow(t, 3),
        useNativeDriver: true,
      }).start(() => setMounted(false));
    }
  }, [visible]);

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: startY,
      duration: 220,
      useNativeDriver: true,
    }).start(onClose);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 5,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 130 || g.vy > 0.55) closeSheet();
        else
          Animated.timing(translateY, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start();
      },
    })
  ).current;

  if (!mounted) return null;

  const filtered = data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal visible transparent animationType="none">
      {/* Tap outside */}
      <TouchableWithoutFeedback onPress={closeSheet}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>

      {/* DRAGGABLE FULLSCREEN SHEET */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{ transform: [{ translateY }] }}
        className="bg-white h-full rounded-t-3xl p-4"
      >
        <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <Text className="text-xl font-bold mb-4">{title}</Text>

          <TextInput
            className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />

          <ScrollView className="flex-1">
            {type === "job" && recent.length > 0 && (
              <View className="mb-4">
                <Text className="text-gray-500 font-semibold mb-2">
                  Recent Searches
                </Text>

                {recent.map((item, i) => (
                  <TouchableOpacity
                    key={`recent-${i}`}
                    className="py-3 flex-row items-center gap-4"
                    onPress={() => onSelect(item)}
                  >
                    <Ionicons name={iconName} size={18} />
                    <Text className="text-gray-800">{item}</Text>
                  </TouchableOpacity>
                ))}

                <View className="h-[1px] bg-gray-300 my-2" />
              </View>
            )}

            {filtered.length > 0 ? (
              filtered.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  className="py-4 flex-row items-center gap-4"
                  onPress={() => onSelect(item)}
                >
                  <Ionicons name={iconName} size={18} />
                  <Text className="text-gray-800">{item}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-gray-500 text-center mt-4">
                No results found
              </Text>
            )}
          </ScrollView>

          <TouchableOpacity
            className="bg-[#003554] rounded-xl p-4 mt-3"
            onPress={closeSheet}
          >
            <Text className="text-white text-center font-semibold">Close</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
};

export default SearchResultModal;