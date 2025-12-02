import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  user: any;
  onEditPress: () => void;
  onChangePhoto: () => void;
}

const ProfileHeader: React.FC<Props> = ({
  user,
  onEditPress,
  onChangePhoto,
}) => {
  return (
    <View className="w-full items-center bg-gradient-to-b from-brandBlue to-brandBlue/70 rounded-b-3xl shadow-md px-4 pt-10 pb-6 h-[260px]">
      
      {/* Profile Picture */}
      <View className="relative">
        <Image
          source={{ uri: "https://i.pravatar.cc/190" }}
          className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
        />

        {/* Edit Photo Button */}
        <TouchableOpacity
          onPress={onChangePhoto}
          className="absolute bottom-1 right-1 bg-black/70 p-2 rounded-full"
        >
          <Ionicons name="camera-outline" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text className="text-3xl font-bold text-brandBlue mt-4">
        {user.name}
      </Text>

      {user.position && (
        <Text className="text-brandBlue text-base mt-1">
          {user.position}
        </Text>
      )}

      {/* Edit Button */}
      <TouchableOpacity
        onPress={onEditPress}
        className="mt-3 bg-white py-2 px-4 rounded-full flex-row items-center gap-2 shadow-md"
      >
        <Ionicons name="pencil-outline" size={18} color="#1C388E" />
        <Text className="text-brandBlue font-semibold">Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;