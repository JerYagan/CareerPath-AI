import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import DraggableSheet from "@/components/ui/DraggableSheet";
import CustomButton from "@/components/ui/CustomButton";

const brandBlue = "#1C388E";

type MultiSet = string[];

type FilterSheetProps = {
  visible: boolean;
  onClose: () => void;

  status: MultiSet;
  setStatus: (v: MultiSet) => void;

  experience: MultiSet;
  setExperience: (v: MultiSet) => void;

  skills: MultiSet;
  setSkills: (v: MultiSet) => void;

  education: MultiSet;
  setEducation: (v: MultiSet) => void;

  provinces: MultiSet;
  setProvinces: (v: MultiSet) => void;

  cities: MultiSet;
  setCities: (v: MultiSet) => void;

  onApply: () => void;
  onReset: () => void;
};

const STATUS = ["Available", "Open to Work", "Not Available"];
const EXPERIENCE = ["Entry", "Mid-Level", "Senior"];
const SKILLS = ["React", "TypeScript", "Figma", "Node.js", "UI/UX", "Laravel"];
const EDUCATION = ["High School", "College", "Bachelor's", "Master's", "Doctorate"];
const PROVINCES = ["Metro Manila", "Cavite", "Laguna", "Bulacan"];
const CITIES = ["Quezon City", "Makati", "Manila", "Pasig", "Taguig"];

export default function FilterSheet(props: FilterSheetProps) {
  if (!props.visible) return null;

  const toggle = (setFn: any, current: MultiSet, item: string) => {
    if (current.includes(item)) {
      setFn(current.filter((x: string) => x !== item));
    } else {
      setFn([...current, item]);
    }
  };

  const row = (label: string, items: string[], state: MultiSet, setter: any) => (
    <View className="mt-6">
      <Text className="text-lg font-semibold text-gray-900 mb-2">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {items.map((item) => {
          const active = state.includes(item);
          return (
            <TouchableOpacity
              key={item}
              onPress={() => toggle(setter, state, item)}
              className={`px-4 py-2 rounded-full border ${
                active ? "bg-brandBlue border-brandBlue" : "bg-white border-gray-300"
              }`}
            >
              <Text className={`${active ? "text-white" : "text-gray-700"} font-medium`}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <DraggableSheet visible={props.visible} onClose={props.onClose} height="large">
      <ScrollView className="px-5 pb-20">

        {row("Status", STATUS, props.status, props.setStatus)}
        {row("Experience", EXPERIENCE, props.experience, props.setExperience)}
        {row("Skills", SKILLS, props.skills, props.setSkills)}
        {row("Education", EDUCATION, props.education, props.setEducation)}
        {row("Province", PROVINCES, props.provinces, props.setProvinces)}
        {row("City / Municipality", CITIES, props.cities, props.setCities)}

        <View className="mt-10 flex-row gap-3">
          <CustomButton
            title="Reset"
            icon="refresh-outline"
            className="flex-1 bg-gray-200 rounded-xl py-3"
            textClassName="text-gray-700 font-semibold"
            iconColor="#4b5563"
            onPress={props.onReset}
          />
          <CustomButton
            title="Apply"
            icon="checkmark-circle-outline"
            className="flex-1 bg-brandBlue rounded-xl py-3"
            textClassName="text-white font-semibold"
            iconColor="white"
            onPress={props.onApply}
          />
        </View>

      </ScrollView>
    </DraggableSheet>
  );
}