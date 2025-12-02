import React, { useState, useCallback } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import Search from "@/src/features/jobseeker/home/HomeSearch";
import JobPopular from "@/src/features/jobseeker/home/JobPopular";
import jobs from "@/assets/data/jobs.json";
import SkillsModal from "@/src/components/ui/TagsModal";
import HomeCard from "@/src/features/jobseeker/home/HomeCard";
import JobApplySheet from "@/src/components/ui/JobApplySheet";
import SkillsPreview from "@/src/components/ui/TagsPreview";
import { Job } from "@/src/types/job";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const [skillsModalVisible, setSkillsModalVisible] = useState(false);
  const [skillsSelected, setSkillsSelected] = useState<string[]>([]);

  // Bookmark states
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const openApplySheet = (job: Job) => {
    setSelectedJob(job);
    setSheetVisible(true);
  };

  const toggleBookmark = (jobId: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const openSkills = (skills: string[]) => {
    setSkillsSelected(skills);
    setSkillsModalVisible(true);
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
            <HomeCard
              key={job.id}
              job={job}
              bookmarked={bookmarkedIds.includes(job.id)}
              onApply={() => openApplySheet(job)}
              onBookmark={() => toggleBookmark(job.id)}
            >
              {/* DESCRIPTION WITH LIMIT */}
              <Text className="mt-6 text-gray-600" numberOfLines={5}>
                {job.description}
              </Text>

              {/* SKILLS */}
              {job.skills && (
                <View className="mt-4">
                  <SkillsPreview
                    skills={job.skills}
                    onPress={() => openSkills(job.skills)}
                  />
                </View>
              )}
            </HomeCard>
          ))}
        </View>
      </ScrollView>

      {/* SKILLS MODAL */}
      <SkillsModal
        visible={skillsModalVisible}
        onClose={() => setSkillsModalVisible(false)}
        skills={skillsSelected}
      />

      {/* APPLY SHEET */}
      <JobApplySheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        job={selectedJob}
      />
    </>
  );
}
