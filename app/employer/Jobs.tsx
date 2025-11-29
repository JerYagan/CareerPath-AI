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
import JobCard from "@/components/features/employer/jobs/JobCard";
import DraggableSheet from "@/components/ui/DraggableSheet";
import PostJob from "@/components/features/employer/jobs/PostJob";
import EditJobModal from "@/components/features/employer/jobs/EditJobModal";
import ViewDetailsSheet from "@/components/features/employer/jobs/ViewDetailsSheet";
import CustomButton from "@/components/ui/CustomButton";

import { Job, JobStatus } from "@/types/jobs";

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

/* --------------------------- Tabs & Filters ---------------------------- */

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

/* ---------------------------------------------------------------------- */

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState<StatusTabKey>("All");
  const [activeFilter, setActiveFilter] = useState<SavedFilterKey>("all");
  const [sortKey, setSortKey] = useState<SortKey>("Recent");

  const [postSheetVisible, setPostSheetVisible] = useState(false);
  const [editSheetVisible, setEditSheetVisible] = useState(false);
  const [detailsSheetVisible, setDetailsSheetVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  /* ------------------------------ Filtering ------------------------------ */

  const filteredJobs = useMemo(() => {
    const term = search.toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.department.toLowerCase().includes(term);

      const matchesStatus: boolean =
        statusTab === "All" || job.status === (statusTab as JobStatus);

      const matchesFilter: boolean = (() => {
        switch (activeFilter) {
          case "frontend":
            return job.tags.includes("Frontend") || job.title.includes("Frontend");
          case "remote":
            return job.workSetup === "Remote";
          case "engineering":
            return job.department === "Engineering";
          case "product":
            return job.department === "Product";
          default:
            return true;
        }
      })();

      return matchesSearch && matchesStatus && matchesFilter;
    });
  }, [jobs, search, statusTab, activeFilter]);

  /* ------------------------------- Sorting ------------------------------- */

  const sortedJobs = useMemo(() => {
    const clone = [...filteredJobs];

    switch (sortKey) {
      case "Most Applicants":
        clone.sort(
          (a, b) => b.applicants.length - a.applicants.length
        );
        break;
      case "Most Views":
        clone.sort((a, b) => b.views - a.views);
        break;
      case "Recent":
      default:
        // simple recent approximation: keep original order (INITIAL_JOBS already “recent-first”)
        break;
    }

    return clone;
  }, [filteredJobs, sortKey]);

  /* ----------------------------- Edit Actions ---------------------------- */

  const handleUpdateJob = (updated: Job) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === updated.id ? updated : job))
    );
    setEditSheetVisible(false);
  };

  const handleDuplicateJob = (job: Job) => {
    const copy: Job = {
      ...job,
      id: `${job.id}-copy-${Date.now()}`,
      title: `${job.title} (Copy)`,
      postedAgo: "Just now",
      status: "Draft",
      views: 0,
      applicants: [],
      analytics: job.analytics.map((p) => ({ ...p, value: 0 })),
    };
    setJobs((prev) => [copy, ...prev]);
  };

  const handleCloseJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: "Closed" } : job
      )
    );
  };

  const handleArchiveJob = (jobId: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  /* ---------------------------------------------------------------------- */

  return (
    <>
      <ScrollView
        className="flex-1 px-5 py-4 bg-gray-50"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* SEARCH */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-2 shadow-sm mb-3">
          <Ionicons name="search-outline" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Search job title, location, or department"
            placeholderTextColor="#9ca3af"
            className="ml-2 flex-1 text-gray-900"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* POST OPPORTUNITY */}
        <CustomButton
          title="Post Opportunity"
          icon="add-circle-outline"
          className="w-full py-3 rounded-xl mb-4 bg-brandBlue flex-row gap-2"
          textClassName="text-white font-semibold"
          iconColor="white"
          iconSize={20}
          onPress={() => {
            setSelectedJob(null);
            setPostSheetVisible(true);
          }}
        />

        {/* STATUS TABS */}
        <SegmentTabs
          options={STATUS_TABS}
          labels={STATUS_LABELS}
          selected={statusTab}
          setSelected={setStatusTab}
          activeColor={brandBlue}
        />

        {/* SAVED FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 mb-2"
        >
          {SAVED_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <TouchableOpacity
                key={filter.key}
                onPress={() => setActiveFilter(filter.key)}
                className={`px-3 py-2 mr-2 rounded-full border ${
                  isActive ? "bg-brandBlue border-brandBlue" : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    isActive ? "text-white" : "text-gray-700"
                  }`}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* SORTING */}
        <View className="flex-row items-center justify-between mb-3 mt-4">
          <Text className="text-gray-500 text-sm">Sorted by</Text>
          <TouchableOpacity
            className="flex-row items-center px-3 py-2 rounded-full"
            onPress={() => {
              const idx = SORT_OPTIONS.indexOf(sortKey);
              const next = SORT_OPTIONS[(idx + 1) % SORT_OPTIONS.length];
              setSortKey(next);
            }}
          >
            <Ionicons
              name="swap-vertical-outline"
              size={16}
              color="#4b5563"
            />
            <Text className="ml-1 text-gray-800 text-sm font-medium">
              {sortKey}
            </Text>
          </TouchableOpacity>
        </View>

        {/* JOB CARDS */}
        {sortedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onViewDetails={() => {
              setSelectedJob(job);
              setDetailsSheetVisible(true);
            }}
            onEdit={() => {
              setSelectedJob(job);
              setEditSheetVisible(true);
            }}
          />
        ))}

        {sortedJobs.length === 0 && (
          <View className="mt-10 items-center">
            <Ionicons name="briefcase-outline" size={40} color="#9ca3af" />
            <Text className="text-gray-700 font-semibold mt-2">
              No job posts
            </Text>
            <Text className="text-gray-500 text-center mt-1">
              Try adjusting filters or status.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* POST JOB SHEET */}
      <DraggableSheet
        visible={postSheetVisible}
        onClose={() => setPostSheetVisible(false)}
        height="full"
      >
        <PostJob
          onClose={() => {
            setPostSheetVisible(false);
          }}
        />
      </DraggableSheet>

      {/* EDIT JOB SHEET */}
      <DraggableSheet
        visible={editSheetVisible}
        onClose={() => setEditSheetVisible(false)}
        height="full"
      >
        <EditJobModal
          job={selectedJob}
          onClose={() => setEditSheetVisible(false)}
          onSubmit={handleUpdateJob}
          onDuplicate={handleDuplicateJob}
          onCloseJob={handleCloseJob}
          onArchiveJob={handleArchiveJob}
        />
      </DraggableSheet>

      {/* VIEW DETAILS SHEET */}
      <ViewDetailsSheet
        visible={detailsSheetVisible}
        onClose={() => setDetailsSheetVisible(false)}
        job={selectedJob}
      />
    </>
  );
};

export default Jobs;