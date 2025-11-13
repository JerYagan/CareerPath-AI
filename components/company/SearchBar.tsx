import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
        <TouchableOpacity
          onPress={openFilter}
          className="flex-row items-center bg-gray-200 px-3 py-2 rounded-lg gap-2"
        >
          <Ionicons name="options-outline" size={18} color="#111" />
          <Text className="text-base text-gray-900">
            {selectedIndustry === "All"
              ? "Filters"
              : `Filter: ${selectedIndustry}`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-indigo-600 py-2 rounded-lg items-center justify-center"
          onPress={onSearch}
        >
          <Text className="text-white text-base font-medium">Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;