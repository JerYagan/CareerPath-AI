import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function RegistrationSuccess() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-10">
      <Ionicons name="checkmark-circle-outline" size={90} color="#1C388E" />

      <Text className="text-3xl font-bold text-[#1C388E] mt-4">
        Registration Complete!
      </Text>

      <Text className="text-gray-600 text-center mt-2">
        Your employer account has been created successfully.
        You can now sign in to PESO Jobs PH.
      </Text>

      <TouchableOpacity
        onPress={() => router.replace("/auth/Login")}
        className="bg-[#1C388E] px-6 py-3 rounded-xl mt-10"
      >
        <Text className="text-white text-lg font-semibold">
          Continue to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}