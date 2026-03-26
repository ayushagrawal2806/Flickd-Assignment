import Constants from "expo-constants";
export const generateClipartUrl = async (
  description: string,
  stylePrompt: string,
): Promise<string> => {
  const token =
    Constants.expoConfig?.extra?.hfToken ?? process.env.EXPO_PUBLIC_HF_TOKEN;
  const prompt = `${stylePrompt}, ${description}`;

  const res = await fetch(
    "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "image/png",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          width: 512,
          height: 512,
          num_inference_steps: 20,
        },
      }),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    console.log("HF gen error:", err);
    throw new Error("Image generation failed");
  }

  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
