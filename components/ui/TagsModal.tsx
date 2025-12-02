import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import DraggableSheet from "@/components/ui/DraggableSheet";
import CustomButton from "@/components/ui/CustomButton";

type Props = {
  visible: boolean;
  onClose: () => void;
  skills: string[];
};

const brandBlue = "#1C388E";

const TagsModal: React.FC<Props> = ({ visible, onClose, skills }) => {
  return (
    <DraggableSheet visible={visible} onClose={onClose} height="half">
      <Text className="text-xl font-bold text-gray-900 mb-4">
        All Required Skills / Tags
      </Text>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex-row flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <View
              key={idx}
              className="py-2 px-3 rounded-full bg-gray-200"
            >
              <Text className="text-gray-700 font-semibold">{skill}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <CustomButton
        title="Close"
        icon="close-outline"
        className="bg-brandBlue rounded-xl mt-4"
        textClassName="text-white"
        iconColor="white"
        onPress={onClose}
      />
    </DraggableSheet>
  );
};

export default TagsModal;