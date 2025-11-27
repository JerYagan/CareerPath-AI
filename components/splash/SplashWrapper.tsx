import React from "react";
import SplashScreen from "./SplashScreen";

export default function SplashWrapper({ onFinish }: { onFinish: () => void }) {
  return <SplashScreen onFinish={onFinish} />;
}
