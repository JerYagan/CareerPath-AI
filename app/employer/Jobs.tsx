import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SegmentTabs from "@/components/ui/SegmentTabs";
import EmployerJobCard from "@/components/features/employer/jobs/EmployerJobCard";
import JobPost from "@/components/features/employer/jobs/JobPost";
import JobEdit from "@/components/features/employer/jobs/JobEdit";
import JobDetails from "@/components/features/employer/jobs/JobDetails";
import CustomButton from "@/components/ui/CustomButton";
import SearchBar from "@/components/ui/SearchBar";
import UniversalFilterModal from "@/components/ui/FilterModal";

import { Job, JobStatus } from "@/types/jobs";
import { router } from "expo-router";

const brandBlue = "#1C388E";

/* ------------------------- Inline Job Seed Data ------------------------- */

const INITIAL_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    location: "Quezon City, Philippines",
    department: "Engineering",
    workSetup: "Hybrid",
    jobType: "Full-time",
    salaryRange: "₱40,000 - ₱60,000 / month",
    postedAgo: "2 days ago",
    status: "Active",
    views: 214,
    applicants: [
      {
        id: "a1",
        name: "John Mark Santos",
        role: "Frontend Dev",
        avatarInitials: "JM",
        experience: "3 yrs React / TS",
        status: "Shortlisted",
      },
      {
        id: "a2",
        name: "Anna Lopez",
        role: "UI Engineer",
        avatarInitials: "AL",
        experience: "2 yrs React / Tailwind",
        status: "Interview",
      },
    ],
    tags: ["React", "TypeScript", "Hybrid", "Mid-level"],
    description:
      "Build and maintain responsive interfaces for PESO Jobs PH using React, TypeScript, and Tailwind-like styling. Work closely with design and backend teams.",
    experienceLevel: "Mid-level (2–4 yrs)",
    analytics: [
      { label: "M", value: 24 },
      { label: "T", value: 32 },
      { label: "W", value: 18 },
      { label: "T", value: 40 },
      { label: "F", value: 36 },
      { label: "S", value: 20 },
      { label: "S", value: 26 },
    ],
  },
  {
    id: "job-2",
    title: "Backend Engineer",
    location: "Remote • Philippines",
    department: "Engineering",
    workSetup: "Remote",
    jobType: "Full-time",
    salaryRange: "₱60,000 - ₱80,000 / month",
    postedAgo: "5 days ago",
    status: "Active",
    views: 189,
    applicants: [
      {
        id: "b1",
        name: "Rico Benitez",
        role: "Backend Dev",
        avatarInitials: "RB",
        experience: "4 yrs Node / Postgres",
        status: "New",
      },
      {
        id: "b2",
        name: "Karl Martinez",
        role: "Fullstack Dev",
        avatarInitials: "KM",
        experience: "3 yrs Node / React",
        status: "New",
      },
    ],
    tags: ["Node.js", "PostgreSQL", "Remote", "Senior"],
    description:
      "Own APIs and services powering PESO Jobs PH. Focus on scalability, security, and clean architecture.",
    experienceLevel: "Senior (4+ yrs)",
    analytics: [
      { label: "M", value: 10 },
      { label: "T", value: 18 },
      { label: "W", value: 22 },
      { label: "T", value: 27 },
      { label: "F", value: 25 },
      { label: "S", value: 16 },
      { label: "S", value: 19 },
    ],
  },
  {
    id: "job-3",
    title: "Product Designer",
    location: "Makati, Philippines",
    department: "Product",
    workSetup: "On-site",
    jobType: "Contract",
    salaryRange: "₱45,000 - ₱55,000 / month",
    postedAgo: "1 week ago",
    status: "Draft",
    views: 96,
    applicants: [
      {
        id: "c1",
        name: "Celine Diaz",
        role: "Product Designer",
        avatarInitials: "CD",
        experience: "3 yrs SaaS / UX",
        status: "New",
      },
    ],
    tags: ["UX", "UI", "Figma", "On-site"],
    description:
      "Design flows and interfaces for both jobseekers and employers. Work closely with PMs and engineers.",
    experienceLevel: "Mid-level (2–4 yrs)",
    analytics: [
      { label: "M", value: 8 },
      { label: "T", value: 12 },
      { label: "W", value: 15 },
      { label: "T", value: 11 },
      { label: "F", value: 14 },
      { label: "S", value: 7 },
      { label: "S", value: 9 },
    ],
  },
];

const STATUS_TABS = ["All", "Active", "Draft", "Closed"] as const;
type StatusTabKey = (typeof STATUS_TABS)[number];

const STATUS_LABELS: Record<StatusTabKey, string> = {
  All: "All",
  Active: "Active",
  Draft: "Drafts",
  Closed: "Closed",
};

const SAVED_FILTERS = [
  { key: "all", label: "All roles" },
  { key: "frontend", label: "Frontend" },
  { key: "remote", label: "Remote only" },
  { key: "engineering", label: "Engineering" },
  { key: "product", label: "Product" },
] as const;

type SavedFilterKey = (typeof SAVED_FILTERS)[number]["key"];

