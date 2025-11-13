import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";
import profileData from "@/assets/data/profile.json";
import Tabs from "@/components/Tabs"; // <-- your animated tabs component

const options = ["overview", "experience", "skills", "roadmap"] as const;
const labels = {
  overview: "Overview",
  experience: "Experience",
  skills: "Skills",
  roadmap: "Roadmap",
};

const Profile = () => {
  const [selected, setSelected] =
    useState<keyof typeof labels>("overview");
  const user = profileData;

  return (
    <View className="mx-4 mt-4 flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mb-6">
          <TouchableOpacity onPress={() => console.log("Change photo")}>
            <Image
              source={{ uri: user.profilePicture }}
              className="w-28 h-28 rounded-full mb-3 border-2 border-gray-200"
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">{user.name}</Text>
          <Text className="text-gray-600">{user.position}</Text>
          <Text className="text-gray-500">{user.location}</Text>
        </View>

        {/* Contact Info */}
        <View className="flex-row justify-around mb-4">
          <View className="flex-row items-center gap-2">
            <Ionicons name="mail-outline" size={18} color="#555" />
            <Text className="text-gray-700">{user.email}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="call-outline" size={18} color="#555" />
            <Text className="text-gray-700">{user.phone}</Text>
          </View>
        </View>

        {/* Description */}
        <Text className="text-gray-800 text-center mb-4">
          {user.description}
        </Text>

        {/* Profile Completion */}
        <View className="mb-6 px-6 py-4 rounded-lg bg-blue-50 border border-blue-600">
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-700 font-semibold text-lg">
              Profile Completion:
            </Text>
            <Text className="text-gray-700 font-semibold text-lg">
              {user.completion}%
            </Text>
          </View>
          <Progress.Bar
            progress={user.completion / 100}
            width={null}
            color="#333"
            height={8}
            borderRadius={8}
            className="my-4"
          />
          <Text className="text-sm text-blue-600">
            Complete your profile to increase your chances of being discovered
            by employers
          </Text>
        </View>

        {/* 🔥 Animated Tabs */}
        <Tabs
          options={options}
          labels={labels}
          selected={selected}
          setSelected={setSelected}
          activeColor="#000"
          inactiveColor="#6b7280"
        />

        {/* --- TABS CONTENT BELOW --- */}

        {selected === "overview" && (
          <View className="flex- flex-col gap-4">
            {/* About Me */}
            <View className="p-6 bg-white border border-gray-300 rounded-lg">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-semibold text-gray-800">
                  About Me
                </Text>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={20} color="#555" />
                </TouchableOpacity>
              </View>
              <Text className="text-gray-700">{user.overview}</Text>
            </View>

            {/* Work Experience */}
            <View className="p-6 bg-white border border-gray-300 rounded-lg">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="briefcase-outline" size={20} color="#333" />
                  <Text className="text-lg font-semibold text-gray-800">
                    Work Experience
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={20} color="#555" />
                </TouchableOpacity>
              </View>
              {user.experience.map((exp, i) => (
                <View key={i} className="mb-3">
                  <Text className="font-bold text-gray-900">{exp.title}</Text>
                  <Text className="text-gray-600">{exp.company}</Text>
                  <Text className="text-gray-500 text-sm mb-1">
                    {exp.years}
                  </Text>
                  <Text className="text-gray-700">{exp.description}</Text>
                </View>
              ))}
            </View>

            {/* Education */}
            <View className="p-6 bg-white border border-gray-300 rounded-lg">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="school-outline" size={20} color="#333" />
                  <Text className="text-lg font-semibold text-gray-800">
                    Education
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={20} color="#555" />
                </TouchableOpacity>
              </View>
              {user.education.map((edu, i) => (
                <View key={i} className="mb-2">
                  <Text className="font-bold text-gray-900">{edu.degree}</Text>
                  <Text className="text-gray-600">{edu.school}</Text>
                  <Text className="text-gray-500 text-sm">{edu.years}</Text>
                </View>
              ))}
            </View>

            {/* Certifications */}
            <View className="p-6 bg-white border border-gray-300 rounded-lg">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="ribbon-outline" size={20} color="#333" />
                  <Text className="text-lg font-semibold text-gray-800">
                    Licenses & Certifications
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={20} color="#555" />
                </TouchableOpacity>
              </View>
              {user.certifications.map((cert, i) => (
                <View key={i} className="mb-2">
                  <Text className="font-bold text-gray-900">{cert.name}</Text>
                  <Text className="text-gray-600">{cert.organization}</Text>
                  <Text className="text-gray-500 text-sm">{cert.year}</Text>
                </View>
              ))}
            </View>

            {/* Languages */}
            <View className="p-6 bg-white border border-gray-300 rounded-lg">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="language-outline" size={20} color="#333" />
                  <Text className="text-lg font-semibold text-gray-800">
                    Languages
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={20} color="#555" />
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {user.languages.map((lang, i) => (
                  <View
                    key={i}
                    className="px-3 py-1 bg-indigo-100 border border-indigo-200 rounded-full"
                  >
                    <Text className="text-indigo-800">{lang}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Resume */}
            <View className="p-6 bg-white border border-gray-300 rounded-lg mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-2">
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color="#333"
                  />
                  <Text className="text-lg font-semibold text-gray-800">
                    Resume
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons
                    name="cloud-download-outline"
                    size={20}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>
              <Text className="text-gray-700">{user.resume.fileName}</Text>
            </View>
          </View>
        )}

        {/* EXPERIENCE TAB */}
        {selected === "experience" && (
          <View className="p-6 bg-white border border-gray-300 rounded-lg">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center gap-2">
                <Ionicons name="briefcase-outline" size={20} color="#333" />
                <Text className="text-lg font-semibold text-gray-800">
                  All Work Experience
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color="#555" />
              </TouchableOpacity>
            </View>
            {user.experience.map((exp, i) => (
              <View key={i} className="mb-3">
                <Text className="font-bold text-gray-900">{exp.title}</Text>
                <Text className="text-gray-600">{exp.company}</Text>
                <Text className="text-gray-500 text-sm mb-1">{exp.years}</Text>
                <Text className="text-gray-700">{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* SKILLS TAB */}
        {selected === "skills" && (
          <View className="p-6 bg-white border border-gray-300 rounded-lg space-y-4 mb-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-gray-800">
                Skills
              </Text>
              <TouchableOpacity
                onPress={() => console.log("Add Skill")}
                className="flex-row items-center gap-1 bg-indigo-950 px-3 py-2 rounded-md"
              >
                <Ionicons name="add-outline" size={16} color="white" />
                <Text className="text-white font-medium text-sm">
                  Add Skill
                </Text>
              </TouchableOpacity>
            </View>

            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, i) => (
                <View key={i} className="mb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-800 font-medium">
                      {skill.name}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {skill.level}%
                    </Text>
                  </View>
                  <Progress.Bar
                    progress={skill.level / 100}
                    width={null}
                    color="#4338CA"
                    height={8}
                    borderRadius={8}
                    unfilledColor="#E5E7EB"
                  />
                </View>
              ))
            ) : (
              <View className="items-center p-6">
                <Ionicons name="construct-outline" size={32} color="#9CA3AF" />
                <Text className="text-gray-500 mt-2">No skills added yet</Text>
              </View>
            )}
          </View>
        )}

        {/* ROADMAP TAB */}
        {selected === "roadmap" && (
          <View className="p-4 bg-white border border-gray-300 rounded-lg space-y-4 mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-gray-800">
                Career Roadmap
              </Text>
              <TouchableOpacity
                onPress={() => console.log("Add Goal")}
                className="flex-row items-center gap-1 bg-indigo-950 px-3 py-2 rounded-md"
              >
                <Ionicons name="add-outline" size={16} color="white" />
                <Text className="text-white font-medium text-sm">Add Goal</Text>
              </TouchableOpacity>
            </View>

            {user.roadmap && user.roadmap.length > 0 ? (
              user.roadmap.map((goal, i) => (
                <View
                  key={i}
                  className="p-4 border border-gray-200 rounded-lg mb-3"
                >
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-lg font-semibold text-gray-900">
                      {goal.title}
                    </Text>

                    <View
                      className={`px-3 py-1 rounded-full ${
                        goal.status === "Completed"
                          ? "bg-green-100"
                          : goal.status === "In Progress"
                            ? "bg-yellow-100"
                            : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`text-xs font-medium ${
                          goal.status === "Completed"
                            ? "text-green-700"
                            : goal.status === "In Progress"
                              ? "text-yellow-700"
                              : "text-gray-700"
                        }`}
                      >
                        {goal.status}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-600 text-sm">
                      Deadline: {goal.deadline}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {goal.progress}%
                    </Text>
                  </View>

                  <Progress.Bar
                    progress={goal.progress / 100}
                    width={null}
                    color={
                      goal.status === "Completed"
                        ? "#22C55E"
                        : goal.status === "In Progress"
                          ? "#FACC15"
                          : "#9CA3AF"
                    }
                    height={8}
                    borderRadius={8}
                    unfilledColor="#E5E7EB"
                  />
                </View>
              ))
            ) : (
              <View className="items-center p-6">
                <Ionicons name="map-outline" size={32} color="#9CA3AF" />
                <Text className="text-gray-500 mt-2">No roadmap goals yet</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Profile;