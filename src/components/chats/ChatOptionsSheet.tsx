import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DraggableSheet from "@/src/components/ui/DraggableSheet";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const ChatOptionsSheet: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <DraggableSheet visible={visible} onClose={onClose} height="half">
      <View>

        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Chat Options
        </Text>

        <TouchableOpacity className="flex-row items-center py-3">
          <Ionicons name="notifications-off-outline" size={22} color="#444" />
          <Text className="ml-3 text-base text-gray-700">Mute Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-3">
          <Ionicons name="archive-outline" size={22} color="#444" />
          <Text className="ml-3 text-base text-gray-700">Archive Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-3">
          <Ionicons name="trash-outline" size={22} color="#e11d48" />
          <Text className="ml-3 text-base text-red-600">Delete Chat</Text>
        </TouchableOpacity>

      </View>
    </DraggableSheet>
  );
};

export default ChatOptionsSheet;