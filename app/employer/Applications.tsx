import React, { useMemo, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from "@/components/ui/SearchBar";
import ApplicationCard from "@/components/features/employer/applications/ApplicationCard";
import ApplicantProfileSheet from "@/components/features/employer/applications/ApplicantProfileSheet";
import FilterSheet from "@/components/features/employer/applications/FilterSheet";

export type ApplicationStatus =
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Not Qualified"
  | "Accepted";

type TimelineEntry = {
  label: string;
  date: string;
};

type Note = {
  id: number;
  text: string;
  date: string;
};

type Insights = {
  matchDescription: string;
  strengths: string[];
  risks: string[];
};

export type Application = {
  id: string;
  name: string;
  initials: string;
  role: string;
  submittedAgo: string;
  status: ApplicationStatus;
  timeline: TimelineEntry[];
  notes: Note[];
  experience: string;
  level: string;
  email: string;
  phone: string;
  education: string;
  province: string;
  city: string;
  bio: string;
  skills: string[];
  match: number;
  resume: string;
  portfolio: string;
  insights: Insights;
};

/* ---- seed data (same as before) ---- */
// const APPLICATION_SEED: Application[] = [ ...same as what I gave you...]
// -----------------------------------------
// SEED DATA
// -----------------------------------------
const APPLICATION_SEED: Application[] = [
  {
    id: "APP-001",
    name: "Juan Dela Cruz",
    initials: "JD",
    role: "Frontend Developer",
    submittedAgo: "3 days ago",
    status: "Under Review",
    timeline: [
      { label: "Applied", date: "Jan 09, 2025" },
      { label: "Viewed by employer", date: "Jan 10, 2025" },
      { label: "Under Review", date: "Jan 11, 2025" },
    ],
    notes: [],
    experience: "2 years",
    level: "Mid-level",
    email: "juan@example.com",
    phone: "09123456789",
    education: "Bachelor's Degree in IT",
    province: "Quezon Province",
    city: "Lucena City",
    bio: "Frontend developer with strong foundations in React, TypeScript, and responsive UI.",
    skills: ["React", "TypeScript", "JavaScript", "Tailwind"],
    match: 82,
    resume: "https://example.com/juan-resume.pdf",
    portfolio: "https://example.com/juan-portfolio",
    insights: {
      matchDescription: "Strong frontend foundation with high adaptability.",
      strengths: ["UI implementation", "React hooks", "Responsive design"],
      risks: ["Limited backend exposure"],
    },
  },
  // … add the other applicants here EXACTLY as before
];

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>(APPLICATION_SEED);
  const [search, setSearch] = useState("");

  const [statusFilters, setStatusFilters] = useState<ApplicationStatus[]>([]);
  const [levelFilters, setLevelFilters] = useState<string[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);

  const [profileVisible, setProfileVisible] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return applications.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(term) ||
        item.role.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term);

      const matchesStatus =
        statusFilters.length === 0 || statusFilters.includes(item.status);

      const matchesLevel =
        levelFilters.length === 0 || levelFilters.includes(item.level);

      return matchesSearch && matchesStatus && matchesLevel;
    });
  }, [applications, search, statusFilters, levelFilters]);

  const handleUpdateStatus = (id: string, newStatus: ApplicationStatus) => {
    const date = new Date().toLocaleDateString();

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              timeline: [...app.timeline, { label: newStatus, date }],
            }
          : app
      )
    );

    setSelectedApplicant((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            status: newStatus,
            timeline: [...prev.timeline, { label: newStatus, date }],
          }
        : prev
    );
  };

  const handleAddNote = (id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const note: Note = {
      id: Date.now(),
      text: trimmed,
      date: new Date().toLocaleDateString(),
    };

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, notes: [...app.notes, note] } : app
      )
    );

    setSelectedApplicant((prev) =>
      prev && prev.id === id
        ? { ...prev, notes: [...prev.notes, note] }
        : prev
    );
  };

  const resetFilters = () => {
    setStatusFilters([]);
    setLevelFilters([]);
  };

  return (
    <>
      <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
        <Text className="text-2xl font-bold text-gray-900 mb-1">Applications</Text>
        <Text className="text-gray-500 mb-4">
          Track and review all applicants for your job postings.
        </Text>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search applicant name, role, or email"
          showFilter
          onFilterPress={() => setFilterVisible(true)}
        />

        {filtered.map((item) => (
          <ApplicationCard
            key={item.id}
            item={item}
            onViewProfile={() => {
              setSelectedApplicant(item);
              setProfileVisible(true);
            }}
          />
        ))}

        {filtered.length === 0 && (
          <View className="mt-14 items-center">
            <Ionicons name="folder-open-outline" size={48} color="#9ca3af" />
            <Text className="mt-4 text-lg font-semibold text-gray-700">
              No applications found
            </Text>
            <Text className="text-gray-500 mt-1 text-center">
              Try adjusting your search or filters.
            </Text>
          </View>
        )}
      </ScrollView>

      <FilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        selectedStatuses={statusFilters}
        setSelectedStatuses={setStatusFilters}
        selectedLevels={levelFilters}
        setSelectedLevels={setLevelFilters}
        onReset={resetFilters}
        onApply={() => setFilterVisible(false)}
      />

      <ApplicantProfileSheet
        visible={profileVisible}
        onClose={() => setProfileVisible(false)}
        applicant={selectedApplicant}
        onUpdateStatus={handleUpdateStatus}
        onAddNote={handleAddNote}
      />
    </>
  );
};

export default Applications;