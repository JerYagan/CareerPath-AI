import { Redirect } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import "../global.css";
import { View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  return (
    <View className={theme === "dark" ? "dark flex-1" : "flex-1"}>
      <Redirect href="/auth/Login" />
    </View>
  );
}
