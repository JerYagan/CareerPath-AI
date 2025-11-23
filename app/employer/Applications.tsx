import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, router } from "expo-router";

type ApplicationStatus =
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Not Qualified"
  | "Accepted";

type Application = {
  id: string;
  name: string;
  role: string;
  submittedAgo: string;
  status: ApplicationStatus | string;
  experience: string;
  email: string;
};

const APPLICATION_DATA: Application[] = [
  {
    id: "APP-001",
    name: "Juan Dela Cruz",
    role: "Frontend Developer",
    submittedAgo: "3 days ago",
    status: "Under Review",
    experience: "2 years",
    email: "juan@email.com",
  },
  {
    id: "APP-002",
    name: "Maria Santos",
    role: "UI/UX Designer",
    submittedAgo: "1 week ago",
    status: "Shortlisted",
    experience: "3 years",
    email: "maria@email.com",
  },
  {
    id: "APP-003",
    name: "Pedro Reyes",
    role: "Marketing Specialist",
    submittedAgo: "2 days ago",
    status: "Interview",
    experience: "1 year",
    email: "pedro@email.com",
  },
  {
    id: "APP-004",
    name: "Ana Cruz",
    role: "Backend Developer",
    submittedAgo: "5 days ago",
    status: "Not Qualified",
    experience: "4 years",
    email: "ana@email.com",
  },
  {
    id: "APP-005",
    name: "John Smith",
    role: "Project Manager",
    submittedAgo: "4 days ago",
    status: "Accepted",
    experience: "5 years",
    email: "john@email.com",
  },
];

const STATUS_TABS = [
  "All",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Not Qualified",
  "Accepted",
] as const;

type StatusTab = (typeof STATUS_TABS)[number];

const Applications = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<StatusTab>("All");

  const filtered = useMemo(() => {
    const term = search.toLowerCase();

    return APPLICATION_DATA.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(term) ||
        item.role.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term);

      const matchesStatus = activeTab === "All" || item.status === activeTab;

      return matchesSearch && matchesStatus;
    });
  }, [activeTab, search]);

  return (
    <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
      {/* TITLE */}
      <Text className="text-2xl font-bold text-gray-900 mb-1">
        Applications
      </Text>
      <Text className="text-gray-500 mb-4">
        Review and manage applicants for your job posts.
      </Text>

      {/* SEARCH BAR */}
      <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm mb-3">
        <Ionicons name="search-outline" size={20} color="#9ca3af" />
        <TextInput
          className="flex-1 ml-2 text-gray-900"
          placeholder="Search applicant name, role, or email"
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* STATUS TABS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        <View className="flex-row">
          {STATUS_TABS.map((status) => {
            const isActive = activeTab === status;
            return (
              <TouchableOpacity
                key={status}
                onPress={() => setActiveTab(status)}
                className={`px-4 py-2 rounded-full mr-2 border ${
                  isActive ? "bg-blue-600 border-blue-600" : "bg-white border-gray-200"
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

      {/* APPLICATION LIST */}
      {filtered.map((item) => (
        <ApplicationCard key={item.id} item={item} />
      ))}

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <View className="mt-10 items-center">
          <Ionicons name="folder-open-outline" size={40} color="#9ca3af" />
          <Text className="mt-3 font-semibold text-gray-700">
            No applications found
          </Text>
          <Text className="text-gray-500 mt-1 text-center">
            Try adjusting your search or status filter.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Applications;

/* ------------------------------------------- */
/* COMPONENT: APPLICATION CARD */
const ApplicationCard = ({ item }: { item: Application }) => {
  const statusStyles = getStatusColor(item.status);

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      {/* NAME + EMAIL */}
      <Text className="font-bold text-gray-900 text-lg">{item.name}</Text>
      <Text className="text-gray-500">{item.email}</Text>

      {/* ROLE */}
      <Text className="text-gray-700 mt-2 font-medium">{item.role}</Text>
      <Text className="text-gray-500">{item.experience} experience</Text>

      {/* STATUS BADGE */}
      <View
        className={`self-start mt-3 px-3 py-1 rounded-full ${statusStyles.bgClass}`}
      >
        <Text className={`font-medium ${statusStyles.textClass}`}>
          {item.status}
        </Text>
      </View>

      {/* FOOTER */}
      <View className="flex-row justify-between items-center mt-4">
        <Text className="text-gray-400">{item.submittedAgo}</Text>

        <View className="flex-row gap-2">
          <TouchableOpacity className="px-3 py-2 bg-gray-100 rounded-lg" onPress={() => router.push(`./employer/Candidates/${item.id}`)}>
            <Text className="text-gray-800">View Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="px-3 py-2 bg-blue-600 rounded-lg">
            <Text className="text-white">Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

/* ------------------------------------------- */
/* STATUS COLORS */
const getStatusColor = (status: ApplicationStatus | string) => {
  switch (status) {
    case "Under Review":
      return { bgClass: "bg-yellow-100", textClass: "text-yellow-700" };
    case "Shortlisted":
      return { bgClass: "bg-blue-100", textClass: "text-blue-700" };
    case "Interview":
      return { bgClass: "bg-purple-100", textClass: "text-purple-700" };
    case "Not Qualified":
      return { bgClass: "bg-red-100", textClass: "text-red-700" };
    case "Accepted":
      return { bgClass: "bg-green-100", textClass: "text-green-700" };
    default:
      return { bgClass: "bg-gray-100", textClass: "text-gray-700" };
  }
};