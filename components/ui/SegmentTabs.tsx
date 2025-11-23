import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";

interface TabsProps<OptionType extends string> {
  options: readonly OptionType[];
  labels: Record<OptionType, string>;
  selected: OptionType;
  setSelected: React.Dispatch<React.SetStateAction<OptionType>>;
  activeColor?: string;
  inactiveColor?: string;
}

const SegmentTabs = <OptionType extends string>({
  options,
  labels,
  selected,
  setSelected,
  activeColor = "#2563eb",
  inactiveColor = "#9ca3af",
}: TabsProps<OptionType>) => {
  const [tabWidth, setTabWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const selectedIndex = options.indexOf(selected);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: selectedIndex * tabWidth,
      useNativeDriver: true,
      tension: 68,
      friction: 12,
    }).start();
  }, [selectedIndex, tabWidth]);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setTabWidth(width / options.length);
  };

  return (
    <View className="mb-4">
      <View className="flex-row justify-around" onLayout={handleLayout}>
        {options.map((option) => {
          const isActive = selected === option;
          return (
            <TouchableOpacity
              key={option}
              onPress={() => setSelected(option)}
              className="flex-1 items-center py-3"
              activeOpacity={0.7}
            >
              <Text
                className="font-bold"
                style={{ color: isActive ? activeColor : inactiveColor }}
              >
                {labels[option]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {/* Animated indicator */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: tabWidth,
          height: 2,
          backgroundColor: activeColor,
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

export default SegmentTabs;