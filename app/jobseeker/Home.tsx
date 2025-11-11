import React, { useState, useCallback } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import Search from "@/components/Search";
import JobPopular from "@/components/job/JobPopular";
import jobs from "@/assets/data/jobs.json";
import JobCard from "@/components/job/JobCard";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
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
                className: "bg-indigo-950 w-full flex-1",
                textClassName: "text-white",
                onPress: () => console.log("Apply to", job.title),
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
  );
}