import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DraggableSheet from "./DraggableSheet";

const OptionsSheet = ({ post, visible, onClose }: any) => {
  return (
    <DraggableSheet visible={visible} onClose={onClose} height="half">
      <View>
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Post Options
        </Text>

        <TouchableOpacity className="py-4 border-b border-gray-200">
          <Text className="text-base text-gray-900">Not interested</Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-4 border-b border-gray-200">
          <Text className="text-base text-gray-900">Report</Text>
        </TouchableOpacity>

        {post && post.name !== "You" && (
          <>
            <TouchableOpacity className="py-4 border-b border-gray-200">
              <Text className="text-base text-gray-900">
                Mute {post.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="py-4">
              <Text className="text-base text-red-600">
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
