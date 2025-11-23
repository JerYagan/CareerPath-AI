import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CandidateCard from "@/components/features/employer/candidates/CandidateCard";
import candidatesData from "@/assets/data/employerData/candidates.json";

type Candidate = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  experience: string;
  location: string;
  email: string;
  status: string;
};

const STATUS_FILTERS = [
  "All",
  "Available",
  "Open to Work",
  "Not Available",
] as const;

type FilterKey = (typeof STATUS_FILTERS)[number];

const Candidates = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("All");

  const candidates: Candidate[] = candidatesData.candidates;

  const filtered = useMemo(() => {
    const term = search.toLowerCase();

    return candidates.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(term) ||
        c.role.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.skills.some((s) => s.toLowerCase().includes(term));

      const matchesFilter = filter === "All" || c.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
      <Text className="text-gray-500 mb-4">
        Discover and connect with potential talent.
      </Text>

      {/* Search Bar */}
      <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-3 shadow-sm">
        <Ionicons name="search-outline" size={20} color="#9ca3af" />
        <TextInput
          className="flex-1 ml-2 text-gray-900"
          placeholder="Search name, skills, or role"
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Status Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        <View className="flex-row">
          {STATUS_FILTERS.map((status) => {
            const isActive = filter === status;
            return (
              <TouchableOpacity
                key={status}
                onPress={() => setFilter(status)}
                className={`px-4 py-2 rounded-full mr-2 border ${
                  isActive
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`font-medium ${
                    isActive ? "text-white" : "text-gray-700"
                  }`}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Candidate List */}
      {filtered.map((item) => (
        <CandidateCard key={item.id} item={item} />
      ))}

      {/* Empty */}
      {filtered.length === 0 && (
        <View className="mt-10 items-center">
          <Ionicons name="people-outline" size={40} color="#9ca3af" />
          <Text className="mt-3 font-semibold text-gray-700">
            No candidates found
          </Text>
          <Text className="text-gray-500 mt-1 text-center">
            Try adjusting your search or filters.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Candidates;