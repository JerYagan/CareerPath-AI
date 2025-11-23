import { Stack } from "expo-router";
import "../global.css"
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="loading" options={{ headerShown: false }} />
        <Stack.Screen name="jobseeker" options={{ headerShown: false }} />
        <Stack.Screen name="employer" options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
