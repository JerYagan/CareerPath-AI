import React from "react";
import JobCard from "@/components/features/jobseeker/job/JobCard";

const SavedSection = ({ savedJobs }: { savedJobs: any[] }) => (
  <>
    {savedJobs.map((job) => (
      <JobCard
        key={job.id}
        job={job}
        showMatch={false}
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
            onPress: () => console.log("Remove", job.title),
          },
        ]}
      />
    ))}
  </>
);

export default SavedSection;