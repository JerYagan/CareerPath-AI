import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MetricCard from "@/components/features/employer/dashboard/MetricCard";
import CandidateItem from "@/components/features/employer/dashboard/CandidateItem";

const brandBlue = "#1C388E";

const Dashboard = () => {
  // Graph Data (Applicants over 7 days)
  const graphData = [14, 22, 18, 30, 25, 17, 28]; // dynamic-friendly
  const maxValue = Math.max(...graphData);

  return (
    <ScrollView className="flex-1 px-5 py-4 bg-gray-50" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900">Dashboard</Text>
        <Text className="text-gray-500 mt-1">
          Insights tailored to your hiring strategy.
        </Text>
      </View>

      {/* Metrics */}
      <View className="flex-row flex-wrap justify-between mb-4">
        <MetricCard
          label="Active Posts"
          value="12"
          trend="+3 this week"
          icon="briefcase-outline"
        />
        <MetricCard
          label="Applicants Today"
          value="18"
          trend="+7 since yesterday"
          icon="people-outline"
        />
        <MetricCard
          label="Shortlisted"
          value="9"
          trend="+2 this week"
          icon="checkmark-done-outline"
        />
        <MetricCard
          label="Interviews"
          value="5"
          trend="Scheduled"
          icon="calendar-outline"
        />
      </View>

      {/* GRAPH — REAL BAR CHART */}
      <View className="bg-white rounded-2xl p-5 shadow-sm mb-8">
        <Text className="text-lg font-semibold text-gray-900 mb-1">
          Applicant Activity (7 days)
        </Text>
        <Text className="text-gray-500 mb-4">
          Monitor daily applicant trends
        </Text>

        <View className="flex-row items-end justify-between h-32">
          {graphData.map((value, index) => {
            const heightPercent = (value / maxValue) * 100;

            return (
              <View
                key={index}
                className="items-center justify-end mt-8"
                style={{ width: "10%" }}
              >
                <View
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: brandBlue,
                    width: 12,
                    borderRadius: 6,
                  }}
                  className="justify-end"
                />
                <Text className="text-gray-500 text-sm mt-2">
                  {["M", "T", "W", "T", "F", "S", "S"][index]}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Suggested Candidates */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-900">
          Top Candidate Matches
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
      </View>

      {/* MULTIPLE CANDIDATES INLINE */}
      <CandidateItem
        initials="JM"
        name="John Mark Santos"
        role="Frontend Developer"
        savedAgo="2d ago"
        experience="3+ years in React, TypeScript, and Expo. Previously built internal dashboards and mobile apps for SMEs."
        strengths={[
          "Clean scalable code",
          "Strong communication",
          "Pixel-perfect UI work",
          "Rapid debugging and issue resolution",
        ]}
        skills={["React", "TypeScript", "Figma", "REST APIs", "Next.js"]}
        match={82}
      />

      <CandidateItem
        initials="AL"
        name="Anna Lopez"
        role="UI/UX Designer"
        savedAgo="3d ago"
        experience="4 years designing mobile-first apps. Skilled at wireframes, user flows, and high-fidelity screens."
        strengths={[
          "User-centered thinking",
          "Fast prototyping",
          "Excellent typography choices",
        ]}
        skills={["Figma", "Prototyping", "UX Writing", "Design Systems"]}
        match={74}
      />

      <CandidateItem
        initials="RB"
        name="Rico Benitez"
        role="Backend Developer"
        savedAgo="1d ago"
        experience="5 years building scalable backend systems. Experience in Node, Express, PostgreSQL."
        strengths={[
          "System architecture",
          "Database optimization",
          "API security",
        ]}
        skills={["Node.js", "PostgreSQL", "Docker", "Redis"]}
        match={69}
      />

      {/* Footer spacing */}
      <View className="h-16" />
    </ScrollView>
  );
};

export default Dashboard;
