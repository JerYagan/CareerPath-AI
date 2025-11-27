import React, { useRef } from "react";
import { View, PanResponder, Dimensions } from "react-native";
import Sidebar from "./Sidebar";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SwipeableSidebarWrapper({
  children,
  sidebarVisible,
  setSidebarVisible,
}: {
  children: React.ReactNode;
  sidebarVisible: boolean;
  setSidebarVisible: (v: boolean) => void;
}) {
  const startX = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gesture) => {
        // Accept touch ONLY on left 20px
        return gesture.x0 < 20;
      },

      onPanResponderGrant: (_, gesture) => {
        startX.current = gesture.x0;
      },

      onPanResponderMove: (_, gesture) => {
        // If user swipes right enough → open
        if (gesture.dx > 40) {
          setSidebarVisible(true);
        }
      },

      onPanResponderRelease: () => {}, // nothing
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      {/* Invisible swipe area (20px) */}
      <View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 20,
          zIndex: 20,
        }}
      />

      {children}

      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </View>
  );
}
