import React, { useState, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from "@/components/ui/SearchBar";
import FilterSheet from "@/components/features/employer/candidates/FilterSheet";
import CandidateCard from "@/components/features/employer/candidates/CandidateCard";
import CandidateProfileSheet from "@/components/features/employer/candidates/CandidateProfileSheet";

const brandBlue = "#1C388E";

const CANDIDATES = [
  {
    id: "c1",
    name: "John Mark Santos",
    initials: "JM",
    role: "Frontend Developer",
    experience: 3,
    province: "Metro Manila",
    city: "Quezon City",
    education: "Bachelor's",
    bio: "Frontend developer specializing in React, UI engineering, and design systems.",
    email: "john@example.com",
    phone: "09123456789",
    preferredRoles: ["Frontend Developer", "UI Engineer"],
    skills: ["React", "TypeScript", "Tailwind", "UI/UX", "Next.js"],
    match: 82,
    status: "Available",
    links: [
      { label: "Portfolio", url: "https://example.com" },
      { label: "Resume", url: "https://example.com/resume.pdf" },
    ],
  },
  {
    id: "c2",
    initials: "AL",
    name: "Anna Lopez",
    role: "UI/UX Designer",
    experience: 4,
    province: "Metro Manila",
    city: "Makati",
    education: "Bachelor's",
    bio: "Product designer focused on user research and high-fidelity prototyping.",
    email: "anna@example.com",
    phone: "09124567890",
    preferredRoles: ["Product Designer", "UX Researcher"],
    skills: ["Figma", "UX Research", "High Fidelity", "Prototyping"],
    match: 74,
    status: "Open to Work",
    links: [{ label: "Portfolio", url: "https://dribbble.com" }],
  },
];

export default function Candidates() {
  const [search, setSearch] = useState("");

  const [filterVisible, setFilterVisible] = useState(false);

  const [status, setStatus] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [profileVisible, setProfileVisible] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return CANDIDATES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(term) ||
        c.role.toLowerCase().includes(term) ||
        c.skills.some((s) => s.toLowerCase().includes(term));

      return matchesSearch;
    });
  }, [search]);

  const resetFilters = () => {
    setStatus([]);
    setExperience([]);
    setSkills([]);
    setEducation([]);
    setProvinces([]);
    setCities([]);
  };

  return (
    <>
      <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
        <SearchBar
          value={search}
          onChange={setSearch}
          showFilter
          onFilterPress={() => setFilterVisible(true)}
          placeholder="Search candidates..."
        />

        {filtered.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onViewProfile={() => {
              setSelectedCandidate(candidate);
              setProfileVisible(true);
            }}
          />
        ))}
      </ScrollView>

      {/* Filter */}
      <FilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        status={status}
        setStatus={setStatus}
        experience={experience}
        setExperience={setExperience}
        skills={skills}
        setSkills={setSkills}
        education={education}
        setEducation={setEducation}
        provinces={provinces}
        setProvinces={setProvinces}
        cities={cities}
        setCities={setCities}
        onApply={() => setFilterVisible(false)}
        onReset={resetFilters}
      />

      {/* Profile */}
      <CandidateProfileSheet
        visible={profileVisible}
        onClose={() => setProfileVisible(false)}
        candidate={selectedCandidate}
      />
    </>
  );
}