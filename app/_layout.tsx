import { Stack } from "expo-router";
import "../global.css"
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import SplashWrapper from "@/components/splash/SplashWrapper";
import SwipeableSidebarWrapper from "@/components/navigation/SwipeableSidebarWrapper";
import Sidebar from "@/components/navigation/SharedSidebar";
import * as Notifications from "expo-notifications";



export default function RootLayout() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,

      // NEW REQUIRED FIELDS (Expo SDK 51+)
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  if (loading) {
    return (
      <SplashWrapper onFinish={() => setLoading(false)} />
    );
  }

  return (
    <ThemeProvider>
      <SwipeableSidebarWrapper
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      >
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="loading" options={{ headerShown: false }} />
          <Stack.Screen name="jobseeker" options={{ headerShown: false }} />
          <Stack.Screen name="employer" options={{ headerShown: false }} />
          <Stack.Screen name="Notifications" options={{ headerShown: false }} />
          <Stack.Screen name="Notifications/[id]" options={{ headerShown: false }} />
        </Stack>
      </SwipeableSidebarWrapper>
    </ThemeProvider>
  );
}
