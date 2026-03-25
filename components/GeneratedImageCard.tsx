import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GeneratedImage } from "../hooks/useClipartGenerator";
import { downloadImage, shareImage } from "../services/imageService";
import SkeletonLoader from "./SkeletonLoader";

type Props = { item: GeneratedImage };

export default function GeneratedImageCard({ item }: Props) {
  if (item.loading) return <SkeletonLoader />;

  if (item.error || !item.url) {
    return (
      <View style={styles.errorCard}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorText}>Failed</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* ✅ Works with both base64 and URLs */}
      <Image
        source={{ uri: item.url }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {item.emoji} {item.label}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => downloadImage(item.url)}
        >
          <Text style={styles.actionText}>⬇ Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.shareBtn]}
          onPress={() => shareImage(item.url)}
        >
          <Text style={[styles.actionText, { color: "#fff" }]}>↗ Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    margin: "1%",
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  image: { width: "100%", height: 150 },
  labelRow: { padding: 6 },
  label: { fontSize: 13, fontWeight: "600", color: "#333" },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingBottom: 8,
    gap: 6,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4A90E2",
  },
  shareBtn: { backgroundColor: "#4A90E2" },
  actionText: { fontSize: 11, fontWeight: "600", color: "#4A90E2" },
  errorCard: {
    width: "48%",
    height: 160,
    margin: "1%",
    borderRadius: 12,
    backgroundColor: "#fff0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffcccc",
  },
  errorEmoji: { fontSize: 24 },
  errorText: { fontSize: 12, color: "#cc0000", marginTop: 4 },
});
