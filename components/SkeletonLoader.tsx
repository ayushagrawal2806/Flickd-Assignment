import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function SkeletonLoader() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.skeleton, { opacity }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "48%",
    margin: "1%",
  },
  skeleton: {
    width: "100%",
    height: 160,
    backgroundColor: "#d0d0d0",
    borderRadius: 12,
  },
});
