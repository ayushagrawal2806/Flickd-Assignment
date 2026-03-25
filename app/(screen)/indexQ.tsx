import Header from "@/components/Header";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const stylesList = ["Cartoon", "Anime", "Pixel", "Sketch", "Flat"];
  const [generatedImages, setGeneratedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const generateClipart = async () => {
    if (!selectedStyle) {
      alert("Select a style");
      return;
    }

    try {
      setLoading(true);

      const prompt = `${selectedStyle} avatar illustration, clipart style`;

      const imageUrl =
        "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt);

      console.log("====================================");
      console.log(imageUrl);
      console.log("====================================");

      setGeneratedImages([imageUrl]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setImage(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Clipart Pro" />
      <View style={styles.body}>
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          {image ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <Text style={styles.close} onPress={handleClose}>
                X
              </Text>
            </View>
          ) : (
            <Text style={styles.uploadText}>Tap to Upload Image</Text>
          )}
        </TouchableOpacity>

        <View style={styles.styleContainer}>
          <Text style={styles.sectionTitle}>Choose Style</Text>

          <View style={styles.styleList}>
            {stylesList.map((style) => (
              <TouchableOpacity
                key={style}
                style={[
                  styles.styleButton,
                  selectedStyle === style && styles.selectedStyle,
                ]}
                onPress={() => setSelectedStyle(style)}
              >
                <Text
                  style={[
                    styles.styleText,
                    selectedStyle === style && styles.selectedText,
                  ]}
                >
                  {style}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={generateClipart}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.generateText}>Generate Clipart</Text>
          )}
        </TouchableOpacity>

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Generated Images</Text>

            <FlatList
              data={generatedImages}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.generatedImage} />
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffff",
  },

  uploadBox: {
    height: 200,
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  uploadText: {
    fontSize: 16,
    color: "#666",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 17.5, // half of width/height
    backgroundColor: "#f5f5f5",
    color: "red",
    textAlign: "center",
    textAlignVertical: "center", // for Android
    lineHeight: 35, // vertically center text
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  styleContainer: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  styleList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  styleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  styleText: {
    fontSize: 14,
  },

  selectedStyle: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },

  selectedText: {
    color: "white",
  },
  generateButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  generateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  generatedImage: {
    width: "48%",
    height: 150,
    margin: "1%",
    borderRadius: 10,
  },
});
