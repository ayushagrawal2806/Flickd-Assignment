import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { Slot } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <Slot />
      <StatusBar style="auto" />
      <Toast />
    </>
  );
}
