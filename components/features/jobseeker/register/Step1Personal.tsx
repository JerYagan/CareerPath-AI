import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRegister } from "../../../../context/RegisterContext";

interface Props {
  onNext: () => void;
}

const Step1Personal = ({ onNext }: Props) => {
  const { data, update } = useRegister();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(
      data.fullName.trim() !== "" &&
        data.email.trim() !== "" &&
        data.password.trim() !== ""
    );
  }, [data]);

  return (
    <View>
      <Text className="font-semibold text-lg mb-4">Personal Details</Text>

      <TextInput
        placeholder="Full Name"
        value={data.fullName}
        onChangeText={(t) => update({ fullName: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Email"
        value={data.email}
        onChangeText={(t) => update({ email: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        secureTextEntry
        placeholder="Password"
        value={data.password}
        onChangeText={(t) => update({ password: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Phone Number"
        value={data.phone}
        onChangeText={(t) => update({ phone: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Location"
        value={data.location}
        onChangeText={(t) => update({ location: t })}
        className="bg-gray-100 p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Professional Summary"
        multiline
        value={data.summary}
        onChangeText={(t) => update({ summary: t })}
        className="bg-gray-100 p-3 rounded-lg h-24 mb-4"
      />

      <TouchableOpacity
        disabled={!valid}
        onPress={onNext}
        className={`p-4 rounded-lg ${valid ? "bg-black" : "bg-gray-400"}`}
      >
        <Text className="text-center text-white font-semibold">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step1Personal;