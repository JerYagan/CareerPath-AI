import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Linking,
  Pressable,
} from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import DraggableSheet from "@/components/ui/DraggableSheet";
import ResumeViewerSheet from "./ApplicationResume";
import ApplicationNotes from "./ApplicationNotes";
import type { ApplicationStatus, Application } from "@/app/employer/Applications";
import TagsModal from "@/components/ui/TagsModal";
import TagsPreview from "@/components/ui/TagsPreview";

const brandBlue = "#1C388E";

type ApplicantProfileProps = {
  visible: boolean;
  onClose: () => void;
  applicant: Application | null;
  onUpdateStatus: (id: string, newStatus: ApplicationStatus) => void;
  onAddNote: (id: string, text: string) => void;
};

export default function ApplicantProfile({
  visible,
  onClose,
  applicant,
  onUpdateStatus,
  onAddNote,
}: ApplicantProfileProps) {
  const [resumeVisible, setResumeVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [tagsVisible, setTagsVisible] = useState(false);

  if (!visible || !applicant) return null;

  const handleStatus = (status: ApplicationStatus) => {
    onUpdateStatus(applicant.id, status);
  };

  return (
    <>
      <DraggableSheet visible={visible} onClose={onClose} height="large">
        <ScrollView
          className="px-5 pb-24"
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View className="items-center mt-4 mb-4">
            <View className="w-24 h-24 rounded-full bg-brandBlue items-center justify-center shadow-md">
              <Text className="text-white text-3xl font-bold">
                {applicant.initials}
              </Text>
            </View>

            <Text className="text-3xl font-bold mt-3 text-gray-900">
              {applicant.name}
            </Text>

            <Text className="text-gray-700 mt-1 text-lg">
              {applicant.role}
            </Text>

            <View className="flex-row items-center mt-1">
              <Ionicons name="school-outline" size={18} color="#6b7280" />
              <Text className="ml-2 text-gray-500 text-base">
                {applicant.education}
              </Text>
            </View>
          </View>

          {/* AI INSIGHTS */}
          <Section title="AI Match Insights" icon="sparkles-outline">
            <Text className="text-gray-700 leading-relaxed">
              {applicant.insights.matchDescription}
            </Text>

            <Text className="font-semibold mt-4 text-gray-900 text-lg">
              Strengths
            </Text>

            {applicant.insights.strengths.map((s: string) => (
              <View key={s} className="flex-row items-center mt-1">
                <Ionicons name="checkmark-circle-outline" size={18} color={brandBlue} />
                <Text className="ml-2 text-gray-700 text-base">{s}</Text>
              </View>
            ))}

            <Text className="font-semibold mt-4 text-gray-900 text-lg">
              Risks
            </Text>

            {applicant.insights.risks.map((r: string) => (
              <View key={r} className="flex-row items-center mt-1">
                <Ionicons name="warning-outline" size={18} color="#f97316" />
                <Text className="ml-2 text-gray-700 text-base">{r}</Text>
              </View>
            ))}
          </Section>

          {/* TIMELINE */}
          <Section title="Application Timeline" icon="time-outline">
            {applicant.timeline.map((t: any, i: number) => (
              <View key={i} className="flex-row items-start mt-4">
                <View className="pt-1">
                  <Ionicons name="ellipse" size={14} color={brandBlue} />
                </View>

                <View className="ml-3">
                  <Text className="text-gray-900 font-semibold text-base">
                    {t.label}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {t.date}
                  </Text>
                </View>
              </View>
            ))}
          </Section>

          {/* SKILLS */}
          <Section title="Skills / Tags" icon="pricetag-outline">
            <Pressable onPress={() => setTagsVisible(true)}>
              <TagsPreview
                skills={applicant.skills}
                showAll={false}
                onPress={() => setTagsVisible(true)}
              />
            </Pressable>
          </Section>

          {/* CONTACT */}
          <Section title="Contact Information" icon="call-outline">
            <View className="flex-row items-center mt-1">
              <Ionicons name="mail-outline" size={20} color="#6b7280" />
              <Text className="ml-3 text-gray-700 text-base">
                {applicant.email}
              </Text>
            </View>

            <View className="flex-row items-center mt-2">
              <Ionicons name="call-outline" size={20} color="#6b7280" />
              <Text className="ml-3 text-gray-700 text-base">
                {applicant.phone}
              </Text>
            </View>
          </Section>

          {/* LINKS */}
          <Section title="Documents & Links" icon="link-outline">
            <Pressable onPress={() => setResumeVisible(true)}>
              <View className="flex-row items-center mt-1">
                <Ionicons name="document-text-outline" size={20} color={brandBlue} />
                <Text className="ml-3 text-brandBlue text-base underline">
                  View Resume
                </Text>
              </View>
            </Pressable>

            {applicant.portfolio !== "" && (
              <Pressable onPress={() => Linking.openURL(applicant.portfolio)}>
                <View className="flex-row items-center mt-3">
                  <Ionicons name="browsers-outline" size={20} color={brandBlue} />
                  <Text className="ml-3 text-brandBlue text-base underline">
                    Portfolio
                  </Text>
                </View>
              </Pressable>
            )}
          </Section>

          {/* ACTION BUTTONS */}
          <View className="flex-row gap-3 mt-10">
            <CustomButton
              title="Shortlist"
              icon="checkmark-circle-outline"
              className="flex-1 bg-green-600 py-3 rounded-xl gap-2"
              textClassName="text-white text-base"
              iconColor="white"
              onPress={() => handleStatus("Shortlisted")}
            />

            <CustomButton
              title="Reject"
              icon="close-outline"
              className="flex-1 bg-red-600 py-3 rounded-xl gap-2"
              textClassName="text-white text-base"
              iconColor="white"
              onPress={() => handleStatus("Not Qualified")}
            />
          </View>

          <CustomButton
            title="Accept"
            icon="checkmark-outline"
            className="mt-3 bg-brandBlue py-3 rounded-xl gap-2"
            textClassName="text-white text-base"
            iconColor="white"
            onPress={() => handleStatus("Accepted")}
          />

          <CustomButton
            title="Notes"
            icon="document-text-outline"
            className="mt-5 bg-gray-200 py-3 rounded-xl gap-2"
            textClassName="text-gray-800 text-base"
            iconColor="#4b5563"
            onPress={() => setNotesVisible(true)}
          />
        </ScrollView>
      </DraggableSheet>

      <ResumeViewerSheet
        visible={resumeVisible}
        url={applicant.resume}
        onClose={() => setResumeVisible(false)}
      />

      <ApplicationNotes
        visible={notesVisible}
        onClose={() => setNotesVisible(false)}
        notes={applicant.notes}
        onSave={(text: string) => {
          onAddNote(applicant.id, text);
          setNotesVisible(false);
        }}
      />

      {/* TAGS MODAL */}
      <TagsModal
        visible={tagsVisible}
        onClose={() => setTagsVisible(false)}
        skills={applicant.skills}
      />
    </>
  );
}

/* SECTION COMPONENT */
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: any;
  children: any;
}) {
  return (
    <View className="mt-10">
      <View className="flex-row items-center mb-3">
        <Ionicons name={icon} size={22} color={brandBlue} />
        <Text className="text-xl font-bold text-gray-900 ml-2">{title}</Text>
      </View>
      {children}
    </View>
  );
}