import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import jobs from "@/assets/data/jobs.json"; // make sure this includes a `saved` prop
import JobCard from "@/components/job/JobCard";

const options = ["saved", "applied", "interviews", "archived"] as const;
const labels = {
  saved: "Saved",
  applied: "Applied",
  interviews: "Interviews",
  archived: "Archived",
};

const mockContent = {
  applied: ["Job A", "Job B"],
  interviews: ["Interview X"],
  archived: ["Archived 1", "Archived 2"],
};

const Activity = () => {
  const [selected, setSelected] = useState<keyof typeof labels>("saved");

  const handleToggle = (option: keyof typeof labels) => {
    setSelected(option); // only one can be active
  };

  // Get jobs for saved tab
  const savedJobs = jobs.filter((job) => job.saved);

  return (
    <View className="p-4 flex-1">
      {/* Toggle Buttons */}
      <View className="flex-row justify-center bg-gray-200 border border-gray-200 rounded-lg mb-4">
        {options.map((option) => {
          const isActive = selected === option;
          return (
            <TouchableOpacity
              key={option}
              onPress={() => handleToggle(option)}
              className={`flex-1 py-4 px-4 rounded-lg ${
                isActive ? "bg-white" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-center font-bold ${
                  isActive ? "text-black" : "text-gray-500"
                }`}
              >
                {labels[option]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      <ScrollView>
        {selected === "saved"
          ? savedJobs.map((job) =>
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
                title: "Remove",
                icon: "trash-outline",
                className: "border border-gray-300 gap-2",
                onPress: () => console.log("Bookmark", job.title),
              },
            ]}
          />
        )
          : mockContent[selected].map((item, i) => (
              <View
                key={i}
                className="mb-4 p-4 border rounded-lg bg-gray-50"
              >
                <Text className="font-bold text-lg mb-2">{item}</Text>
              </View>
            ))}
      </ScrollView>
    </View>
  );
};

export default Activity;