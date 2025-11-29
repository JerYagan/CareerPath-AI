import { View, TextInput, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";

type Props = {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onAttach?: () => void;
  onOptions?: () => void;
};

export default function ChatInput({ input, setInput, onSend, onAttach, onOptions }: Props) {
  const handleSend = () => {
    if (!input.trim()) return;
    onSend();
  };

  return (
    <View className="flex-row items-center p-3 border-t border-gray-200 bg-white">
      {/* Attachment button */}
      <TouchableOpacity
        onPress={onAttach}
        className="px-3 py-2 rounded-full items-center justify-center mr-2 bg-gray-100"
      >
        <Ionicons name="attach-outline" size={24} color="#1C388E" />
      </TouchableOpacity>


      {/* Text input */}
      <TextInput
        className="flex-1 bg-gray-100 rounded-xl px-4 py-3 mr-2 text-gray-900"
        placeholder="Type a message..."
        placeholderTextColor="#9ca3af"
        value={input}
        onChangeText={setInput}
        multiline
      />

      {/* Send button */}
      <TouchableOpacity
        onPress={handleSend}
        className="py-2 px-4 rounded-full items-center justify-center"
      >
        <Ionicons name="send" size={20} color="#1C388E" />
      </TouchableOpacity>
    </View>
  );
}