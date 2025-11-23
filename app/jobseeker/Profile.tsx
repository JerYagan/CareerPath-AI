import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";

import profileData from "@/assets/data/profile.json";
import Tabs from "@/components/ui/SegmentTabs";
import Card from "@/components/features/jobseeker/profile/Card";
import ExperienceTimeline from "@/components/features/jobseeker/profile/ExperienceTimeline";
import UniversalEditModal, {
  type Field,
} from "@/components/features/jobseeker/profile/EditModal";
import CustomButton from "@/components/ui/CustomButton";

const options = ["overview", "experience", "skills", "roadmap"] as const;
const labels = {
  overview: "Overview",
  experience: "Experience",
  skills: "Skills",
  roadmap: "Roadmap",
};

// ---- AUTO COMPLETION ----

const computeCompletion = (profile: any): number => {
  let score = 0;

  // Basic info: 25%
  const basicFields = [
    profile.name,
    profile.position,
    profile.location,
    profile.email,
    profile.phone,
    profile.description,
    profile.profilePicture,
  ];
  const validBasic = basicFields.filter(
    (x: any) => x && String(x).trim().length > 0
  ).length;
  const basicScore = (validBasic / basicFields.length) * 25;
  score += basicScore;

  // Experience: 20% (at least 1)
  if (Array.isArray(profile.experience) && profile.experience.length > 0) {
    score += 20;
  }

  // Skills: 20% (scaled by up to 3 skills)
  if (Array.isArray(profile.skills) && profile.skills.length > 0) {
    const maxSkills = 3;
    const validSkills = profile.skills.filter(
      (s: any) => s.name && s.level > 0
    ).length;
    const skillsScore = Math.min(validSkills, maxSkills) / maxSkills * 20;
    score += skillsScore;
  }

  // Roadmap: 15%
  if (Array.isArray(profile.roadmap) && profile.roadmap.length > 0) {
    score += 15;
  }

  // Certificates: 10%
  if (
    Array.isArray(profile.certifications) &&
    profile.certifications.length > 0
  ) {
    score += 10;
  }

  // Resume: 5%
  if (profile.resume && profile.resume.url) {
    score += 5;
  }

  // Languages: 5%
  if (Array.isArray(profile.languages) && profile.languages.length > 0) {
    score += 5;
  }

  return Math.round(Math.min(score, 100));
};

