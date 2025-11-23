import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface UploadPhotoModalProps {
  visible: boolean;
  onClose: () => void;
  onPickFromGallery: () => void;
  onTakePhoto: () => void;
  onRemovePhoto: () => void;
}

const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  visible,
  onClose,
  onPickFromGallery,
  onTakePhoto,
  onRemovePhoto,
}) => {
  if (!visible) return null;

  return (
    <Modal visible transparent animationType="fade">
      <View className="flex-1 bg-black/30 justify-end">
        <View className="bg-white rounded-t-2xl p-5">
          <Text className="text-lg font-semibold mb-4">Profile Picture</Text>

          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={onPickFromGallery}
          >
            <Ionicons name="images-outline" size={22} color="#4B5563" />
            <Text className="ml-3 text-gray-800 text-base">
              Choose from gallery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={onTakePhoto}
          >
            <Ionicons name="camera-outline" size={22} color="#4B5563" />
            <Text className="ml-3 text-gray-800 text-base">Take a photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={onRemovePhoto}
          >
            <Ionicons name="trash-outline" size={22} color="#DC2626" />
            <Text className="ml-3 text-red-600 text-base">Remove photo</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-3 items-center" onPress={onClose}>
            <Text className="text-gray-500 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UploadPhotoModal;
