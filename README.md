# AI Clipart Generator – Mobile App

This project is a React Native mobile application that allows users to upload an image and generate multiple clipart-style versions using AI. The app supports different visual styles and allows users to download or share the generated images.

---

# Setup Instructions

1. Clone the repository

```
git clone https://github.com/ayushagrawal2806/Flickd-Assignment
cd Flickd-Assignment
```

2. Install dependencies

```
npm install
```

3. Add environment variable

Create a `.env` file:

```
EXPO_PUBLIC_HF_TOKEN=your_huggingface_api_token
```

4. Run the app

```
npx expo start
```

Run on Android:

```
npm run android
```

---

# Tech Decisions

* **React Native + Expo** for cross-platform mobile development
* **HuggingFace Stable Diffusion XL** for AI image generation
* **expo-image-picker** for image upload
* **expo-media-library** for saving generated images
* **expo-sharing** for sharing images
* **react-native-toast-message** for user feedback
* Parallel AI generation using `Promise.allSettled` for better performance

---

# Tradeoffs

Due to API credit limitations, the AI generation currently uses prompt-based style generation instead of full image-to-image transformation with the uploaded photo. The architecture is designed so it can be extended to support image-conditioned models in the future.

---

# APK Download

Google Drive APK link:

```
https://drive.google.com/file/d/1L33MKjaY11L0Ouen5XTQjpD6F3XUtGXh/view?usp=sharing
```

---

# Screen Recording

Google Drive video link:

```
https://drive.google.com/file/d/15lBu0LrzzhxaEvC6tSizI8ozVy-YJU8j/view?usp=sharing
```