const SORT_OPTIONS = ["Recent", "Most Applicants", "Most Views"] as const;
type SortKey = (typeof SORT_OPTIONS)[number];

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  /* ------------------------ Search / Sort / Tabs ------------------------ */
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("Recent");
  const [statusTab, setStatusTab] = useState<StatusTabKey>("All");

  /* ----------------------------- Filter Modal ---------------------------- */
  const [filterVisible, setFilterVisible] = useState(false);

  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [experienceFilter, setExperienceFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  /* ----------------------- Post / Edit / View Sheets --------------------- */
  const [postVisible, setPostVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  /* ------------------------------ Filtering ------------------------------ */
  const filteredJobs = useMemo(() => {
    const term = search.toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.department.toLowerCase().includes(term);

      const matchesStatus =
        statusTab === "All" || job.status === (statusTab as JobStatus);

      const matchesSkill =
        skillFilter.length === 0 ||
        job.tags.some((t) => skillFilter.includes(t));

      const matchesExperience =
        experienceFilter.length === 0 ||
        experienceFilter.includes(job.experienceLevel);

      const matchesStatusFilter =
        statusFilter.length === 0 || statusFilter.includes(job.status);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSkill &&
        matchesExperience &&
        matchesStatusFilter
      );
    });
  }, [jobs, search, statusTab, skillFilter, experienceFilter, statusFilter]);

  /* ------------------------------ Sorting ------------------------------- */
  const sortedJobs = useMemo(() => {
    const clone = [...filteredJobs];
    switch (sortKey) {
      case "Most Applicants":
        clone.sort((a, b) => b.applicants.length - a.applicants.length);
        break;
      case "Most Views":
        clone.sort((a, b) => b.views - a.views);
        break;
      case "Recent":
      default:
        break;
    }
    return clone;
  }, [filteredJobs, sortKey]);

  /* ---------------------------- Update Handlers --------------------------- */
  const handleUpdateJob = (updated: Job) => {
    setJobs((prev) => prev.map((job) => (job.id === updated.id ? updated : job)));
    setEditVisible(false);
  };

  const handleCloseJob = (jobId: string) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "Closed" } : j)));
  };

  const handleArchiveJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  /* ---------------------------------------------------------------------- */

  return (
    <>
      {/* MAIN LIST */}
      <ScrollView
        className="flex-1 px-5 py-4 bg-gray-50"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* SEARCH */}
        <SearchBar
          value={search}
          onChange={setSearch}
          showFilter
          onFilterPress={() => setFilterVisible(true)}
          placeholder="Search job title, location, or department"
        />

        {/* ACTION BUTTONS */}
        <View className="flex-row items-center flex-wrap gap-2 mb-4">
          <CustomButton
            title="Post Job"
            icon="add-circle-outline"
            className="py-3 rounded-xl mb-4 bg-brandBlue flex-row gap-2 w-1/2 flex-1"
            textClassName="text-white font-semibold"
            iconColor="white"
            iconSize={20}
            onPress={() => {
              setSelectedJob(null);
              setPostVisible(true);
            }}
          />

          <CustomButton
            title="Candidates"
            icon="people-outline"
            className="py-3 rounded-xl mb-4 bg-white border border-brandBlue flex-row gap-2 w-1/2"
            textClassName="text-brandBlue font-semibold"
            iconColor={brandBlue}
            iconSize={20}
            onPress={() => router.push("./Candidates")}
          />
        </View>

        {/* STATUS TABS */}
        <SegmentTabs
          options={STATUS_TABS}
          labels={STATUS_LABELS}
          selected={statusTab}
          setSelected={setStatusTab}
          activeColor={brandBlue}
        />

        {/* SORT */}
        <View className="flex-row items-center justify-between mb-3 mt-2">
          <Text className="text-gray-500">Sorted by</Text>
          <TouchableOpacity
            onPress={() => {
              const idx = SORT_OPTIONS.indexOf(sortKey);
              setSortKey(SORT_OPTIONS[(idx + 1) % SORT_OPTIONS.length]);
            }}
            className="flex-row items-center px-3 py-2 rounded-full"
          >
            <Ionicons name="swap-vertical-outline" size={16} color="#4b5563" />
            <Text className="ml-2 text-gray-800 font-medium">{sortKey}</Text>
          </TouchableOpacity>
        </View>

        {/* JOB CARDS */}
        {sortedJobs.map((job) => (
          <EmployerJobCard
            key={job.id}
            job={job}
            onViewDetails={() => {
              setSelectedJob(job);
              setDetailsVisible(true);
            }}
            onEdit={() => {
              setSelectedJob(job);
              setEditVisible(true);
            }}
          />
        ))}

        {sortedJobs.length === 0 && (
          <View className="mt-10 items-center">
            <Ionicons name="briefcase-outline" size={40} color="#9ca3af" />
            <Text className="text-gray-700 font-semibold mt-2">No job posts</Text>
            <Text className="text-gray-500 text-center mt-1">
              Try adjusting filters, tab, or search terms.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* UNIVERSAL FILTER MODAL */}
      <UniversalFilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        title="Filter Jobs"
        showSearch={true}
        sections={[
          {
            label: "Status",
            items: ["Active", "Draft", "Closed"],
            state: statusFilter,
            setState: setStatusFilter,
          },
          {
            label: "Experience Level",
            items: ["Entry", "Mid-level (2–4 yrs)", "Senior (4+ yrs)"],
            state: experienceFilter,
            setState: setExperienceFilter,
          },
          {
            label: "Skills",
            items: [
              "React",
              "TypeScript",
              "Node.js",
              "UI/UX",
              "Figma",
              "Hybrid",
              "Remote",
              "On-site",
            ],
            state: skillFilter,
            setState: setSkillFilter,
          },
        ]}
        onReset={() => {
          setSkillFilter([]);
          setExperienceFilter([]);
          setStatusFilter([]);
        }}
        onApply={() => setFilterVisible(false)}
      />

      {/* POST JOB */}
      {postVisible && <JobPost onClose={() => setPostVisible(false)} />}

      {/* EDIT JOB */}
      <JobEdit
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        job={selectedJob}
        onSubmit={handleUpdateJob}
        onCloseJob={handleCloseJob}
        onArchiveJob={handleArchiveJob}
      />

      {/* VIEW DETAILS */}
      <JobDetails
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
        job={selectedJob}
      />
    </>
  );
};


export default Jobs;
