import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  useAnimatedStyle,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { loadSvgXml } from "@/src/utils/loadSvg";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [logoXml, setLogoXml] = useState<string | null>(null);

  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);

  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  useEffect(() => {
    (async () => {
      const xml = await loadSvgXml(require("@/assets/svg/peso-logo.svg"));
      setLogoXml(xml);

      // Logo fade + pop animation
      logoOpacity.value = withTiming(1, { duration: 500 });
      logoScale.value = withSequence(
        withTiming(1.1, { duration: 500, easing: Easing.out(Easing.cubic) }),
        withTiming(1.0, { duration: 300, easing: Easing.out(Easing.cubic) })
      );

      // Text fade + slide animation (delayed)
      textOpacity.value = withDelay(
        400,
        withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) })
      );
      textTranslateY.value = withDelay(
        400,
        withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) })
      );

      // End splash
      setTimeout(() => {
        runOnJS(onFinish)();
      }, 1500);
    })();
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  if (!logoXml) return null;

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Animated.View style={logoStyle} className="items-center">
        <SvgXml xml={logoXml} width={150} height={150} />
      </Animated.View>

      <Animated.View style={[textStyle, { marginTop: 20 }]}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#1C388E",
            letterSpacing: 1,
          }}
        >
          PESO Jobs PH
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;