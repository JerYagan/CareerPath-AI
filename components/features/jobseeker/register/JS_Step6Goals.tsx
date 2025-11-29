import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import CustomButton from "@/components/ui/CustomButton";

const suggestions = [
  "Find first job",
  "Career change",
  "Upskill & growth",
  "Better salary",
];

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function JS_Step6CareerGoals({ onBack, onNext }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState("");

  const toggleGoal = (goal: string) => {
    setSelected((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  const validate = () => {
    if (selected.length === 0 && !custom.trim()) {
      setError("Please choose at least one goal or add your own.");
      return false;
    }
    return true;
  };

  const handleNext = () => validate() && onNext();

  return (
    <View>
      <Text className="text-lg font-bold text-[#1C388E]">Career Goals</Text>
      <Text className="text-gray-500 mb-4">
        Select your main goals
      </Text>

      {/* SUGGESTED GOALS */}
      {suggestions.map((g, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => toggleGoal(g)}
          className={`p-4 rounded-xl border mt-4 ${
            selected.includes(g)
              ? "border-[#1C388E] bg-[#1C388E]/10"
              : "border-gray-300 bg-white"
          }`}
        >
          <Text
            className={`font-medium ${
              selected.includes(g) ? "text-[#1C388E]" : "text-gray-700"
            }`}
          >
            {g}
          </Text>
        </TouchableOpacity>
      ))}

      {/* CUSTOM GOAL */}
      <View className="mt-6">
        <TextInput
          value={custom}
          onChangeText={(t) => {
            setCustom(t);
            setError("");
          }}
          placeholder="Add your own (optional)"
          className="bg-white p-4 rounded-xl border border-gray-300"
        />
      </View>

      {error !== "" && (
        <Text className="text-red-500 text-xs mt-2">{error}</Text>
      )}

      {/* BUTTONS */}
      <View className="flex-row mt-6 mb-10">
        <CustomButton
          title="Back"
          onPress={onBack}
          className="flex-1 bg-gray-200 mr-3"
          textClassName="text-gray-600"
        />

        <CustomButton
          title="Next"
          onPress={handleNext}
          className="flex-1 bg-[#1C388E]"
          textClassName="text-white"
        />
      </View>
    </View>
  );
}