import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="ChooseAccountType" options={{ headerShown: true, title: "Choose your account" }} />
      <Stack.Screen name="Register" />
      <Stack.Screen name="RegistrationSuccess" options={{ headerShown: false }} />
    </Stack>
  );
}
