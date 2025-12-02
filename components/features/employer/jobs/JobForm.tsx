import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";
import TagsPreview from "@/components/ui/TagsPreview";
import DraggableSheet from "@/components/ui/DraggableSheet";
import SearchBar from "@/components/ui/SearchBar";

const brandBlue = "#1C388E";

// ---- Dropdown Component ----
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

      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen(!open);
        }}
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

// ---- Tag Selector Modal ----
export const TagSelectorModal = ({
  visible,
  onClose,
  selected,
  onUpdate,
}: {
  visible: boolean;
  onClose: () => void;
  selected: string[];
  onUpdate: (t: string[]) => void;
}) => {
  const ALL_TAGS = [
    "React",
    "UI/UX",
    "Leadership",
    "Remote",
    "Communication",
    "Project Mgmt",
    "TypeScript",
    "SQL",
    "CSR",
    "Salesforce",
    "Data Entry",
    "Scrum",
    "Agile",
    "Backend",
    "Frontend",
    "API Design",
    "Testing",
    "DevOps",
  ];

  const [search, setSearch] = useState("");

  const filteredTags = ALL_TAGS.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  function toggleTag(tag: string) {
    if (selected.includes(tag)) {
      onUpdate(selected.filter((s) => s !== tag));
    } else {
      onUpdate([...selected, tag]);
    }
  }

  return (
    <DraggableSheet visible={visible} onClose={onClose} height="large">
      {/* TITLE */}
      <Text className="text-xl font-semibold text-gray-900 mb-4">
        Select Tags
      </Text>

      {/* SEARCH */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search tags..."
        showFilter={false}
      />

      {/* TAG LIST */}
      <ScrollView
        className="flex-1 mt-2"
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap gap-2">
          {filteredTags.map((tag) => {
            const active = selected.includes(tag);

            return (
              <TouchableOpacity
                key={tag}
                onPress={() => toggleTag(tag)}
                className={`px-3 py-2 rounded-full border ${
                  active
                    ? "bg-brandBlue border-brandBlue"
                    : "bg-gray-100 border-gray-200"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    active ? "text-white" : "text-gray-700"
                  }`}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* DONE BUTTON */}
      <CustomButton
        title="Done"
        icon="checkmark-outline"
        className="bg-brandBlue rounded-xl mt-4"
        textClassName="text-white"
        iconColor="white"
        onPress={onClose}
      />
    </DraggableSheet>
  );
};

// ---- Success Banner ----
export const SuccessBanner = ({ message }: { message: string }) => (
  <View className="absolute top-4 left-4 right-4 bg-green-600 py-3 rounded-xl">
    <Text className="text-white text-center font-semibold">{message}</Text>
  </View>
);

// ---- MAIN JOB FORM ----
export default function JobForm({
  initial = {},
  onSubmit,
}: {
  initial?: any;
  onSubmit: (data: any) => void;
}) {
  const [title, setTitle] = useState(initial.title ?? "");
  const [location, setLocation] = useState(initial.location ?? "");
  const [description, setDescription] = useState(initial.description ?? "");

  const [jobType, setJobType] = useState(initial.jobType ?? "Full-time");
  const [workSetup, setWorkSetup] = useState(initial.workSetup ?? "Remote");
  const [experienceLevel, setExperienceLevel] = useState(
    initial.experienceLevel ?? "Entry"
  );
  const [status, setStatus] = useState(initial.status ?? "Draft");

  const [minSalary, setMinSalary] = useState(initial.minSalary ?? "");
  const [maxSalary, setMaxSalary] = useState(initial.maxSalary ?? "");

  const [tags, setTags] = useState(initial.tags ?? []);
  const [tagModalVisible, setTagModalVisible] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Validate before submit
  function handleSubmit() {
    if (!title || !location || !description) {
      setError("Please fill all required fields.");
      return;
    }

    if (!minSalary || !maxSalary) {
      setError("Please input a valid salary range.");
      return;
    }

    setError(null);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);

    onSubmit({
      title,
      location,
      description,
      jobType,
      workSetup,
      experienceLevel,
      status,
      tags,
      salaryRange: `₱${minSalary} - ₱${maxSalary} / month`,
    });
  }

  // Label color based on error
  const labelClass = (field: string) =>
    error && !field ? "text-red-600" : "text-gray-700";

  return (
    <View>
      {success && <SuccessBanner message="Job saved successfully!" />}

      {error && <Text className="text-red-600 mb-3 font-medium">{error}</Text>}

      {/* Title */}
      <Text className={`mb-1 font-medium ${labelClass(title)}`}>Job Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
      />

      {/* Location */}
      <Text className={`mb-1 font-medium ${labelClass(location)}`}>
        Location
      </Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
      />

      {/* DROPDOWNS */}
      <Dropdown
        label="Job Type"
        value={jobType}
        options={["Full-time", "Part-time", "Contract", "Internship"] as const}
        onSelect={setJobType}
      />

      <Dropdown
        label="Work Setup"
        value={workSetup}
        options={["Remote", "Hybrid", "On-site"] as const}
        onSelect={setWorkSetup}
      />

      <Dropdown
        label="Experience Level"
        value={experienceLevel}
        options={["Entry", "Mid", "Senior"] as const}
        onSelect={setExperienceLevel}
      />

      <Dropdown
        label="Job Status"
        value={status}
        options={["Active", "Draft", "Closed"] as const}
        onSelect={setStatus}
      />

      {/* Salary */}
      <Text className={`mb-1 font-medium ${labelClass(minSalary)}`}>
        Salary Range (₱)
      </Text>
      <View className="flex-row gap-3 mb-4">
        <TextInput
          value={minSalary}
          onChangeText={setMinSalary}
          keyboardType="numeric"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
          placeholder="Min"
        />
        <TextInput
          value={maxSalary}
          onChangeText={setMaxSalary}
          keyboardType="numeric"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
          placeholder="Max"
        />
      </View>

      {/* TAGS */}
      <Text className="text-gray-700 mb-1 font-medium">Tags</Text>
      <TagsPreview skills={tags} onPress={() => setTagModalVisible(true)} />

      {tagModalVisible && (
        <TagSelectorModal
          visible={tagModalVisible}
          selected={tags}
          onUpdate={setTags}
          onClose={() => setTagModalVisible(false)}
        />
      )}

      {/* DESCRIPTION */}
      <Text className={`mt-4 mb-1 font-medium ${labelClass(description)}`}>
        Job Description
      </Text>

      <CustomButton
        title="AI Generate"
        icon="sparkles-outline"
        className="bg-gray-100 rounded-xl mb-2"
        textClassName="text-gray-700"
        iconColor="#4b5563"
        onPress={() => console.log("AI Generate Description")}
      />

      <TextInput
        value={description}
        onChangeText={setDescription}
        className="border border-gray-300 rounded-lg px-4 py-3 h-48"
        multiline
        style={{ textAlignVertical: "top" }}
      />

      <CustomButton
        title="Save"
        icon="checkmark-circle-outline"
        className="bg-brandBlue rounded-xl mt-6 gap-2"
        textClassName="text-white"
        iconColor="white"
        onPress={handleSubmit}
      />
    </View>
  );
}
