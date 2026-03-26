export default {
  expo: {
    name: "Clipart Pro",
    slug: "clipart-pro",
    version: "1.0.0",
    orientation: "portrait",

    icon: "./assets/images/Logo.png",

    splash: {
      image: "./assets/images/Splash_Screen.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    ios: {
      bundleIdentifier: "com.ayush.clipartpro",
      supportsTablet: true,
    },

    android: {
      package: "com.ayush.clipartpro",
      adaptiveIcon: {
        foregroundImage: "./assets/images/Logo.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "READ_MEDIA_IMAGES",
      ],
    },

    plugins: [
      "expo-router",
      [
        "expo-media-library",
        {
          photosPermission: "Allow access to save generated clipart images",
          savePhotosPermission: "Allow access to save generated clipart images",
        },
      ],
    ],

    extra: {
      hfToken: process.env.EXPO_PUBLIC_HF_TOKEN,
    },
  },
};
