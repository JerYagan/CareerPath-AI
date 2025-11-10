import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import users from "../../assets/data/users.json";
import CustomButton from "@/components/CustomButton";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("123456");
  const [contactEmail, setContactEmail] = useState("");
  const [selected, setSelected] = useState<"jobSeeker" | "employer">("jobSeeker");

  const position = useSharedValue(0);

  const handleToggle = (role: "jobSeeker" | "employer") => {
    setSelected(role);
    position.value = withTiming(role === "jobSeeker" ? 0 : 1, { duration: 250 });
  };

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
  const user = users.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (user) {
      router.replace("../loading");
    }
  };

  return (
    <View className="flex-1 justify-center">
      <View className="mx-4 p-8 flex justify-center bg-white border border-gray-300 rounded-lg overflow-hidden">
        <View className="mb-10 text-center">
          <Text className="text-2xl font-semibold text-center">
            Welcome Back!
          </Text>
          <Text className="text-gray-500 text-center">
            Sign in to your account to continue
          </Text>
        </View>

        {/* Animated Toggle */}
        <View className="relative flex-row bg-gray-100 rounded-lg mb-8 border border-gray-300 overflow-hidden">
          <Animated.View
            className="absolute top-0 left-0 w-1/2 h-full bg-white rounded-lg"
            style={animatedHighlight}
          />

          <TouchableOpacity
            className="w-1/2 p-4 rounded-lg z-10"
            onPress={() => handleToggle("jobSeeker")}
            activeOpacity={0.8}
          >
            <Animated.Text
              style={animatedJobSeekerText}
              className={`text-center font-bold ${
                selected === "jobSeeker" ? "text-black" : "text-gray-500"
              }`}
            >
              Job Seeker
            </Animated.Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-1/2 p-4 rounded-lg z-10"
            onPress={() => handleToggle("employer")}
            activeOpacity={0.8}
          >
            <Animated.Text
              style={animatedEmployerText}
              className={`text-center font-bold ${
                selected === "employer" ? "text-black" : "text-gray-500"
              }`}
            >
              Employer
            </Animated.Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Fields */}
        {selected === "jobSeeker" ? (
          <>
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
          </>
        ) : (
          <>
            <View>
              <Text className="font-bold mb-2">Contact Email</Text>
              <TextInput
                value={contactEmail}
                onChangeText={setContactEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Enter your contact email"
                className="bg-gray-100 p-4 rounded-lg text-gray-600 mb-4"
              />
            </View>

            <View className="mb-6">
              <Text className="font-bold mb-2">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                className="bg-gray-100 p-4 rounded-lg text-gray-600 mb-4"
                secureTextEntry
              />
            </View>
          </>
        )}

        {/* Sign In */}
        <CustomButton
          title="Sign In"
          onPress={handleLogin}
          className="bg-black"
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
            <Text onPress={() => router.push("/auth/Register")} className="font-bold text-blue-400">Sign up</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