const Profile = () => {
  const [selected, setSelected] = useState<keyof typeof labels>("overview");
  const [profile, setProfile] = useState(() => ({
    ...profileData,
    completion: computeCompletion(profileData),
  }));

  // Universal modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState<Field[]>([]);
  const [modalMode, setModalMode] = useState("");

  // State indexes for editing lists
  const [expIndex, setExpIndex] = useState<number | null>(null);
  const [skillIndex, setSkillIndex] = useState<number | null>(null);
  const [roadmapIndex, setRoadmapIndex] = useState<number | null>(null);
  const [certIndex, setCertIndex] = useState<number | null>(null);

  // ---- Helpers ----

  const openModal = (mode: string, title: string, fields: Field[]) => {
    setModalMode(mode);
    setModalTitle(title);
    setModalFields(fields);
    setModalVisible(true);
  };

  const recalcProfile = (updater: (prev: any) => any) => {
    setProfile((prev) => {
      const updated = updater(prev);
      return {
        ...updated,
        completion: computeCompletion(updated),
      };
    });
  };

  // ----- UNIVERSAL MODAL OPENERS -----

  const openBasicInfoModal = () => {
    openModal("basic-info", "Edit Basic Information", [
      { key: "name", label: "Full Name", type: "text", value: profile.name },
      {
        key: "position",
        label: "Position",
        type: "text",
        value: profile.position,
      },
      {
        key: "location",
        label: "Location",
        type: "text",
        value: profile.location,
      },
      { key: "email", label: "Email", type: "text", value: profile.email },
      { key: "phone", label: "Phone", type: "text", value: profile.phone },
      {
        key: "description",
        label: "Bio",
        type: "textarea",
        value: profile.description,
      },
    ]);
  };

  const openEditExperience = (index: number) => {
    setExpIndex(index);
    const exp = profile.experience[index];
    openModal("experience", "Edit Experience", [
      { key: "title", label: "Job Title", type: "text", value: exp.title },
      {
        key: "company",
        label: "Company",
        type: "text",
        value: exp.company,
      },
      { key: "years", label: "Years", type: "text", value: exp.years },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        value: exp.description,
      },
    ]);
  };

  const openAddExperience = () => {
    setExpIndex(null);
    openModal("add-experience", "Add Work Experience", [
      { key: "title", label: "Job Title", type: "text", value: "" },
      { key: "company", label: "Company", type: "text", value: "" },
      { key: "years", label: "Years", type: "text", value: "" },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        value: "",
      },
    ]);
  };

  const openEditSkill = (index: number) => {
    setSkillIndex(index);
    const s = profile.skills[index];
    openModal("skill", "Edit Skill", [
      { key: "name", label: "Skill Name", type: "text", value: s.name },
      {
        key: "level",
        label: "Skill Level (0–100)",
        type: "number",
        value: s.level,
      },
    ]);
  };

  const openEditRoadmap = (index: number) => {
    setRoadmapIndex(index);
    const g = profile.roadmap[index];
    openModal("roadmap", "Edit Roadmap Goal", [
      { key: "title", label: "Goal Title", type: "text", value: g.title },
      {
        key: "status",
        label: "Status",
        type: "select",
        value: g.status,
        options: ["Not Started", "In Progress", "Completed"],
      },
      {
        key: "progress",
        label: "Progress (0–100)",
        type: "number",
        value: g.progress,
      },
      {
        key: "deadline",
        label: "Deadline",
        type: "text",
        value: g.deadline,
      },
    ]);
  };

  const openCertModal = (index: number) => {
    setCertIndex(index);
    const c = profile.certifications[index];
    openModal("certificates", "Edit Certificate", [
      {
        key: "name",
        label: "Certificate Name",
        type: "text",
        value: c.name,
      },
      {
        key: "organization",
        label: "Organization",
        type: "text",
        value: c.organization,
      },
      {
        key: "year",
        label: "Year",
        type: "text",
        value: String(c.year),
      },
    ]);
  };

  const openLanguagesModal = () => {
    openModal("languages", "Manage Languages", [
      {
        key: "languages",
        label: "Languages (comma separated)",
        type: "text",
        value: profile.languages.join(", "),
      },
    ]);
  };

  const openResumeModal = () => {
    openModal("resume", "Resume", [
      {
        key: "file",
        label: "Resume File",
        type: "file",
        value: profile.resume.url ?? null,
      },
    ]);
  };

  const openPhotoModal = () => {
    openModal("photo", "Profile Picture", [
      {
        key: "profilePicture",
        label: "Profile Picture",
        type: "file",
        value: profile.profilePicture,
      },
    ]);
  };

  // ----- UNIVERSAL MODAL SAVE HANDLER -----

  const handleSave = (updates: any) => {
    switch (modalMode) {
      case "basic-info":
        recalcProfile((prev) => ({ ...prev, ...updates }));
        break;

      case "experience":
        if (expIndex !== null) {
          recalcProfile((prev) => {
            const experience = [...prev.experience];
            experience[expIndex] = updates;
            return { ...prev, experience };
          });
        }
        break;

      case "add-experience":
        recalcProfile((prev) => ({
          ...prev,
          experience: [...prev.experience, updates],
        }));
        break;

      case "skill":
        if (skillIndex !== null) {
          recalcProfile((prev) => {
            const skills = [...prev.skills];
            skills[skillIndex] = updates;
            return { ...prev, skills };
          });
        }
        break;

      case "roadmap":
        if (roadmapIndex !== null) {
          recalcProfile((prev) => {
            const roadmap = [...prev.roadmap];
            roadmap[roadmapIndex] = updates;
            return { ...prev, roadmap };
          });
        }
        break;

      case "languages":
        recalcProfile((prev) => ({
          ...prev,
          languages: updates.languages
            .split(",")
            .map((x: string) => x.trim())
            .filter((x: string) => x.length > 0),
        }));
        break;

      case "certificates":
        if (certIndex !== null) {
          recalcProfile((prev) => {
            const certifications = [...prev.certifications];
            certifications[certIndex] = updates;
            return { ...prev, certifications };
          });
        } else {
          // add new certificate
          recalcProfile((prev) => ({
            ...prev,
            certifications: [...prev.certifications, updates],
          }));
        }
        break;

      case "resume":
        recalcProfile((prev) => ({
          ...prev,
          resume: {
            fileName: "Updated_Resume.pdf",
            url: "file:///updated.pdf",
          },
        }));
        break;

      case "photo":
        recalcProfile((prev) => ({
          ...prev,
          profilePicture: prev.profilePicture,
        }));
        break;
    }
  };

  const handleUploadFile = (key: string) => {
    console.log("UPLOAD FILE FOR:", key);
  };

  const handleRemoveFile = (key: string) => {
    console.log("DELETE FILE FOR:", key);
    if (modalMode === "resume") {
      recalcProfile((prev) => ({
        ...prev,
        resume: { fileName: "No resume uploaded", url: "" },
      }));
    }
    if (modalMode === "photo") {
      recalcProfile((prev) => ({
        ...prev,
        profilePicture: "https://via.placeholder.com/150",
      }));
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* UNIVERSAL EDIT MODAL */}
      <UniversalEditModal
        visible={modalVisible}
        title={modalTitle}
        mode={modalMode}
        fields={modalFields}
        onSave={handleSave}
        onClose={() => setModalVisible(false)}
        onUploadFile={handleUploadFile}
        onDeleteFile={handleRemoveFile}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View className="items-center mt-8 mb-4">
          <View className="relative">
            <Image
              source={{ uri: profile.profilePicture }}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />

            <TouchableOpacity
              className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow"
              onPress={openPhotoModal}
            >
              <Ionicons name="camera-outline" size={18} color="#444" />
            </TouchableOpacity>
          </View>

          <View className="items-center mt-4 mb-2">
            <Text className="text-3xl font-bold text-gray-900">
              {profile.name}
            </Text>
            <Text className="text-gray-600 mt-1">{profile.position}</Text>
            <Text className="text-gray-500 text-sm">{profile.location}</Text>
          </View>

          {/* BASIC INFO EDIT BUTTON */}
          <CustomButton
            title="Edit Basic Info"
            onPress={openBasicInfoModal}
            className="bg-indigo-600 mt-2 rounded-xl"
            textClassName="text-white"
          />
        </View>

        {/* CONTACT */}
        <View className="flex-row justify-center gap-6 mb-3">
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
        <View className="px-6 mb-6">
          <Text className="text-center text-gray-700 leading-6">
            {profile.description}
          </Text>
        </View>

        {/* PROFILE COMPLETION */}
        <View className="mx-4 mb-8 p-5 rounded-2xl bg-white shadow-sm border border-gray-200">
          <View className="flex-row justify-between mb-3">
            <Text className="text-lg font-semibold text-gray-800">
              Profile Completion
            </Text>
            <Text className="text-lg font-semibold text-gray-800">
              {profile.completion}%
            </Text>
          </View>

          <Progress.Bar
            progress={profile.completion / 100}
            width={null}
            height={8}
            color="#4F46E5"
            borderRadius={10}
          />
        </View>

        {/* TABS */}
        <View className="px-4 mb-5">
          <Tabs
            options={options}
            labels={labels}
            selected={selected}
            setSelected={setSelected}
            activeColor="#1F2937"
            inactiveColor="#9CA3AF"
          />
        </View>

        {/* CONTENT */}
        <View className="px-4 mb-20 space-y-6">
          {/* OVERVIEW */}
          {selected === "overview" && (
            <>
              <Card title="About Me" icon="person-outline">
                <Text className="text-gray-700 leading-6">
                  {profile.overview}
                </Text>
              </Card>

              <Card title="Work Experience" icon="briefcase-outline">
                {profile.experience.map((exp: any, i: number) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => openEditExperience(i)}
                    activeOpacity={0.7}
                  >
                    <ExperienceTimeline exp={exp} />
                  </TouchableOpacity>
                ))}

                <View className="mt-2">
                  <CustomButton
                    title="+ Add Experience"
                    onPress={openAddExperience}
                    className="bg-indigo-50 rounded-xl"
                    textClassName="text-indigo-700"
                  />
                </View>
              </Card>

              <Card title="Education" icon="school-outline">
                {profile.education.map((edu: any, i: number) => (
                  <View key={i} className="mb-3">
                    <Text className="font-semibold text-lg text-gray-900">
                      {edu.degree}
                    </Text>
                    <Text className="text-gray-600">{edu.school}</Text>
                    <Text className="text-gray-400">{edu.years}</Text>
                  </View>
                ))}
              </Card>

              <Card title="Licenses & Certifications" icon="ribbon-outline">
                {profile.certifications.map((cert: any, i: number) => (
                  <TouchableOpacity
                    key={i}
                    className="mb-3"
                    onPress={() => openCertModal(i)}
                    activeOpacity={0.7}
                  >
                    <Text className="font-semibold text-gray-900">
                      {cert.name}
                    </Text>
                    <Text className="text-gray-600">
                      {cert.organization}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {cert.year}
                    </Text>
                  </TouchableOpacity>
                ))}

                <View className="mt-2">
                  <CustomButton
                    title="+ Add Certificate"
                    onPress={() => {
                      setCertIndex(null);
                      openModal("certificates", "Add Certificate", [
                        {
                          key: "name",
                          label: "Certificate Name",
                          type: "text",
                          value: "",
                        },
                        {
                          key: "organization",
                          label: "Organization",
                          type: "text",
                          value: "",
                        },
                        {
                          key: "year",
                          label: "Year",
                          type: "text",
                          value: "",
                        },
                      ]);
                    }}
                    className="bg-indigo-50 rounded-xl"
                    textClassName="text-indigo-700"
                  />
                </View>
              </Card>

              <Card title="Languages" icon="language-outline">
                <View className="flex-row flex-wrap gap-2">
                  {profile.languages.map((lang: string, i: number) => (
                    <View
                      key={i}
                      className="px-4 py-1.5 bg-indigo-100 rounded-full border border-indigo-200"
                    >
                      <Text className="text-indigo-800 font-medium">
                        {lang}
                      </Text>
                    </View>
                  ))}
                </View>

                <View className="mt-3">
                  <CustomButton
                    title="Edit Languages"
                    onPress={openLanguagesModal}
                    className="bg-indigo-50 rounded-xl"
                    textClassName="text-indigo-700"
                  />
                </View>
              </Card>

              <Card title="Resume" icon="document-text-outline">
                <Text className="text-gray-700">
                  {profile.resume.fileName}
                </Text>

                <View className="mt-3">
                  <CustomButton
                    title="Edit Resume"
                    onPress={openResumeModal}
                    className="bg-indigo-50 rounded-xl"
                    textClassName="text-indigo-700"
                  />
                </View>
              </Card>
            </>
          )}

          {/* EXPERIENCE */}
          {selected === "experience" && (
            <Card title="All Work Experience" icon="briefcase-outline">
              {profile.experience.map((exp: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => openEditExperience(i)}
                  activeOpacity={0.7}
                >
                  <ExperienceTimeline exp={exp} />
                </TouchableOpacity>
              ))}

              <View className="mt-2">
                <CustomButton
                  title="+ Add Experience"
                  onPress={openAddExperience}
                  className="bg-indigo-50 rounded-xl"
                  textClassName="text-indigo-700"
                />
              </View>
            </Card>
          )}

          {/* SKILLS */}
          {selected === "skills" && (
            <Card title="Skills" icon="settings-outline">
              {profile.skills.map((skill: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.7}
                  onPress={() => openEditSkill(i)}
                  className="mb-6"
                >
                  <View className="flex-row justify-between">
                    <Text className="font-medium text-gray-800">
                      {skill.name}
                    </Text>
                    <Text className="text-gray-500">
                      {skill.level}%
                    </Text>
                  </View>

                  <Progress.Bar
                    progress={skill.level / 100}
                    width={null}
                    color="#4F46E5"
                    height={8}
                    borderRadius={8}
                    unfilledColor="#E5E7EB"
                    className="mt-1"
                  />
                </TouchableOpacity>
              ))}
            </Card>
          )}

          {/* ROADMAP */}
          {selected === "roadmap" && (
            <Card title="Career Roadmap" icon="map-outline">
              {profile.roadmap.map((goal: any, i: number) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  onPress={() => openEditRoadmap(i)}
                  className="p-1 mb-2"
                >
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="font-semibold text-gray-900 w-1/2">
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

                  <Text className="text-gray-600 text-sm">
                    {goal.deadline}
                  </Text>

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
                    className="mt-2"
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
