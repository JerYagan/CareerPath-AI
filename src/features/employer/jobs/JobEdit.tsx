import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/src/components/ui/CustomButton";
import { Job } from "@/src/types/jobs";
import JobForm from "./JobForm";

const brandBlue = "#1C388E";

type Props = {
  visible: boolean;
  onClose: () => void;
  job: Job | null;
  onSubmit: (updated: Job) => void;
  onCloseJob: (id: string) => void;
  onArchiveJob: (id: string) => void;
};

const JobEdit = ({
  visible,
  onClose,
  job,
  onSubmit,
  onCloseJob,
  onArchiveJob,
}: Props) => {
  if (!visible || !job) return null;

  // FORM STATE
  const [title, setTitle] = useState(job.title);
  const [location, setLocation] = useState(job.location);
  const [description, setDescription] = useState(job.description);

  const [jobType, setJobType] = useState(job.jobType);
  const [workSetup, setWorkSetup] = useState(job.workSetup);
  const [experienceLevel, setExperienceLevel] = useState(job.experienceLevel);
  const [status, setStatus] = useState(job.status);

  // Salary Range
  const [minSalary, setMinSalary] = useState(
    job.salaryRange.split("-")[0].replace(/₱|,/g, "").trim()
  );
  const [maxSalary, setMaxSalary] = useState(
    job.salaryRange
      .split("-")[1]
      .replace(/₱|\/month|,/g, "")
      .trim()
  );

  // DROPDOWN OPTIONS
  const JOB_TYPES = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
  ] as const;
  const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior"] as const;
  const WORK_SETUP = ["Remote", "Hybrid", "On-site"] as const;
  const STATUS_OPTIONS = ["Active", "Draft", "Closed"] as const;

  function Dropdown<T extends string>({
    label,
    value,
    options,
    onSelect,
  }: {
    label: string;
    value: T;
    options: readonly T[];
    onSelect: (v: T) => void;
  }) {
    const [open, setOpen] = useState(false);

    return (
      <View className="mb-4">
        <Text className="text-gray-700 mb-1 font-medium">{label}</Text>

        {/* FIELD */}
        <TouchableOpacity
          onPress={() => setOpen(!open)}
          className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
        >
          <Text className="text-gray-900">{value}</Text>
          <Ionicons
            name={open ? "chevron-up-outline" : "chevron-down-outline"}
            size={20}
            color="#6b7280"
          />
        </TouchableOpacity>

        {/* OPTIONS */}
        {open && (
          <View className="mt-1 bg-white border border-gray-200 rounded-lg shadow-md">
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                className="px-4 py-3"
                onPress={() => {
                  onSelect(opt); // <-- CORRECT TYPE!
                  setOpen(false);
                }}
              >
                <Text className="text-gray-800">{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="flex-row items-center px-5 pt-4 pb-3 border-b border-gray-100">
          <TouchableOpacity onPress={onClose} className="mr-2 p-1 rounded-full">
            <Ionicons name="chevron-back" size={24} color={brandBlue} />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-gray-900">Edit Job</Text>
        </View>

        {/* FORM CONTENT */}
        <ScrollView className="px-6 pt-4 pb-24" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }} >
          <JobForm
            initial={{
              ...job,
              minSalary,
              maxSalary,
              tags: job.tags,
            }}
            onSubmit={(data) => {
              onSubmit({ ...job, ...data });
              onClose();
            }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default JobEdit;
