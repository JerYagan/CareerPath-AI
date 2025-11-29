import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { RegisterProvider } from "@/context/RegisterContext";

// JOB SEEKER STEPS
import JS_Step1Personal from "@/components/features/jobseeker/register/JS_Step1Personal";
import JS_Step2Experience from "@/components/features/jobseeker/register/JS_Step2Experience";
import JS_Step3Education from "@/components/features/jobseeker/register/JS_Step3Education";
import JS_Step4Skills from "@/components/features/jobseeker/register/JS_Step4Skills";
import JS_Step5Resume from "@/components/features/jobseeker/register/JS_Step5Resume";
import JS_Step6CareerGoals from "@/components/features/jobseeker/register/JS_Step6Goals";
import JS_Step7OTP from "@/components/features/jobseeker/register/JS_Step7OTP";

// EMPLOYER STEPS
import EmployerStep1Personal from "@/components/features/employer/register/EmployerStep1Personal";
import EmployerStep2Company from "@/components/features/employer/register/EmployerStep2Company";
import EmployerStep3Verification from "@/components/features/employer/register/EmployerStep3Verification";
import EmployerStep4OTP from "@/components/features/employer/register/EmployerStep4OTP";

export default function Register() {
  const { role } = useLocalSearchParams();

  const scrollRef = useRef<ScrollView>(null);
  const [step, setStep] = useState(1);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  const animate = () => {
    fade.setValue(0);
    slide.setValue(20);

    Animated.parallel([
      Animated.spring(fade, {
        toValue: 1,
        useNativeDriver: true,
        speed: 8,
        bounciness: 2,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animate();
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [step]);

  const TOTAL = role === "jobseeker" ? 7 : 4;

  return (
    <RegisterProvider>
      <View className="flex-1 bg-[#F8F9FB] pt-10">
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
        >
          {/* HEADER */}
          <Text className="text-xl font-bold mb-2 text-[#1C388E]">
            {role === "jobseeker"
              ? "Job Seeker Registration"
              : "Employer Registration"}
          </Text>

          {/* PROGRESS BAR */}
          <View className="w-full h-2 bg-gray-300 rounded-full mb-6 overflow-hidden">
            <View
              className="h-2 bg-[#1C388E]"
              style={{ width: `${(step / TOTAL) * 100}%` }}
            />
          </View>

          {/* STEPS */}
          <Animated.View
            style={{
              opacity: fade,
              transform: [{ translateY: slide }],
            }}
          >
            {role === "jobseeker" && (
              <>
                {step === 1 && <JS_Step1Personal onNext={() => setStep(2)} />}
                {step === 2 && (
                  <JS_Step2Experience
                    onBack={() => setStep(1)}
                    onNext={() => setStep(3)}
                  />
                )}
                {step === 3 && (
                  <JS_Step3Education
                    onBack={() => setStep(2)}
                    onNext={() => setStep(4)}
                  />
                )}
                {step === 4 && (
                  <JS_Step4Skills
                    onBack={() => setStep(3)}
                    onNext={() => setStep(5)}
                  />
                )}
                {step === 5 && (
                  <JS_Step5Resume
                    onBack={() => setStep(4)}
                    onNext={() => setStep(6)}
                  />
                )}
                {step === 6 && (
                  <JS_Step6CareerGoals
                    onBack={() => setStep(5)}
                    onNext={() => setStep(7)}
                  />
                )}
                {step === 7 && (
                  <JS_Step7OTP
                    onBack={() => setStep(6)}
                  />
                )}
              </>
            )}

            {role === "employer" && (
              <>
                {step === 1 && <EmployerStep1Personal onNext={() => setStep(2)} />}
                {step === 2 && (
                  <EmployerStep2Company
                    onBack={() => setStep(1)}
                    onNext={() => setStep(3)}
                  />
                )}
                {step === 3 && (
                  <EmployerStep3Verification
                    onBack={() => setStep(2)}
                    onNext={() => setStep(4)}
                  />
                )}
                {step === 4 && <EmployerStep4OTP onBack={() => setStep(3)} />}
              </>
            )}
          </Animated.View>
        </ScrollView>
      </View>
    </RegisterProvider>
  );
}