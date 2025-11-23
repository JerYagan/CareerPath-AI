import React, { useState, useCallback } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import jobs from "@/assets/data/jobs.json";
import Tabs from "@/components/ui/SegmentTabs";
import SavedSection from "@/components/features/jobseeker/activity/SavedSection";
import AppliedSection from "@/components/features/jobseeker/activity/AppliedSection";
import InterviewSection from "@/components/features/jobseeker/activity/InterviewSection";
import ArchivedSection from "@/components/features/jobseeker/activity/ArchivedSection";

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

  const savedJobs = jobs.filter((job) => job.saved);
  const appliedJobs = jobs.filter((job) => job.applied);
  const interviewJobs = jobs.filter((job) => job.status === "Interview Scheduled");
  const archivedJobs = jobs.filter((job) => job.archived);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <View className="mx-4 mt-4 flex-1">
      <Tabs
        options={options}
        labels={labels}
        selected={selected}
        setSelected={setSelected} // ✅ now type-safe
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {selected === "saved" && <SavedSection savedJobs={savedJobs} />}
        {selected === "applied" && (
          <AppliedSection appliedJobs={appliedJobs} statusColors={statusColors} />
        )}
        {selected === "interviews" && <InterviewSection interviewJobs={interviewJobs} />}
        {selected === "archived" && (
          <ArchivedSection archivedJobs={archivedJobs} statusColors={statusColors} />
        )}
      </ScrollView>
    </View>
  );
};

export default Activity;