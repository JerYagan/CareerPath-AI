import React from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import DraggableSheet from "@/components/ui/DraggableSheet";
import { Ionicons } from "@expo/vector-icons";

const brandBlue = "#1C388E";

type Props = {
  visible: boolean;
  onClose: () => void;
  candidate: any;
};

export default function CandidateProfileSheet({ visible, onClose, candidate }: Props) {
  if (!visible || !candidate) return null;

  return (
    <DraggableSheet visible={visible} onClose={onClose} height="full">
      <ScrollView className="px-5 pb-20">

        {/* Header */}
        <View className="items-center mt-4">
          <View className="w-20 h-20 rounded-full bg-brandBlue items-center justify-center">
            <Text className="text-white text-2xl font-bold">{candidate.initials}</Text>
          </View>

          <Text className="text-2xl font-bold mt-3">{candidate.name}</Text>
          <Text className="text-gray-600">{candidate.role}</Text>
          <Text className="text-gray-500 text-sm">
            {candidate.province}, {candidate.city}
          </Text>
        </View>

        {/* Section */}
        <Section title="About">
          <Text className="text-gray-700 leading-6">{candidate.bio}</Text>
        </Section>

        <Section title="Skills">
          <View className="flex-row flex-wrap gap-2">
            {candidate.skills.map((s: string) => (
              <View key={s} className="px-3 py-1 bg-gray-100 rounded-lg">
                <Text className="text-gray-700 text-sm font-semibold">{s}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Education">
          <Text className="text-gray-700">{candidate.education}</Text>
        </Section>

        <Section title="Experience">
          <Text className="text-gray-700">{candidate.experience} years</Text>
        </Section>

        <Section title="Preferred Roles">
          <Text className="text-gray-700">{candidate.preferredRoles.join(", ")}</Text>
        </Section>

        <Section title="Contact Information">
          <Text className="text-gray-700">{candidate.email}</Text>
          <Text className="text-gray-700">{candidate.phone}</Text>
        </Section>

        <Section title="Links">
          {candidate.links.map((link: any) => (
            <Text
              key={link.label}
              className="text-brandBlue underline"
              onPress={() => Linking.openURL(link.url)}
            >
              {link.label}
            </Text>
          ))}
        </Section>

        <View className="h-10" />

      </ScrollView>
    </DraggableSheet>
  );
}

function Section({ title, children }: any) {
  return (
    <View className="mt-6">
      <Text className="text-lg font-bold text-gray-900 mb-2">{title}</Text>
      {children}
    </View>
  );
}
