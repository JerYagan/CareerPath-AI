import React, { useState, useCallback } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useRouter } from "expo-router";

import jobs from "@/assets/data/jobs.json";
import Tabs from "@/components/ui/SegmentTabs";
import SavedSection from "@/components/features/jobseeker/activity/SavedSection";
import AppliedSection from "@/components/features/jobseeker/activity/AppliedSection";
import InterviewSection from "@/components/features/jobseeker/activity/InterviewSection";
import ArchivedSection from "@/components/features/jobseeker/activity/ArchivedSection";
import JobApplySheet from "@/components/ui/JobApplySheet";
import type { Job } from "@/types/job";
import EmptyState from "@/components/ui/EmptyState";

const options = ["saved", "applied", "interviews", "archived"] as const;
const labels = {
  saved: "Saved",
  applied: "Applied",
  interviews: "Interviews",
  archived: "Archived",
};

const statusColors: Record<string, string> = {
  "Under Review": "bg-yellow-200 text-yellow-800",
  Shortlisted: "bg-blue-100 text-blue-800",
  "Interview Scheduled": "bg-purple-100 text-purple-800",
  Rejected: "bg-red-100 text-red-800",
  Hired: "bg-green-100 text-green-800",
  "Position Filled": "bg-gray-200 text-gray-700",
  "No Longer Available": "bg-orange-100 text-orange-700",
};

const Activity = () => {
  const [selected, setSelected] = useState<keyof typeof labels>("saved");
  const [refreshing, setRefreshing] = useState(false);

  const [applyVisible, setApplyVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const router = useRouter();

  const savedJobs = (jobs as Job[]).filter((job) => job.saved);
  const appliedJobs = (jobs as Job[]).filter((job) => job.applied);
  const interviewJobs = (jobs as Job[]).filter(
    (job) => job.status === "Interview Scheduled"
  );
  const archivedJobs = (jobs as Job[]).filter((job) => job.archived);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  const handleOpenApplySheet = (job: Job) => {
    setSelectedJob(job);
    setApplyVisible(true);
  };

  const handleViewApplication = (job: Job) => {
    router.push(`./jobseeker/Applications/${job.id}`);
  };

  return (
    <View className="mx-4 mt-4 flex-1">
      <Tabs
        options={options}
        labels={labels}
        selected={selected}
        setSelected={setSelected}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* SAVED TAB */}
        {selected === "saved" &&
          (savedJobs.length > 0 ? (
            savedJobs.map((job) => (
              <SavedSection
                key={job.id}
                job={job}
                isAvailable={job.available !== false}
                onApply={() => handleOpenApplySheet(job)}
              />
            ))
          ) : (
            <EmptyState
              title="No saved jobs yet"
              subtitle="Jobs you save will appear here so you can apply later."
              icon="bookmark-outline"
            />
          ))}

        {/* APPLIED TAB */}
        {selected === "applied" &&
          (appliedJobs.length > 0 ? (
            <AppliedSection
              appliedJobs={appliedJobs}
              statusColors={statusColors}
              onViewApplication={handleViewApplication}
            />
          ) : (
            <EmptyState
              title="No applications yet"
              subtitle="When you apply to jobs, they will be listed here."
              icon="paper-plane-outline"
            />
          ))}


        {/* INTERVIEW TAB */}
        {selected === "interviews" &&
          (interviewJobs.length > 0 ? (
            <InterviewSection interviewJobs={interviewJobs} />
          ) : (
            <EmptyState
              title="No upcoming interviews"
              subtitle="When an employer invites you to an interview, it will appear here."
              icon="calendar-outline"
            />
          ))}


        {/* ARCHIVED TAB */}
        {selected === "archived" &&
          (archivedJobs.length > 0 ? (
            <ArchivedSection
              archivedJobs={archivedJobs}
              statusColors={statusColors}
            />
          ) : (
            <EmptyState
              title="No archived jobs"
              subtitle="Jobs you remove or which close will appear here."
              icon="archive-outline"
            />
          ))}
      </ScrollView>

      <JobApplySheet
        visible={applyVisible}
        onClose={() => setApplyVisible(false)}
        job={selectedJob}
      />
    </View>
  );
};

export default Activity;
