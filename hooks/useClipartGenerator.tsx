import { useState } from "react";
import { STYLES } from "../constants/styles";
import { generateClipartUrl } from "../services/pollinationsService";

export type GeneratedImage = {
  styleId: string;
  label: string;
  emoji: string;
  url: string;
  loading: boolean;
  error: boolean;
};

export const useClipartGenerator = () => {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async (imageUri: string, selectedStyleIds: string[]) => {
    try {
      setIsGenerating(true);

      // Show skeletons immediately
      const skeletons: GeneratedImage[] = selectedStyleIds.map((id) => {
        const style = STYLES.find((s) => s.id === id)!;
        return {
          styleId: id,
          label: style.label,
          emoji: style.emoji,
          url: "",
          loading: true,
          error: false,
        };
      });
      setGeneratedImages(skeletons);

      const selectedStyles = STYLES.filter((s) =>
        selectedStyleIds.includes(s.id),
      );

      // ✅ Generate all styles in parallel
      const results = await Promise.allSettled(
        selectedStyles.map(async (style) => {
          const url = await generateClipartUrl(
            "person avatar portrait, detailed face, front view",
            style.prompt,
          );
          return { styleId: style.id, url };
        }),
      );

      const finalImages: GeneratedImage[] = selectedStyles.map(
        (style, index) => {
          const result = results[index];
          return {
            styleId: style.id,
            label: style.label,
            emoji: style.emoji,
            url: result.status === "fulfilled" ? result.value.url : "",
            loading: false,
            error: result.status === "rejected",
          };
        },
      );

      setGeneratedImages(finalImages);
    } catch (error) {
      console.error("Generation error:", error);
      alert("Something went wrong. Please try again.");
      setGeneratedImages([]);
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => setGeneratedImages([]);

  return { generatedImages, isGenerating, generate, reset };
};
