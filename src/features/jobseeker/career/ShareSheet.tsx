import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DraggableSheet from "./DraggableSheet";

const ShareSheet = ({ visible, onClose }: any) => {
  return (
    <DraggableSheet visible={visible} onClose={onClose} height="half">
      <View>
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Share Post
        </Text>

        <TouchableOpacity className="flex-row items-center mb-4">
          <Ionicons name="link-outline" size={26} color="#444" />
          <Text className="text-base ml-3 text-gray-900">Copy link</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center mb-4">
          <Ionicons name="logo-linkedin" size={26} color="#0a66c2" />
          <Text className="text-base ml-3 text-gray-900">
            Share to LinkedIn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center mb-4">
          <Ionicons name="chatbubble-ellipses-outline" size={26} color="#444" />
          <Text className="text-base ml-3 text-gray-900">
            Share via Messages
          </Text>
        </TouchableOpacity>
      </View>
    </DraggableSheet>
  );
};

export default ShareSheet;
