import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
} from "react-native";
import CustomButton from "@/src/components/ui/CustomButton";
import SearchBar from "@/src/components/ui/SearchBar";

const brandBlue = "#1C388E";

export type FilterSection<T extends string> = {
  label: string;
  items: T[];
  state: T[];
  setState: (v: T[]) => void;
};

type FilterModalProps<T extends string> = {
  visible: boolean;
  onClose: () => void;

  title?: string;
  sections: FilterSection<T>[];

  showSearch?: boolean;
  onApply: () => void;
  onReset: () => void;
};

export default function FilterModal<T extends string>({
  visible,
  onClose,
  title = "Filters",
  sections,
  showSearch = false,
  onApply,
  onReset,
}: FilterModalProps<T>) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = useState("");

  const [atBottom, setAtBottom] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      translateY.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const onScroll = (e: any) => {
    const { contentSize, layoutMeasurement, contentOffset } = e.nativeEvent;

    const nearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    setAtBottom(nearBottom);
  };

  const row = (label: string, items: T[], state: T[], setter: (v: T[]) => void) => {
    const filtered = search
      ? items.filter((it) => it.toLowerCase().includes(search.toLowerCase()))
      : items;

    return (
      <View className="mt-6">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          {label}
        </Text>

        <View className="flex-row flex-wrap gap-2">
          {filtered.map((item) => {
            const active = state.includes(item);
            return (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  if (active) setter(state.filter((x) => x !== item));
                  else setter([...state, item]);
                }}
                className={`px-4 py-2 rounded-full border ${
                  active
                    ? "bg-brandBlue border-brandBlue"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text
                  className={`font-medium ${
                    active ? "text-white" : "text-gray-700"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  // DRAG LOGIC
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) translateY.setValue(gesture.dy);
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 120) {
          Animated.timing(translateY, {
            toValue: 600,
            duration: 180,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* BACKDROP */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="absolute inset-0 bg-black/40"
        />
      </TouchableWithoutFeedback>

      {/* SHEET */}
      <Animated.View
        style={{
          transform: [{ translateY }],
        }}
        className="absolute bottom-0 left-0 right-0 bg-white pb-10 max-h-[85%]"
      >
        {/* DRAG INDICATOR */}
        <Animated.View {...panResponder.panHandlers} className="w-full px-6 py-4 mb-2">
          <View className="w-14 h-1.5 bg-gray-300 self-center rounded-full" />
        </Animated.View>

        {/* TITLE */}
        <Text className="text-2xl font-bold text-gray-900 px-6">{title}</Text>

        {/* SEARCH */}
        {showSearch && (
          <View className="px-6 mt-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search filters..."
              showFilter={false}
            />
          </View>
        )}

        {/* LIST */}
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          className="px-6"
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {sections.map((sec, index) => (
            <View key={`${sec.label}-${index}`}>
              {row(sec.label, sec.items, sec.state, sec.setState)}
            </View>
          ))}
        </ScrollView>

        {/* FOOTER BUTTONS */}
        <View
          className={`${
            atBottom ? "px-6 mt-4 bottom-4" : "absolute bottom-6 left-0 right-0 px-6"
          }`}
        >
          <View className="flex-row gap-3">
            <CustomButton
              title="Reset"
              icon="refresh-outline"
              className="flex-1 bg-gray-200 py-3 rounded-xl gap-2"
              textClassName="text-gray-700 font-semibold"
              iconColor="#4b5563"
              onPress={onReset}
            />
            <CustomButton
              title="Apply"
              icon="checkmark-circle-outline"
              className="flex-1 bg-brandBlue py-3 rounded-xl gap-2"
              textClassName="text-white font-semibold"
              iconColor="white"
              onPress={onApply}
            />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}