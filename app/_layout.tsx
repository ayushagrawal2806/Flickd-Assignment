import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { Slot } from "expo-router";

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    <>
      <Slot />
      <StatusBar style="auto" />
    </>
  );
}
