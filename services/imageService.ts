import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import Toast from "react-native-toast-message";

const saveToTempFile = async (url: string): Promise<string> => {
  const filename = `clipart_${Date.now()}.png`;
  const fileUri = FileSystem.cacheDirectory + filename;

  try {
    // Base64 image
    if (url.includes("base64")) {
      const base64 = url.split(",")[1];

      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return fileUri;
    }

    // Normal image URL
    const result = await FileSystem.downloadAsync(url, fileUri);

    if (result.status !== 200) {
      throw new Error("Image download failed");
    }

    return result.uri;
  } catch (error) {
    console.log("Temp file error:", error);
    throw error;
  }
};

export const downloadImage = async (url: string) => {
  try {
    const permission = await MediaLibrary.requestPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required to save image");
      return;
    }

    const fileUri = await saveToTempFile(url);

    const asset = await MediaLibrary.createAssetAsync(fileUri);

    const albumName = "AI Clipart";

    const album = await MediaLibrary.getAlbumAsync(albumName);

    if (album == null) {
      await MediaLibrary.createAlbumAsync(albumName, asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

    Toast.show({
      type: "success",
      text1: "Success 🎉",
      text2: "Image saved successfully!",
    });

    // alert("✅ Image saved to gallery!");
  } catch (error: any) {
    console.log("Download error:", error);
    alert(error.message || "Failed to save image");
  }
};

export const shareImage = async (url: string) => {
  try {
    const available = await Sharing.isAvailableAsync();

    if (!available) {
      alert("Sharing is not available on this device");
      return;
    }

    const fileUri = await saveToTempFile(url);

    await Sharing.shareAsync(fileUri);
  } catch (error) {
    console.log("Share error:", error);
    alert("Failed to share image");
  }
};
