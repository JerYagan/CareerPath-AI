import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SegmentTabs from "@/components/ui/SegmentTabs";
import candidatesData from "@/assets/data/employerData/candidates.json";
import MetricCard from "@/components/features/employer/dashboard/MetricCard";
import CandidateCard from "@/components/features/employer/candidates/CandidateCard";


const options = ["saved", "selected", "pending", "archived"] as const;

const labels = {
  saved: "Saved",
  selected: "Selected",
  pending: "Pending",
  archived: "Archived",
};

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

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<(typeof options)[number]>("saved");
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
      <Text className="text-gray-500 mb-6">
        Overview of your recruitment activities and performance metrics
      </Text>

      {/* TOP CARDS */}
      <View className="flex-row flex-wrap justify-between mb-6">
        <MetricCard label="Active Job Posts" value="12" icon="briefcase-outline" trend="+2 this month" />
        <MetricCard label="Total Applicants" value="247" icon="people-outline" trend="+18% this week" />
        <MetricCard label="Profile Views" value="1,834" icon="eye-outline" trend="+12% this month" />
        <MetricCard label="Success Rate" value="68%" icon="trending-up-outline" trend="+5% from last month" />
      </View>

      {/* ⬇️ YOUR REUSABLE TABS HERE */}
      <SegmentTabs
        options={options}
        labels={labels}
        selected={selectedTab}
        setSelected={setSelectedTab}
      />

      {/* CANDIDATE LIST */}
      {filtered.map((item) => (
        <CandidateCard key={item.id} item={item} />
      ))}

      {selectedTab === "selected" && (
        <Text className="text-gray-400 text-center mt-6">No selected candidates yet.</Text>
      )}

      {selectedTab === "pending" && (
        <Text className="text-gray-400 text-center mt-6">No pending reviews.</Text>
      )}

      {selectedTab === "archived" && (
        <Text className="text-gray-400 text-center mt-6">No archived profiles.</Text>
      )}
    </ScrollView>
  );
};

export default Dashboard;