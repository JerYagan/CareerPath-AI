import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ChooseAccountType() {
  return (
    <View className="flex-1 bg-white px-6 pt-20">
      {/* HEADER */}
      <View className="flex items-center">
        <Image
            source={require("@/assets/images/peso-logo.png")}
            className="w-20 h-20 mb-3"
            resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-center text-[#1C388E]">
            Welcome to PESO Jobs PH
        </Text>
      </View>

      <Text className="text-gray-600 text-center mt-2">
        Choose your account type to get started
      </Text>

      {/* CARD OPTIONS */}
      <View className="mt-12 gap-5">
        {/* JOB SEEKER */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/auth/Register",
              params: { role: "jobseeker" },
            })
          }
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex-row items-center gap-4"
        >
          <View className="bg-[#1C388E]/10 p-4 rounded-xl">
            <Ionicons name="person-outline" size={30} color="#1C388E" />
          </View>

          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              Job Seeker
            </Text>
            <Text className="text-gray-600 text-sm">
              Find your dream job and get matched with the best employers.
            </Text>
          </View>
        </TouchableOpacity>

        {/* EMPLOYER */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/auth/Register",
              params: { role: "employer" },
            })
          }
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex-row items-center gap-4"
        >
          <View className="bg-[#1C388E]/10 p-4 rounded-xl">
            <Ionicons name="business-outline" size={30} color="#1C388E" />
          </View>

          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              Employer
            </Text>
            <Text className="text-gray-600 text-sm">
              Post jobs and find the perfect candidates for your company.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* SIGN IN LINK */}
      <View className="flex-row justify-center mt-10">
        <Text className="text-gray-600">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/auth/Login")}>
          <Text className="text-[#1C388E] font-semibold">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}