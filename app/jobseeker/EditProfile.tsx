import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Switch } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfile = () => {
  const [name, setName] = useState("John Doe");
  const [position, setPosition] = useState("UI/UX Designer");
  const [location, setLocation] = useState("Quezon City, Philippines");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [phone, setPhone] = useState("09123456789");
  const [description, setDescription] = useState(
    "A passionate designer with a love for great user experiences."
  );

  const [showLocation, setShowLocation] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(false);

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* BACK BUTTON */}
        <View className="flex-row items-center mb-6">
          <Ionicons
            name="arrow-back"
            size={26}
            color="#1C388E"
            onPress={() => router.push("/jobseeker/Profile")}
          />
          <Text className="text-2xl font-bold ml-3">Edit Profile</Text>
        </View>

      <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 mb-6">
        <Text className="font-semibold text-gray-700 mb-1">Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="border border-gray-300 rounded-xl px-3 py-2 mb-4"
        />

        <Text className="font-semibold text-gray-700 mb-1">Position</Text>
        <TextInput
          value={position}
          onChangeText={setPosition}
          className="border border-gray-300 rounded-xl px-3 py-2 mb-4"
        />

        <Text className="font-semibold text-gray-700 mb-1">Location</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          className="border border-gray-300 rounded-xl px-3 py-2 mb-4"
        />

        <Text className="font-semibold text-gray-700 mb-1">Bio / About Me</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          className="border border-gray-300 rounded-xl px-3 py-3 h-28 mb-4"
        />
      </View>

      {/* VISIBILITY SETTINGS */}
      <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 mb-6">
        <Text className="text-lg font-semibold mb-3 text-gray-900">
          Privacy Controls
        </Text>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-700">Show my location</Text>
          <Switch value={showLocation} onValueChange={setShowLocation} />
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-700">Show my email</Text>
          <Switch value={showEmail} onValueChange={setShowEmail} />
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-700">Show my phone number</Text>
          <Switch value={showPhone} onValueChange={setShowPhone} />
        </View>
      </View>

      <CustomButton
        title="Save Changes"
        icon="save-outline"
        iconColor="white"
        className="bg-brandBlue gap-2"
        textClassName="text-white"
        onPress={() => router.back()}
      />
    </ScrollView>
  );
};

export default EditProfile;