import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import * as Notifications from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";

const brandBlue = "#1C388E";

const Settings = () => {
  const router = useRouter();
  const [notifEnabled, setNotifEnabled] = useState(true);

  // Logout handler
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/auth/Login"),
      },
    ]);
  };

  // Test push notification
  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "PESO Jobs PH",
        body: "This is a test notification!",
      },
      trigger: null,
    });
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }} className="bg-white">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View className="items-center mb-8">
          <Image
            source={{ uri: "https://i.pravatar.cc/190" }}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-xl font-semibold mt-3 text-gray-900">
            Jane Doe
          </Text>
          <Text className="text-gray-500">jane.doe@gmail.com</Text>
        </View>

        {/* ACCOUNT SECTION */}
        <View className="mb-6">
          <Text className="mb-2 tracking-wide text-gray-500">ACCOUNT</Text>

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Ionicons name="person-outline" size={22} color={brandBlue} />
              <Text className="flex-1 ml-3 text-gray-800">Edit Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4">
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={brandBlue}
              />
              <Text className="flex-1 ml-3 text-gray-800">Change Password</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* PREFERENCES SECTION */}
        <View className="mb-6">
          <Text className="mb-2 tracking-wide text-gray-500">PREFERENCES</Text>

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <View className="flex-row items-center p-4 border-b border-gray-100">
              <Ionicons
                name="notifications-outline"
                size={22}
                color={brandBlue}
              />
              <Text className="flex-1 ml-3 text-gray-800">Notifications</Text>
              <Switch value={notifEnabled} onValueChange={setNotifEnabled} />
            </View>
          </View>
        </View>

        {/* PRIVACY & SECURITY SECTION */}
        <View className="mb-6">
          <Text className="mb-2 tracking-wide text-gray-500">
            PRIVACY & SECURITY
          </Text>

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={brandBlue}
              />
              <Text className="flex-1 ml-3 text-gray-800">Change Password</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={brandBlue}
              />
              <Text className="flex-1 ml-3 text-gray-800">
                Privacy Settings
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4">
              <Ionicons name="key-outline" size={22} color={brandBlue} />
              <Text className="flex-1 ml-3 text-gray-800">
                Two-Factor Authentication
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* DATA & STORAGE SECTION */}
        <View className="mb-6">
          <Text className="mb-2 tracking-wide text-gray-500">
            DATA & STORAGE
          </Text>

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Ionicons name="download-outline" size={22} color={brandBlue} />
              <Text className="flex-1 ml-3 text-gray-800">
                Download My Data
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4">
              <Ionicons name="trash-outline" size={22} color={brandBlue} />
              <Text className="flex-1 ml-3 text-gray-800">Clear Cache</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SUPPORT SECTION */}
        <View className="mb-6">
          <Text className="mb-2 tracking-wide text-gray-500">SUPPORT</Text>

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Ionicons
                name="help-circle-outline"
                size={22}
                color={brandBlue}
              />
              <Text className="flex-1 ml-3 text-gray-800">Help Center</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4">
              <Ionicons
                name="document-text-outline"
                size={22}
                color={brandBlue}
              />
              <Text className="flex-1 ml-3 text-gray-800">
                Terms & Conditions
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* TEST NOTIFICATION BUTTON */}
        <CustomButton
          icon="notifications"
          iconColor="white"
          title="Send Test Notification"
          onPress={sendTestNotification}
          className="bg-[#1C388E] py-4 rounded-xl mb-4"
          textClassName="text-white text-base ml-2"
        />

        {/* LOGOUT BUTTON */}
        <CustomButton
          icon="log-out-outline"
          iconColor="white"
          title="Log Out"
          onPress={handleLogout}
          className="bg-red-500 py-4 rounded-xl"
          textClassName="text-white text-base ml-2"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
