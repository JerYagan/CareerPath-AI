import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  notification: {
    id: number | string;
    title: string;
    message: string;
    time: string;
    additionalInfo?: string;
  } | null;
};

const NotificationModal = ({ visible, onClose, notification }: Props) => {
  if (!visible || !notification) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/40 justify-end">
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="bg-white rounded-t-3xl p-4"
              style={{ height: "60%" }}
            >
              {/* Top handle */}
              <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

              {/* Title */}
              <Text className="text-xl font-bold mb-2">{notification.title}</Text>

              {/* Scrollable content */}
              <ScrollView showsVerticalScrollIndicator={false} className="flex-1 mb-4">
                <Text className="text-gray-700 mb-4">{notification.message}</Text>
                {notification.additionalInfo && (
                  <Text className="text-gray-500 mb-4">{notification.additionalInfo}</Text>
                )}
                <Text className="text-gray-400 text-sm">
                  {new Date(notification.time).toLocaleString()}
                </Text>
              </ScrollView>

              {/* Close button */}
              <TouchableOpacity
                className="bg-[#003554] rounded-xl p-4 mt-3"
                onPress={onClose}
              >
                <Text className="text-white text-center font-semibold">Close</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NotificationModal;