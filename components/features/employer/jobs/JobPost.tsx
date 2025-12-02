import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import JobForm from "./JobForm";

const brandBlue = "#1C388E";

type Props = {
  onClose: () => void;
};

const JobPost: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [jobType, setJobType] = useState<"Full-time" | "Part-time" | "Contract" | "Internship">("Full-time");
  const [workSetup, setWorkSetup] = useState<"Remote" | "Hybrid" | "On-site">("Remote");
  const [experienceLevel, setExperienceLevel] = useState<"Entry" | "Mid" | "Senior">("Entry");
  const [status, setStatus] = useState<"Active" | "Draft" | "Closed">("Draft");

  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  // Placeholder tags (optional)
  const [tags] = useState(["React", "UI/UX", "Remote", "Mid-level"]);

  // DROPDOWN OPTIONS
  const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;
  const WORK_SETUP = ["Remote", "Hybrid", "On-site"] as const;
  const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior"] as const;
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
                  onSelect(opt);
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

  function handleSubmit() {
    console.log("NEW JOB:", {
      title,
      location,
      jobType,
      workSetup,
      experienceLevel,
      status,
      salaryRange: `₱${minSalary} - ₱${maxSalary} / month`,
      description,
      tags,
    });

    onClose();
  }

  return (
    <Modal visible={true} animationType="slide" transparent={false}>
      <View className="flex-1 bg-white">
        {/* HEADER */}
        <View className="flex-row items-center px-5 pt-4 pb-3 border-b border-gray-200">
          <TouchableOpacity onPress={onClose} className="mr-3 p-1 rounded-full">
            <Ionicons name="chevron-back" size={26} color={brandBlue} />
          </TouchableOpacity>

          <Text className="text-xl font-semibold text-gray-900">
            Post New Job
          </Text>
        </View>

        <ScrollView className="px-6 pt-4 pb-24" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }} >
          <JobForm
            initial={{}}
            onSubmit={(data) => {
              console.log("New Job:", data);
              onClose();
            }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default JobPost;