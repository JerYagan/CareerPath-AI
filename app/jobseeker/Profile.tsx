import React, { useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";

import profileData from "@/assets/data/profile.json";

import Tabs from "@/components/ui/SegmentTabs";
import Card from "@/components/features/jobseeker/profile/ProfileCard";
import ExperienceTimeline from "@/components/features/jobseeker/profile/ExperienceTimeline";
import CustomButton from "@/components/ui/CustomButton";
import UniversalEditModal from "@/components/features/jobseeker/profile/EditModal";

import { useProfileState } from "@/hooks/useProfileState";
import { useProfileModal } from "@/hooks/useProfileModal";

const options = ["overview", "experience", "skills", "roadmap"] as const;

const labels = {
  overview: "Overview",
  experience: "Experience",
  skills: "Skills",
  roadmap: "Roadmap",
} as const;

type TabKey = (typeof options)[number];

const Profile = () => {
  const [selected, setSelected] = useState<TabKey>("overview");

  const { profile, recalcProfile } = useProfileState(
    profileData as any // if you want, cast to ProfileBase
  );
  const modal = useProfileModal(profile as any, recalcProfile);

  return (
    <View className="flex-1 bg-gray-50">
      {/* MODAL */}
      <UniversalEditModal
        visible={modal.modalVisible}
        title={modal.modalTitle}
        mode={modal.modalMode}
        fields={modal.modalFields}
        onSave={modal.handleSave}
        onClose={() => modal.setModalVisible(false)}
        onUploadFile={modal.handleUploadFile}
        onDeleteFile={modal.handleRemoveFile}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View className="items-center mt-8 mb-4">
          <View className="relative">
            <Image
              source={
                profile.profilePicture
                  ? { uri: profile.profilePicture }
                  : require("@/assets/images/default-profile.png")
              }
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          </View>

          <Text className="mt-4 text-3xl font-bold text-gray-900">
            {profile.name}
          </Text>
          <Text className="text-gray-600">{profile.position}</Text>
          <Text className="text-gray-500 text-sm">{profile.location}</Text>

          <CustomButton
            title="Edit Basic Info"
            onPress={modal.openBasicInfoModal}
            className="bg-brandBlue rounded-xl mt-4"
            textClassName="text-white"
          />
        </View>

        {/* CONTACT */}
        <View className="flex-row justify-center gap-6">
          <View className="flex-row items-center gap-1">
            <Ionicons name="mail-outline" size={18} color="#555" />
            <Text className="text-gray-700">{profile.email}</Text>
          </View>

          <View className="flex-row items-center gap-1">
            <Ionicons name="call-outline" size={18} color="#555" />
            <Text className="text-gray-700">{profile.phone}</Text>
          </View>
        </View>

        {/* BIO */}
        <View className="px-6 mt-4 mb-4">
          <Text className="text-center text-gray-700 leading-6">
            {profile.description}
          </Text>
        </View>

        {/* COMPLETION BAR */}
        <View className="mx-4 mb-6 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <View className="flex-row justify-between mb-3">
            <Text className="text-lg font-semibold">Profile Completion</Text>
            <Text className="text-lg font-semibold">{profile.completion}%</Text>
          </View>

          <Progress.Bar
            progress={profile.completion / 100}
            width={null}
            height={8}
            color="#1C388E"
            borderRadius={10}
          />
        </View>

        {/* TABS */}
        <View className="px-4 mb-6">
          <Tabs
            options={options}
            labels={labels}
            selected={selected}
            setSelected={setSelected}
          />
        </View>

        {/* TAB CONTENT */}
        <View className="px-4 mb-20 space-y-6">
          {/* OVERVIEW */}
          {selected === "overview" && (
            <>
              <Card title="About Me" icon="person-outline">
                <Text className="text-gray-700">{profile.overview}</Text>
              </Card>

              <Card title="Work Experience" icon="briefcase-outline">
                {profile.experience.map((exp: any, i: number) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => modal.openEditExperience(i)}
                  >
                    <ExperienceTimeline exp={exp} />
                  </TouchableOpacity>
                ))}

                <CustomButton
                  title="+ Add Experience"
                  onPress={modal.openAddExperience}
                  className="mt-2 bg-brandBlue rounded-xl"
                  textClassName="text-white"
                />
              </Card>

              <Card title="Education" icon="school-outline">
                {profile.education.map((edu: any, i: number) => (
                  <View key={i} className="mb-3">
                    <Text className="font-semibold text-lg">{edu.degree}</Text>
                    <Text className="text-gray-600">{edu.school}</Text>
                    <Text className="text-gray-400">{edu.years}</Text>
                  </View>
                ))}
              </Card>

              <Card title="Licenses & Certifications" icon="ribbon-outline">
                {profile.certifications.map((cert: any, i: number) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => modal.openCertModal(i)}
                    className="mb-4"
                  >
                    <Text className="font-semibold">{cert.name}</Text>
                    <Text className="text-gray-600">
                      {cert.organization}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {cert.year}
                    </Text>
                  </TouchableOpacity>
                ))}

                <CustomButton
                  title="+ Add Certificate"
                  onPress={modal.openAddCertModal}
                  className="mt-2 bg-brandBlue rounded-xl"
                  textClassName="text-white"
                />
              </Card>

              <Card title="Languages" icon="language-outline">
                <View className="flex-row flex-wrap gap-2 mb-4">
                  {profile.languages.map((lang: string, i: number) => (
                    <View
                      key={i}
                      className="px-4 py-1.5 bg-indigo-100 rounded-full"
                    >
                      <Text className="text-indigo-800 font-medium">
                        {lang}
                      </Text>
                    </View>
                  ))}
                </View>

                <CustomButton
                  title="Edit Languages"
                  onPress={modal.openLanguagesModal}
                  className="mt-2 bg-brandBlue rounded-xl"
                  textClassName="text-white"
                />
              </Card>

              <Card title="Resume" icon="document-text-outline">
                <Text className="text-gray-700 mb-4">{profile.resume.fileName}</Text>

                <CustomButton
                  title="Edit Resume"
                  onPress={modal.openResumeModal}
                  className="mt-2 bg-brandBlue rounded-xl"
                  textClassName="text-white"
                />
              </Card>
            </>
          )}

          {/* EXPERIENCE */}
          {selected === "experience" && (
            <Card title="All Work Experience" icon="briefcase-outline">
              {profile.experience.map((exp: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => modal.openEditExperience(i)}
                >
                  <ExperienceTimeline exp={exp} />
                </TouchableOpacity>
              ))}

              <CustomButton
                title="+ Add Experience"
                onPress={modal.openAddExperience}
                  className="mt-2 bg-brandBlue rounded-xl"
                  textClassName="text-white"
              />
            </Card>
          )}

          {/* SKILLS */}
          {selected === "skills" && (
            <Card title="Skills" icon="settings-outline">
              {profile.skills.map((skill: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => modal.openEditSkill(i)}
                  className="py-4"
                >
                  <View className="flex-row justify-between mb-1">
                    <Text className="font-medium">{skill.name}</Text>
                    <Text className="text-gray-500">{skill.level}%</Text>
                  </View>

                  <Progress.Bar
                    progress={skill.level / 100}
                    width={null}
                    height={8}
                    color="#1C388E"
                    borderRadius={8}
                  />
                </TouchableOpacity>
              ))}
            </Card>
          )}

          {/* ROADMAP */}
          {selected === "roadmap" && (
            <Card title="Career Roadmap" icon="map-outline">
              {profile.roadmap.map((g: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => modal.openEditRoadmap(i)}
                  className="py-4"
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="font-semibold text-lg w-1/2">{g.title}</Text>

                    <View
                      className={`px-3 py-1 rounded-lg ${
                        g.status === "Completed"
                          ? "bg-brandBlue"
                          : g.status === "In Progress"
                          ? "bg-yellow-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium inline-block ${
                          g.status === "Completed"
                            ? "text-white"
                            : g.status === "In Progress"
                            ? "text-yellow-700"
                            : "text-gray-700"
                        }`}
                      >
                        {g.status}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-gray-600 text-sm">
                    {g.deadline}
                  </Text>

                  <Progress.Bar
                    progress={g.progress / 100}
                    width={null}
                    height={8}
                    borderRadius={8}
                    color={
                      g.status === "Completed"
                        ? "#1C388E"
                        : g.status === "In Progress"
                        ? "#1C388E"
                        : "#9CA3AF"
                    }
                  />
                </TouchableOpacity>
              ))}
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;