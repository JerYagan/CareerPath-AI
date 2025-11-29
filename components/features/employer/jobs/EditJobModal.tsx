import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";
import { Job } from "@/types/jobs";

type EditJobModalProps = {
  job: Job | null;
  onClose: () => void;
  onSubmit: (updated: Job) => void;

  onDuplicate: (job: Job) => void;
  onCloseJob: (jobId: string) => void;
  onArchiveJob: (jobId: string) => void;
};

const brandBlue = "#1C388E";

const EditJobModal = ({
  job,
  onClose,
  onSubmit,
  onDuplicate,
  onCloseJob,
  onArchiveJob,
}: EditJobModalProps) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Active");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setLocation(job.location);
      setJobType(job.jobType);
      setSalaryRange(job.salaryRange);
      setStatus(job.status);
      setDescription(job.description);
    }
  }, [job]);

  if (!job) {
    return (
      <View className="flex-1 bg-white p-5">
        <Text className="text-gray-500">No job selected.</Text>
      </View>
    );
  }

  const handleSave = () => {
    onSubmit({
      ...job,
      title,
      location,
      jobType: jobType as Job["jobType"],
      salaryRange,
      status,
      description,
    });
  };

  return (
    <View className="flex-1 bg-white p-5">
      {/* HEADER */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Ionicons name="construct-outline" size={22} color={brandBlue} />
          <Text className="text-xl font-semibold ml-2 text-gray-900">
            Edit Job
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Fields */}
        <Text className="font-semibold text-gray-900 mb-1">Job title</Text>
        <TextInput
          placeholder="Job title"
          placeholderTextColor="#9ca3af"
          className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          value={title}
          onChangeText={setTitle}
        />

        <Text className="font-semibold text-gray-900 mb-1 mt-3">
          Location
        </Text>
        <TextInput
          placeholder="Location"
          placeholderTextColor="#9ca3af"
          className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          value={location}
          onChangeText={setLocation}
        />

        <Text className="font-semibold text-gray-900 mb-1 mt-3">
          Job Type
        </Text>
        <TextInput
          placeholder="Full-time, Part-time, Contract..."
          placeholderTextColor="#9ca3af"
          className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          value={jobType}
          onChangeText={setJobType}
        />

        <Text className="font-semibold text-gray-900 mb-1 mt-3">
          Salary Range
        </Text>
        <TextInput
          placeholder="₱30,000 - ₱50,000"
          placeholderTextColor="#9ca3af"
          className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          value={salaryRange}
          onChangeText={setSalaryRange}
        />

        <Text className="font-semibold text-gray-900 mb-1 mt-3">Status</Text>
        <TextInput
          placeholder="Active / Draft / Closed"
          placeholderTextColor="#9ca3af"
          className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          value={status}
          onChangeText={(v) =>
            setStatus(
              (v as Job["status"]) || job.status // keep valid
            )
          }
        />

        <Text className="font-semibold text-gray-900 mb-1 mt-3">
          Description
        </Text>
        <TextInput
          placeholder="Job description"
          placeholderTextColor="#9ca3af"
          className="border border-gray-300 rounded-xl px-4 py-3 text-base min-h-[120px]"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* PRIMARY SAVE */}
        <CustomButton
          title="Save changes"
          icon="save-outline"
          className="mt-6 bg-brandBlue rounded-xl py-3 flex-row gap-2"
          textClassName="text-white text-base font-semibold"
          iconColor="white"
          onPress={handleSave}
        />

        {/* SECONDARY ACTIONS */}
        <View className="mt-5 border-t border-gray-200 pt-4">
          <Text className="text-gray-700 font-semibold mb-3 mt-8">
            Quick actions
          </Text>

          <View className="flex-row flex-wrap gap-3">
            <CustomButton
              title="Duplicate"
              icon="copy-outline"
              className=" bg-gray-100 rounded-xl py-3 gap-2 w-1/2 flex-1"
              textClassName="text-gray-700 text-sm font-semibold"
              iconColor="#4b5563"
              onPress={() => onDuplicate(job)}
            />

            <CustomButton
              title="Archive job"
              icon="archive-outline"
              className=" bg-gray-100 rounded-xl py-3 gap-2 w-1/2"
              textClassName="text-gray-700 text-sm font-semibold"
              iconColor="#4b5563"
              onPress={() => onArchiveJob(job.id)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditJobModal;