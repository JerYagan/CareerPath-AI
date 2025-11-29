// components/features/employer/applications/FilterSheet.tsx
import React, { Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import DraggableSheet from "@/components/ui/DraggableSheet";
import CustomButton from "@/components/ui/CustomButton";
import type { ApplicationStatus } from "@/app/employer/Applications";

const STATUS_OPTIONS: ApplicationStatus[] = [
  "Under Review",
  "Shortlisted",
  "Interview",
  "Not Qualified",
  "Accepted",
];

const LEVEL_OPTIONS = ["Entry-level", "Mid-level", "Senior"] as const;

type Props = {
  visible: boolean;
  onClose: () => void;

  selectedStatuses: ApplicationStatus[];
  setSelectedStatuses: Dispatch<SetStateAction<ApplicationStatus[]>>;

  selectedLevels: string[];
  setSelectedLevels: Dispatch<SetStateAction<string[]>>;

  onReset: () => void;
  onApply: () => void;
};

export default function FilterSheet({
  visible,
  onClose,
  selectedStatuses,
  setSelectedStatuses,
  selectedLevels,
  setSelectedLevels,
  onReset,
  onApply,
}: Props) {
  if (!visible) return null;

  const toggleItem = <T extends string>(
    current: T[],
    setter: Dispatch<SetStateAction<T[]>>,
    value: T
  ) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  const renderRow = <T extends string>(
    label: string,
    options: readonly T[],
    selected: T[],
    setter: Dispatch<SetStateAction<T[]>>
  ) => (
    <View className="mt-6">
      <Text className="text-lg font-semibold text-gray-900 mb-2">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <TouchableOpacity
              key={opt}
              onPress={() => toggleItem(selected, setter, opt)}
              className={`px-4 py-2 rounded-full border ${
                active
                  ? "bg-brandBlue border-brandBlue"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`font-medium ${
                  active ? "text-white" : "text-gray-700"
                }`}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <DraggableSheet visible={visible} onClose={onClose} height="large">
      <ScrollView className="px-5 pb-20">
        {renderRow<ApplicationStatus>(
          "Status",
          STATUS_OPTIONS,
          selectedStatuses,
          setSelectedStatuses
        )}

        {renderRow<string>(
          "Experience Level",
          LEVEL_OPTIONS,
          selectedLevels,
          setSelectedLevels
        )}

        <View className="mt-10 flex-row gap-3">
          <CustomButton
            title="Reset"
            icon="refresh-outline"
            className="flex-1 bg-gray-200 rounded-xl py-3"
            textClassName="text-gray-700 font-semibold"
            iconColor="#4b5563"
            onPress={onReset}
          />
          <CustomButton
            title="Apply"
            icon="checkmark-circle-outline"
            className="flex-1 bg-brandBlue rounded-xl py-3"
            textClassName="text-white font-semibold"
            iconColor="white"
            onPress={onApply}
          />
        </View>
      </ScrollView>
    </DraggableSheet>
  );
}