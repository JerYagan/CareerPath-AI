import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, Animated } from "react-native";

import Step1Personal from "@/components/register/Step1Personal";
import Step2Experience from "@/components/register/Step2Experience";
import Step3Education from "@/components/register/Step3Education";
import Step4Skills from "@/components/register/Step4Skills";
import Step5Resume from "@/components/register/Step5Resume";
import Step6Goals from "@/components/register/Step6Goals";
import { RegisterProvider } from "@/context/RegisterContext";

const TOTAL = 6;

const Register = () => {
  const [step, setStep] = useState(1);
  const scrollRef = useRef<ScrollView>(null);

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
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animate();
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [step]);

  return (
    <RegisterProvider>
      <View className="flex-1 bg-[#F8F8FC] pt-10">
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
        >
          <Text className="text-xl font-bold mb-2">Complete Your Profile</Text>

          <View className="w-full h-2 bg-gray-200 rounded-full mb-6">
            <View
              className="h-2 bg-black rounded-full"
              style={{ width: `${(step / TOTAL) * 100}%` }}
            />
          </View>

          <Animated.View
            style={{
              opacity: fade,
              transform: [{ translateY: slide }],
            }}
          >
            {step === 1 && <Step1Personal onNext={() => setStep(2)} />}
            {step === 2 && (
              <Step2Experience
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <Step3Education
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <Step4Skills
                onNext={() => setStep(5)}
                onBack={() => setStep(3)}
              />
            )}
            {step === 5 && (
              <Step5Resume
                onNext={() => setStep(6)}
                onBack={() => setStep(4)}
              />
            )}
            {step === 6 && <Step6Goals onBack={() => setStep(5)} />}
          </Animated.View>
        </ScrollView>
      </View>
    </RegisterProvider>
  );
};

export default Register;
