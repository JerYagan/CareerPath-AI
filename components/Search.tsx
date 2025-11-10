import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomModal from "./BottomModal";
import locations from "../assets/data/locations.json";

const Search = () => {
  const [location, setLocation] = useState("Select Location");
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");

  const [job, setJob] = useState("Select a Job");
  const [modalJobVisible, setModalJobVisible] = useState(false);
  const [jobQuery, setJobQuery] = useState("");
  const [recentJobs, setRecentJobs] = useState<string[]>([
    "Frontend Developer",
    "UI/UX Designer",
  ]);

  const jobList = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Backend Developer",
    "Data Analyst",
    "Frontend Developer",
  ];

  return (
    <View className="p-4">
      <View className="flex-row space-x-2 border border-gray-300 rounded-xl">
        <TouchableOpacity
          className="flex-[1.3] flex-row gap-2 px-4 py-3 items-center"
          onPress={() => setModalJobVisible(true)}
        >
          <Ionicons name="search-outline" size={18} />
          <Text className="text-black font-semibold text-center">{job}</Text>
        </TouchableOpacity>

        <View className="my-auto h-8 w-[1px] bg-gray-300" />

        <TouchableOpacity
          className="flex-1 flex-row gap-2 px-4 py-3 justify-center items-center"
          onPress={() => setModalLocationVisible(true)}
        >
          <Ionicons name="location-outline" size={18} />
          <Text className="text-black font-semibold text-center">{location}</Text>
        </TouchableOpacity>
      </View>

      {/* Location Modal */}
      <BottomModal
        visible={modalLocationVisible}
        onClose={() => setModalLocationVisible(false)}
        title="Select Location"
        query={locationQuery}
        setQuery={setLocationQuery}
        data={locations}
        type="location"
        onSelect={(val) => {
          setLocation(val);
          setModalLocationVisible(false);
          setLocationQuery("");
        }}
      />

      {/* Job Modal */}
      <BottomModal
        visible={modalJobVisible}
        onClose={() => setModalJobVisible(false)}
        title="Select Job"
        query={jobQuery}
        setQuery={setJobQuery}
        data={jobList}
        type="job"
        recent={recentJobs}
        onSelect={(val) => {
          setJob(val);
          setModalJobVisible(false);
          setJobQuery("");
          // update recent searches
          setRecentJobs((prev) => [val, ...prev.filter((v) => v !== val)]);
        }}
      />
    </View>
  );
};

export default Search;