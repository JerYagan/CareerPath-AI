import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DraggableSheet from "@/components/ui/DraggableSheet";

type Props = {
  visible: boolean;
  onClose: () => void;
  industries: string[];
  selectedIndustry: string;
  setSelectedIndustry: (v: string) => void;
};

const FilterSheet = ({
  visible,
  onClose,
  industries,
  selectedIndustry,
  setSelectedIndustry,
}: Props) => {
  return (
    <DraggableSheet visible={visible} onClose={onClose} height="half">
      <View className="gap-4">

        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-semibold">Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-2xl">✕</Text>
          </TouchableOpacity>
        </View>

        {/* Industry */}
        <View className="gap-2">
          <Text className="text-base font-medium">Industry</Text>

          <View className="flex-row flex-wrap gap-2">
            {industries.map((item) => {
              const active = selectedIndustry === item;
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setSelectedIndustry(item)}
                  className={`px-3 py-2 rounded-full border ${
                    active
                      ? "bg-brandBlue border-brandBlue"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <Text
                    className={`text-base ${
                      active ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3 mt-4">
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-3 rounded-lg"
            onPress={() => {
              setSelectedIndustry("All");
              onClose();
            }}
          >
            <Text className="text-center text-base text-gray-800 font-medium">
              Clear
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-brandBlue py-3 rounded-lg"
            onPress={onClose}
          >
            <Text className="text-center text-base text-white font-medium">
              Apply
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </DraggableSheet>
  );
};

export default FilterSheet;