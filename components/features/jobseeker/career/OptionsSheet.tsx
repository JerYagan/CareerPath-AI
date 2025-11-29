import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DraggableSheet from "./DraggableSheet";

const OptionsSheet = ({ post, visible, onClose }: any) => {
  return (
    <DraggableSheet visible={visible} onClose={onClose} height="half">
      <View>
        {/* Title */}
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Post Options
        </Text>

        {/* Not Interested */}
        <TouchableOpacity className="py-4 flex-row items-center gap-3 border-b border-gray-200">
          <Ionicons name="eye-off-outline" size={22} color="#374151" />
          <Text className="text-gray-900 text-base">Not interested</Text>
        </TouchableOpacity>

        {/* Report */}
        <TouchableOpacity className="py-4 flex-row items-center gap-3 border-b border-gray-200">
          <Ionicons name="flag-outline" size={22} color="#374151" />
          <Text className="text-gray-900 text-base">Report</Text>
        </TouchableOpacity>

        {/* Other User Actions */}
        {post && post.name !== "You" && (
          <>
            <TouchableOpacity className="py-4 flex-row items-center gap-3 border-b border-gray-200">
              <Ionicons name="notifications-off-outline" size={22} color="#374151" />
              <Text className="text-gray-900 text-base">
                Mute {post.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="py-4 flex-row items-center gap-3">
              <Ionicons name="close-circle-outline" size={22} color="#dc2626" />
              <Text className="text-red-600 text-base">
                Block {post.name}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </DraggableSheet>
  );
};

export default OptionsSheet;