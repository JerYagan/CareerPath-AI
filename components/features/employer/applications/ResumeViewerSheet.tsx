import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import DraggableSheet from "@/components/ui/DraggableSheet";

export default function ResumeViewerSheet({ visible, onClose, url }: any) {
  if (!visible || !url) return null;

  return (
    <DraggableSheet visible={visible} onClose={onClose} height="full">
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </DraggableSheet>
  );
}
