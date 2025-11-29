import React, { useState } from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import DraggableSheet from "@/components/ui/DraggableSheet";
import ResumeViewerSheet from "./ResumeViewerSheet";
import NotesSheet from "./NotesSheet";
import type { ApplicationStatus, Application } from "@/app/employer/Applications";

const brandBlue = "#1C388E";

type ApplicantProfileSheetProps = {
  visible: boolean;
  onClose: () => void;
  applicant: Application | null;
  onUpdateStatus: (id: string, newStatus: ApplicationStatus) => void;
  onAddNote: (id: string, text: string) => void;
};

export default function ApplicantProfileSheet({
  visible,
  onClose,
  applicant,
  onUpdateStatus,
  onAddNote,
}: ApplicantProfileSheetProps) {
  const [resumeVisible, setResumeVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);

  if (!visible || !applicant) return null;

    const handleStatus = (status: ApplicationStatus) => {
        onUpdateStatus(applicant.id, status);
    };

  return (
    <>
      <DraggableSheet visible={visible} onClose={onClose} height="full">
        <ScrollView className="px-5 pb-20">
          {/* Header */}
          <View className="items-center mt-4">
            <View className="w-20 h-20 rounded-full bg-brandBlue items-center justify-center">
              <Text className="text-white text-2xl font-bold">
                {applicant.initials}
              </Text>
            </View>

            <Text className="text-2xl font-bold mt-3">{applicant.name}</Text>
            <Text className="text-gray-600">{applicant.role}</Text>
            <Text className="text-gray-500 text-sm">{applicant.education}</Text>
          </View>

          {/* AI Insights */}
          <Section title="AI Match Insights">
            <Text className="text-gray-700">
              {applicant.insights.matchDescription}
            </Text>

            <Text className="font-semibold mt-3">Strengths</Text>
            {applicant.insights.strengths.map((s: string) => (
              <Text key={s} className="text-gray-700">
                • {s}
              </Text>
            ))}

            <Text className="font-semibold mt-3">Risks</Text>
            {applicant.insights.risks.map((r: string) => (
              <Text key={r} className="text-gray-700">
                • {r}
              </Text>
            ))}
          </Section>

          {/* Timeline */}
          <Section title="Application Timeline">
            {applicant.timeline.map((t: any, i: number) => (
              <View key={i} className="flex-row items-center mt-2">
                <Ionicons name="radio-button-on" size={14} color={brandBlue} />
                <View className="ml-2">
                  <Text className="text-gray-800 font-semibold">{t.label}</Text>
                  <Text className="text-gray-500 text-xs">{t.date}</Text>
                </View>
              </View>
            ))}
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <View className="flex-row flex-wrap gap-2">
              {applicant.skills.map((s: string) => (
                <View key={s} className="bg-gray-100 px-3 py-1 rounded-lg">
                  <Text className="text-gray-700 text-sm font-semibold">{s}</Text>
                </View>
              ))}
            </View>
          </Section>

          {/* Contact */}
          <Section title="Contact">
            <Text className="text-gray-700">{applicant.email}</Text>
            <Text className="text-gray-700">{applicant.phone}</Text>
          </Section>

          {/* Links */}
          <Section title="Links">
            <Text
              className="text-brandBlue underline"
              onPress={() => setResumeVisible(true)}
            >
              View Resume
            </Text>

            {applicant.portfolio !== "" && (
              <Text
                className="text-brandBlue underline mt-2"
                onPress={() => Linking.openURL(applicant.portfolio)}
              >
                Portfolio
              </Text>
            )}
          </Section>

          {/* Actions */}
          <View className="flex-row gap-3 mt-10">
            <CustomButton
              title="Shortlist"
              icon="checkmark-circle-outline"
              className="flex-1 bg-green-600 py-3 rounded-xl gap-2"
              textClassName="text-white"
              iconColor="white"
              onPress={() => handleStatus("Shortlisted")}
            />

            <CustomButton
              title="Reject"
              icon="close-circle-outline"
              className="flex-1 bg-red-600 py-3 rounded-xl gap-2"
              textClassName="text-white"
              iconColor="white"
              onPress={() => handleStatus("Not Qualified")}
            />
          </View>

          <CustomButton
            title="Accept"
            icon="thumbs-up-outline"
            className="mt-3 bg-brandBlue py-3 rounded-xl gap-2"
            textClassName="text-white"
            iconColor="white"
            onPress={() => handleStatus("Accepted")}
          />

          {/* Notes */}
          <CustomButton
            title="Notes"
            icon="document-text-outline"
            className="mt-5 bg-gray-200 py-3 rounded-xl gap-2"
            textClassName="text-gray-800"
            iconColor="#4b5563"
            onPress={() => setNotesVisible(true)}
          />

          <View className="h-20" />
        </ScrollView>
      </DraggableSheet>

      {/* Resume PDF Viewer */}
      <ResumeViewerSheet
        visible={resumeVisible}
        url={applicant.resume}
        onClose={() => setResumeVisible(false)}
      />

      {/* Notes sheet */}
      <NotesSheet
        visible={notesVisible}
        onClose={() => setNotesVisible(false)}
        notes={applicant.notes}
        onSave={(text: string) => {
          onAddNote(applicant.id, text);
          setNotesVisible(false);
        }}
      />
    </>
  );
}

function Section({ title, children }: any) {
  return (
    <View className="mt-8">
      <Text className="text-lg font-bold text-gray-900 mb-2">{title}</Text>
      {children}
    </View>
  );
}