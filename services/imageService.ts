import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

const saveToTempFile = async (url: string): Promise<string> => {
  const filename = `clipart_${Date.now()}.png`;
  const fileUri = FileSystem.cacheDirectory + filename;

  // Case 1: base64 image
  if (url.startsWith("data:image")) {
    const base64 = url.split(",")[1];

    await FileSystem.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return fileUri;
  }

  // Case 2: normal image URL
  const result = await FileSystem.downloadAsync(url, fileUri);

  if (result.status !== 200) {
    throw new Error("Failed to download image");
  }

  return result.uri;
};

/* -------------------------- */
/* Save Image */
/* -------------------------- */

export const downloadImage = async (url: string) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      alert("Permission required");
      return;
    }

    const fileUri = await saveToTempFile(url);

    const asset = await MediaLibrary.createAssetAsync(fileUri);

    await MediaLibrary.createAlbumAsync("AI Clipart", asset, false);

    alert("✅ Saved to gallery!");
  } catch (error: any) {
    console.log("Download error:", error);
    alert(error.message);
  }
};

/* -------------------------- */
/* Share Image */
/* -------------------------- */

export const shareImage = async (url: string) => {
  try {
    const fileUri = await saveToTempFile(url);

    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing not available");
      return;
    }

    await Sharing.shareAsync(fileUri);
  } catch (error: any) {
    console.log("Share error:", error);
  }
};
