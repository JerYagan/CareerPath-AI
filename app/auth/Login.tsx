import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import users from "../../assets/data/users.json";
import employerAccounts from "../../assets/data/employerData/employerAccounts.json";
import CustomButton from "@/components/ui/CustomButton";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("hr@techcorp.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const position = useSharedValue(0);

  const animatedHighlight = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(position.value * 160) }],
  }));

  const animatedJobSeekerText = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(position.value === 0 ? 1.05 : 1) }],
    opacity: withTiming(position.value === 0 ? 1 : 0.5),
  }));

  const animatedEmployerText = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(position.value === 1 ? 1.05 : 1) }],
    opacity: withTiming(position.value === 1 ? 1 : 0.5),
  }));

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPass = password.trim();

    setError("");

    const jobSeeker = users.find(
      (u) => u.email === trimmedEmail && u.password === trimmedPass
    );

    if (jobSeeker) {
      console.log("Logged in as job seeker:", jobSeeker.email);
      router.replace("/jobseeker/Home");
      return;
    }

    const employer = employerAccounts.employers.find(
      (e) => e.email === trimmedEmail && e.password === trimmedPass
    );

    if (employer) {
      console.log("Logged in as employer:", employer.email);
      router.replace("/employer/Dashboard");
      return;
    }

    setError("Invalid email or password.");
  };

  return (
    <View className="flex-1 justify-center">
      <View className="mx-4 p-8 flex justify-center bg-white border border-gray-300 rounded-lg overflow-hidden">
        <View className="items-center mb-10">
          <Image
            source={require("@/assets/images/peso-logo.png")} // place your logo here
            className="w-20 h-20 mb-3"
            resizeMode="contain"
          />

          <Text className="text-2xl font-bold text-[#1C388E]">
            PESO Jobs PH
          </Text>

          <Text className="text-lg font-semibold mt-2 text-gray-800">
            Welcome Back!
          </Text>

          <Text className="text-gray-500 text-center">
            Sign in to your account to continue
          </Text>
        </View>

        <View>
          <Text className="font-bold mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter your email"
            className="bg-gray-100 p-4 rounded-lg text-gray-600 mb-4"
          />
        </View>

        <View className="mb-6">
          <Text className="font-bold mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter your password"
            className="bg-gray-100 p-4 rounded-lg text-gray-600 mb-4"
            secureTextEntry
          />
        </View>

        {/* Sign In */}
        <CustomButton
          title="Sign In"
          onPress={handleLogin}
          className="bg-brandBlue"
          textClassName="text-white"
        />

        {/* Divider */}
        <View className="flex-row items-center justify-center w-full overflow-hidden my-4">
          <View className="h-[1px] w-full bg-gray-300" />
          <Text className="px-4 text-gray-300">or</Text>
          <View className="h-[1px] w-full bg-gray-300" />
        </View>

        {/* Google */}
        <CustomButton
          icon="logo-google"
          title="Continue with Google"
          className="border border-gray-300 bg-white gap-2"
          textClassName="text-black"
        />

        {/* Sign up option */}
        <View className="mt-8">
          <Text className="text-gray-500 text-center">
            Don't have an account?{" "}
            <Text
              onPress={() => router.push("/auth/ChooseAccountType")}
              className="font-bold text-brandBlue"
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
