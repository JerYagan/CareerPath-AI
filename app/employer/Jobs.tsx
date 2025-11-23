import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import JobCard from "@/components/features/employer/jobs/JobCard";           // :contentReference[oaicite:2]{index=2}
import ViewDetailsSheet from "@/components/features/employer/jobs/ViewDetailsSheet";
import EditJobModal from "@/components/features/employer/jobs/EditJobModal"; // :contentReference[oaicite:3]{index=3}

import jobsData from "@/assets/data/employerData/jobs.json";

type JobStatus = "Active" | "Closed" | "Draft";

type Job = {
  id: string;
  title: string;
  location: string;
  applicants: string[];
  views: number;
  status: JobStatus | string;
  postedAgo: string;
  jobType: string;
  salaryRange: string;
};

const JOBS: Job[] = jobsData.jobs;

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "draft", label: "Drafts" },
  { key: "closed", label: "Closed" },
] as const;

type StatusFilterKey = (typeof STATUS_FILTERS)[number]["key"];

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterKey>("all");

  // For View Details sheet
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [viewSheetVisible, setViewSheetVisible] = useState(false);

  // EDIT MODAL STATE
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editJobType, setEditJobType] = useState("");
  const [editSalaryRange, setEditSalaryRange] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editDescription, setEditDescription] = useState("");


  // --- FUNCTIONS --- //
  const handleOpenDetails = (job: Job) => {
    setSelectedJob(job);
    setViewSheetVisible(true);
  };

  const handleOpenEdit = (job: Job) => {
    setSelectedJob(job);

    setEditTitle(job.title);
    setEditLocation(job.location);
    setEditJobType(job.jobType);
    setEditSalaryRange(job.salaryRange);
    setEditStatus(job.status);
    // setEditDescription(job.description ?? "");

    setEditModalVisible(true);
  };

  const filteredJobs = useMemo(() => {
    const term = search.toLowerCase().trim();

    return JOBS.filter((job) => {
      const matchesSearch =
        term.length === 0 ||
        job.title.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.id.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && job.status === "Active") ||
        (statusFilter === "draft" && job.status === "Draft") ||
        (statusFilter === "closed" && job.status === "Closed");

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <>
      {/* MAIN SCREEN */}
      <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
        <Text className="text-gray-500 mb-4">
          Manage your job postings and track their performance
        </Text>

        {/* Search bar */}
        <View className="flex-row items-center bg-white rounded-lg px-4 py-2 mb-3 shadow-sm">
          <Ionicons name="search-outline" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-gray-900"
            placeholder="Search job title, location, or job ID"
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Status filters */}
        <View className="flex-row mb-4">
          {STATUS_FILTERS.map((filter) => {
            const isActive = statusFilter === filter.key;
            return (
              <TouchableOpacity
                key={filter.key}
                onPress={() => setStatusFilter(filter.key)}
                className={`px-3 py-2 mr-2 rounded-full border ${
                  isActive ? "bg-blue-600 border-blue-600" : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`font-medium ${isActive ? "text-white" : "text-gray-700"}`}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Job list */}
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onViewDetails={() => handleOpenDetails(job)}
            onEdit={() => handleOpenEdit(job)}
          />
        ))}

        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <View className="mt-10 items-center">
            <Ionicons name="briefcase-outline" size={40} color="#9ca3af" />
            <Text className="mt-3 font-semibold text-gray-700">No jobs found</Text>
            <Text className="text-gray-500 mt-1 text-center">
              Try adjusting your search or filters to see more job posts.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* --- VIEW DETAILS SHEET --- */}
      <ViewDetailsSheet
        visible={viewSheetVisible}
        onClose={() => setViewSheetVisible(false)}
        job={selectedJob}
      />

      {/* --- EDIT JOB MODAL --- */}
      <EditJobModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}

        title={editTitle}
        location={editLocation}
        jobType={editJobType}
        salaryRange={editSalaryRange}
        status={editStatus}
        description={editDescription}

        setTitle={setEditTitle}
        setLocation={setEditLocation}
        setJobType={setEditJobType}
        setSalaryRange={setEditSalaryRange}
        setStatus={setEditStatus}
        setDescription={setEditDescription}

        onSubmit={() => {
          console.log("Saving updated job:", {
            editTitle,
            editLocation,
            editJobType,
            editSalaryRange,
            editStatus,
            editDescription,
          });

          setEditModalVisible(false);
        }}
      />

    </>
  );
};

export default Jobs;