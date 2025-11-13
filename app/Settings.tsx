import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView className="flex-1 bg-white p-4">

      {/* Profile Header */}
      <View className="items-center mb-6 mt-6">
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-semibold mt-3">John Doe</Text>
        <Text className="text-gray-500">johndoe@gmail.com</Text>
      </View>

      {/* Section: Account */}
      <Text className="text-gray-400 text-sm mb-2">ACCOUNT</Text>
      <View className="bg-gray-100 rounded-xl">
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <Ionicons name="person-outline" size={22} className="mr-3" />
          <Text className="flex-1 text-base">Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-4">
          <Ionicons name="lock-closed-outline" size={22} className="mr-3" />
          <Text className="flex-1 text-base">Change Password</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>
      </View>

      {/* Section: Preferences */}
      <Text className="text-gray-400 text-sm mb-2 mt-6">PREFERENCES</Text>
      <View className="bg-gray-100 rounded-xl">
        <View className="flex-row items-center p-4 border-b border-gray-200">
          <Ionicons name="notifications-outline" size={22} className="mr-3" />
          <Text className="flex-1 text-base">Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        <TouchableOpacity className="flex-row items-center p-4">
          <Ionicons name="language-outline" size={22} className="mr-3" />
          <Text className="flex-1 text-base">Language</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>
      </View>

      {/* Section: Support */}
      <Text className="text-gray-400 text-sm mb-2 mt-6">SUPPORT</Text>
      <View className="bg-gray-100 rounded-xl">
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <Ionicons name="help-circle-outline" size={22} className="mr-3" />
          <Text className="flex-1 text-base">Help Center</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-4">
          <Ionicons name="document-text-outline" size={22} className="mr-3" />
          <Text className="flex-1 text-base">Terms & Conditions</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity className="bg-red-500 py-3 rounded-xl mt-8 mb-14">
        <Text className="text-center text-white font-semibold text-base">
          Log Out
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default Settings;