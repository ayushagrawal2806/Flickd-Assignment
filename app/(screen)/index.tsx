import GeneratedImageCard from "@/components/GeneratedImageCard";
import { STYLES } from "@/constants/styles";
import { useClipartGenerator } from "@/hooks/useClipartGenerator";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["cartoon"]);
  const { generatedImages, isGenerating, generate, reset } =
    useClipartGenerator();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.6,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      reset();
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Permission required",
        text2: "Camera permission is needed to take photos",
      });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      reset();
    }
  };

  const toggleStyle = (id: string) => {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleGenerate = () => {
    if (!image) {
      Toast.show({
        type: "error",
        text1: "No Image",
        text2: "Please upload an image first",
      });
      return;
    }

    if (selectedStyles.length === 0) {
      Toast.show({
        type: "error",
        text1: "No Style Selected",
        text2: "Please select at least one style",
      });
      return;
    }

    Toast.show({
      type: "info",
      text1: "Generating clipart",
      text2: "Creating your styles...",
    });
    generate(image, selectedStyles);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎨 Clipart Pro</Text>
        <Text style={styles.headerSub}>AI-powered clipart generator</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Upload Image</Text>
        <View style={styles.uploadRow}>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            <Text style={styles.uploadIcon}>🖼</Text>
            <Text style={styles.uploadBtnText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBtn} onPress={takePhoto}>
            <Text style={styles.uploadIcon}>📷</Text>
            <Text style={styles.uploadBtnText}>Camera</Text>
          </TouchableOpacity>
        </View>

        {image && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: image }} style={styles.preview} />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => {
                setImage(null);
                reset();
              }}
            >
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>Choose Styles</Text>
        <Text style={styles.sectionHint}>
          Select multiple for batch generation
        </Text>
        <View style={styles.styleGrid}>
          {STYLES.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleChip,
                selectedStyles.includes(style.id) && styles.styleChipSelected,
              ]}
              onPress={() => toggleStyle(style.id)}
            >
              <Text style={styles.styleEmoji}>{style.emoji}</Text>
              <Text
                style={[
                  styles.styleChipText,
                  selectedStyles.includes(style.id) &&
                    styles.styleChipTextSelected,
                ]}
              >
                {style.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.generateBtn,
            isGenerating && styles.generateBtnDisabled,
          ]}
          onPress={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.generateBtnText}>
              ✨ Generate{" "}
              {selectedStyles.length > 1
                ? `${selectedStyles.length} Styles`
                : "Clipart"}
            </Text>
          )}
        </TouchableOpacity>

        {generatedImages.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Generated Cliparts</Text>
            <FlatList
              data={generatedImages}
              keyExtractor={(item) => item.styleId}
              numColumns={2}
              scrollEnabled={false}
              renderItem={({ item }) => <GeneratedImageCard item={item} />}
            />
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#fff" },
  headerSub: { fontSize: 13, color: "#cce4ff", marginTop: 2 },
  scroll: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginTop: 24,
    marginBottom: 4,
  },
  sectionHint: { fontSize: 12, color: "#999", marginBottom: 10 },
  uploadRow: { flexDirection: "row", gap: 12, marginTop: 8 },
  uploadBtn: {
    flex: 1,
    height: 90,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4A90E2",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  uploadIcon: { fontSize: 28 },
  uploadBtnText: { fontSize: 14, color: "#4A90E2", fontWeight: "600" },
  previewContainer: {
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    height: 200,
  },
  preview: { width: "100%", height: "100%", borderRadius: 12 },
  removeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  styleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
  },
  styleChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#ddd",
    gap: 6,
    backgroundColor: "#fafafa",
  },
  styleChipSelected: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  styleEmoji: { fontSize: 16 },
  styleChipText: { fontSize: 14, color: "#444", fontWeight: "500" },
  styleChipTextSelected: { color: "#fff" },
  generateBtn: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  generateBtnDisabled: { backgroundColor: "#a0c4f1" },
  generateBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
