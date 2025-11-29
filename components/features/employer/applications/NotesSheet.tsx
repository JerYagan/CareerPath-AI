import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import DraggableSheet from "@/components/ui/DraggableSheet";
import CustomButton from "@/components/ui/CustomButton";

export default function NotesSheet({ visible, onClose, notes, onSave }: any) {
  const [text, setText] = useState("");

  if (!visible) return null;

  return (
    <DraggableSheet visible={visible} onClose={onClose} height="large">
      <ScrollView className="px-5 pb-20">

        <Text className="text-xl font-semibold mt-4">Applicant Notes</Text>

        {notes.map((n: any) => (
          <View key={n.id} className="bg-gray-100 rounded-xl p-4 mt-3">
            <Text className="text-gray-800">{n.text}</Text>
            <Text className="text-gray-400 text-xs mt-1">{n.date}</Text>
          </View>
        ))}

        <TextInput
          placeholder="Write a note..."
          value={text}
          onChangeText={setText}
          className="mt-5 bg-white rounded-xl p-4 border border-gray-200"
          multiline
        />

        <CustomButton
          title="Save Note"
          icon="save-outline"
          className="mt-4 bg-brandBlue rounded-xl py-3"
          textClassName="text-white"
          onPress={() => {
            onSave(text);
            setText("");
          }}
        />

      </ScrollView>
    </DraggableSheet>
  );
}