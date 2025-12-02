import React from "react";
import { View, TextInput, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/src/components/ui/CustomButton";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (v: string) => void;
  selectedIndustry: string;
  onSearch: () => void;
  openFilter: () => void;
}

const SearchBar = ({
  searchInput,
  setSearchInput,
  selectedIndustry,
  onSearch,
  openFilter,
}: SearchBarProps) => {
  return (
    <View className="bg-white rounded-xl p-4 mb-5 shadow-sm border border-gray-100 gap-3">

      {/* Search input */}
      <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 gap-2">
        <Ionicons name="search" size={18} color="#666" />
        <TextInput
          className="flex-1 text-base"
          placeholder="Search companies..."
          value={searchInput}
          onChangeText={setSearchInput}
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
      </View>

      {/* Buttons */}
      <View className="flex-row items-center gap-3">

        <CustomButton
          icon="options-outline"
          title={
            selectedIndustry === "All"
              ? "Filters"
              : `Filter: ${selectedIndustry}`
          }
          className="bg-gray-200 flex-row gap-2 flex-1"
          onPress={openFilter}
        />

        <CustomButton
          title="Search"
          className="bg-brandBlue flex-1"
          textClassName="text-white"
          onPress={onSearch}
        />

      </View>
    </View>
  );
};

export default SearchBar;