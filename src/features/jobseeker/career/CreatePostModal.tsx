import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/src/components/ui/CustomButton";

const CreatePostModal = ({
  visible,
  onClose,
  newPostText,
  newPostTags,
  setNewPostText,
  setNewPostTags,
  attachedImage,
  onAttachImage,
  onSubmit,
}: any) => {
  const translateY = useRef(new Animated.Value(900)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : 900,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50">

      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>

      <Animated.View
        style={{ transform: [{ translateY }] }}
        className="absolute bottom-0 left-0 right-0 bg-white h-full overflow-hidden"
      >

        {/* HEADER */}
        <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold ml-3 text-gray-900">
            Create Post
          </Text>
        </View>

        {/* BODY */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16 }}
        >
          <TextInput
            multiline
            placeholder="Write something..."
            placeholderTextColor="#9CA3AF"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base min-h-[120px]"
            value={newPostText}
            onChangeText={setNewPostText}
          />

          <TextInput
            placeholder="Add tags (#career #dev #advice)"
            placeholderTextColor="#9CA3AF"
            className="border border-gray-300 rounded-xl px-4 py-3 text-base mt-3"
            value={newPostTags}
            onChangeText={setNewPostTags}
          />

          <TouchableOpacity
            onPress={onAttachImage}
            className="flex-row items-center mt-4"
          >
            <Ionicons name="image-outline" size={22} color="#2563eb" />
            <Text className="text-base text-blue-600 ml-2">
              {attachedImage ? "Change image" : "Add image (optional)"}
            </Text>
          </TouchableOpacity>

          {attachedImage && (
            <View className="w-full h-32 bg-gray-200 rounded-xl mt-3 items-center justify-center">
              <Text className="text-gray-600">Image attached (placeholder)</Text>
            </View>
          )}

          {/* POST BUTTON with CustomButton */}
          <CustomButton
            title="Post"
            onPress={onSubmit}
            className={`mt-6 ${newPostText.trim() ? "bg-blue-600" : "bg-blue-300"}`}
            textClassName="text-white font-semibold text-base"
          />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default CreatePostModal;
