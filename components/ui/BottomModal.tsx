import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  query: string;
  setQuery: (text: string) => void;
  onSelect: (value: string) => void;
  data: string[];
  type: "job" | "location"; // new prop to decide icon
  recent?: string[]; // optional: recent searches for jobs
};

const BottomModal = ({
  visible,
  onClose,
  title,
  query,
  setQuery,
  onSelect,
  data,
  type,
  recent = [],
}: Props) => {
  if (!visible) return null;

  const filtered = data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const iconName = type === "job" ? "search" : "location-outline";

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
              style={{ height: "85%" }}
            >
              <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

              <Text className="text-xl font-bold mb-4">{title}</Text>

              <TextInput
                className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={query}
                onChangeText={setQuery}
              />

              <ScrollView className="flex-1">
                {/* Recent Searches (only for jobs) */}
                {type === "job" && recent.length > 0 && (
                  <View className="mb-4">
                    <Text className="text-gray-500 font-semibold mb-2">
                      Recent Searches
                    </Text>
                    {recent.map((item, i) => (
                      <TouchableOpacity
                        key={`recent-${i}`}
                        className="py-3 flex-row items-center gap-4"
                        onPress={() => onSelect(item)}
                      >
                        <Ionicons name={iconName} size={18} />
                        <Text className="text-gray-800">{item}</Text>
                      </TouchableOpacity>
                    ))}
                    <View className="h-[1px] bg-gray-300 my-2" />
                  </View>
                )}

                {/* Filtered search results */}
                {filtered.length > 0 ? (
                  filtered.map((item, i) => ( 
                    <TouchableOpacity
                      key={i}
                      className="py-4 flex-row items-center gap-4"
                      onPress={() => onSelect(item)}
                    >
                      <Ionicons name={iconName} size={18} />
                      <Text className="text-gray-800">{item}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text className="text-gray-500 text-center mt-4">
                    No results found
                  </Text>
                )}
              </ScrollView>

              <TouchableOpacity
                className="bg-[#003554] rounded-xl p-4 mt-3"
                onPress={onClose}
              >
                <Text className="text-white text-center font-semibold">
                  Close
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomModal;