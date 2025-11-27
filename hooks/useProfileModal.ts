// hooks/useProfileModal.ts
import { useState } from "react";
import type { Field } from "@/components/features/jobseeker/profile/EditModal";
import type { Profile } from "@/types/profile";

interface UseProfileModalResult {
  modalVisible: boolean;
  modalTitle: string;
  modalFields: Field[];
  modalMode: string;
  setModalVisible: (visible: boolean) => void;

  openBasicInfoModal: () => void;
  openEditExperience: (index: number) => void;
  openAddExperience: () => void;
  openEditSkill: (index: number) => void;
  openEditRoadmap: (index: number) => void;
  openCertModal: (index: number) => void;
  openAddCertModal: () => void;
  openLanguagesModal: () => void;
  openResumeModal: () => void;

  handleSave: (updates: any) => void;
  handleUploadFile: (key: string) => void;
  handleRemoveFile: (key: string) => void;
}

export const useProfileModal = (
  profile: Profile,
  recalcProfile: (updater: (prev: Profile) => Profile | Profile) => void
): UseProfileModalResult => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState<Field[]>([]);
  const [modalMode, setModalMode] = useState("");

  const [expIndex, setExpIndex] = useState<number | null>(null);
  const [skillIndex, setSkillIndex] = useState<number | null>(null);
  const [roadmapIndex, setRoadmapIndex] = useState<number | null>(null);
  const [certIndex, setCertIndex] = useState<number | null>(null);

  const openModal = (mode: string, title: string, fields: Field[]) => {
    setModalMode(mode);
    setModalTitle(title);
    setModalFields(fields);
    setModalVisible(true);
  };

  // ----- OPENERS -----

  const openBasicInfoModal = () => {
    openModal("basic-info", "Edit Basic Information", [
      { key: "name", label: "Full Name", type: "text", value: profile.name },
      { key: "position", label: "Position", type: "text", value: profile.position },
      { key: "location", label: "Location", type: "text", value: profile.location },
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
      { key: "company", label: "Company", type: "text", value: exp.company },
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

  const openAddCertModal = () => {
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

  // ----- SAVE HANDLER -----

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
    }

    setModalVisible(false);
  };

  // ----- FILE HANDLERS -----

  const handleUploadFile = (key: string) => {
    console.log("UPLOAD FILE FOR:", key);
    // real file picker logic can go here later
  };

  const handleRemoveFile = (key: string) => {
    console.log("DELETE FILE FOR:", key);
    if (modalMode === "resume") {
      recalcProfile((prev) => ({
        ...prev,
        resume: { fileName: "No resume uploaded", url: "" },
      }));
    }
  };

  return {
    modalVisible,
    modalTitle,
    modalFields,
    modalMode,
    setModalVisible,

    openBasicInfoModal,
    openEditExperience,
    openAddExperience,
    openEditSkill,
    openEditRoadmap,
    openCertModal,
    openAddCertModal,
    openLanguagesModal,
    openResumeModal,

    handleSave,
    handleUploadFile,
    handleRemoveFile,
  };
};