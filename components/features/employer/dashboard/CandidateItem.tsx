import React from "react";
import { View, Text } from "react-native";
import CustomButton from "@/components/ui/CustomButton";

type CandidateItemProps = {
  initials: string;
  name: string;
  role: string;
  savedAgo: string;
};

const CandidateItem = ({
  initials,
  name,
  role,
  savedAgo,
}: CandidateItemProps) => {
  return (
    <View className="bg-white rounded-2xl p-5 mb-4 shadow-[0px_4px_14px_rgba(0,0,0,0.06)]">
      <View className="flex-row items-center justify-between w-full">
        
        {/* Avatar */}
        <View className="w-14 h-14 rounded-full bg-blue-600 justify-center items-center shadow-sm">
          <Text className="text-white font-extrabold text-lg">{initials}</Text>
        </View>

        {/* Info */}
        <View className="flex-1 ml-4 self-start">
          <Text className="font-semibold text-gray-900">{name}</Text>
          <View className="self-start px-2 py-[2px] bg-blue-100 rounded-full mt-1 mb-[2px]">
            <Text className="text-blue-700 text-sm font-medium">{role}</Text>
          </View>
        </View>
        <Text className="text-gray-400 text-sm self-start">{savedAgo}</Text>
      </View>

      {/* Actions */}
      <View className="flex-row justify-between items-center mt-4 gap-3">
        
        {/* View Profile */}
        <CustomButton
          title="View Profile"
          className="bg-blue-600 w-1/2 rounded-xl gap-1"
          textClassName="text-white"
          iconColor="white"
          icon="eye-outline"
          iconSize={16}
        />

        {/* Contact */}
        <CustomButton
          title="Contact"
          className="rounded-xl border border-gray-300 flex-1 gap-1"
          textClassName="text-gray-700"
          icon="chatbubble-ellipses-outline"
          iconSize={16}
        />

      </View>
    </View>
  );
};

export default CandidateItem;