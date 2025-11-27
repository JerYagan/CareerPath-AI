import React, { useState, useCallback } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import Search from "@/components/features/jobseeker/home/HomeSearch";
import JobPopular from "@/components/features/jobseeker/home/JobPopular";
import jobs from "@/assets/data/jobs.json";
import JobCard from "@/components/features/jobseeker/home/JobCard";
import JobApplySheet from "@/components/features/jobseeker/home/JobApplySheet";
import { Job } from "@/types/job";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const openApplySheet = (job: Job) => {
    setSelectedJob(job);
    setSheetVisible(true);
  };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Search />
        <JobPopular />

        <View className="mt-4 p-4">
          <Text className="text-2xl font-bold">Find your perfect job!</Text>
          <Text className="text-gray-600 mb-4">
            Showing {jobs.length} jobs matching your criteria
          </Text>

          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              buttons={[
                {
                  title: "Apply Now",
                  icon: "paper-plane-outline",
                  iconColor: "white",
                  className: "bg-brandBlue w-full flex-1 gap-2",
                  textClassName: "text-white",
                  onPress: () => openApplySheet(job),
                },
                {
                  icon: "bookmark-outline",
                  className: "border border-gray-300",
                  onPress: () => console.log("Bookmark", job.title),
                },
              ]}
            />
          ))}
        </View>
      </ScrollView>

      {/* APPLY MODAL */}
      <JobApplySheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        job={selectedJob}
      />
    </>
  );
}