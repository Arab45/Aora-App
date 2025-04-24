// app.config.js
import 'dotenv/config'; // allows using .env variables

export default () => ({
  expo: {
    name: "Aora-app",
    slug: "Aora-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/aoraImages/logo.png",
    scheme: "Aora",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/aoraImages/logo.png",
        backgroundColor: "#161622"
      },
      statusBar: {
        barStyle: "light-content",
        backgroundColor: "#161622"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "cover",
          backgroundColor: "#161622"
        }
      ],
      "expo-secure-store"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
    }
  },
  
});
