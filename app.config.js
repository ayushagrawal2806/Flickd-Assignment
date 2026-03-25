export default {
  expo: {
    name: "Clipart Pro",
    slug: "clipart-pro",
    version: "1.0.0",
    ios: {
      bundleIdentifier: "com.ayush.clipartpro",
    },
    extra: {
      hfToken: process.env.EXPO_PUBLIC_HF_TOKEN,
    },
    android: {
      package: "com.ayush.clipartpro",
      usesCleartextTraffic: true,
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "MEDIA_LIBRARY",
      ],
    },
  },
};
