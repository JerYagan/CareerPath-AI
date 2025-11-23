import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ShareBox = ({ onPress }: { onPress: () => void }) => {
  return (
    <View className="bg-white p-4 rounded-xl shadow-sm mb-4 flex-row items-center">
      <View className="w-14 h-14 rounded-full bg-blue-200 items-center justify-center mr-3">
        <Text className="text-blue-800 font-bold text-base">You</Text>
      </View>

      <TouchableOpacity
        onPress={onPress}
        className="flex-1 bg-gray-100 p-3 rounded-lg"
      >
        <Text className="text-gray-500 text-base">
          Share your career experience…
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareBox;
