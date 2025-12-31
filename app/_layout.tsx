import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Provider, useDispatch } from "react-redux";
import Fonts from "../constants/Fonts";
import { store } from "./store/store";
//import i18n from "./utils/i18n";

SplashScreen.preventAutoHideAsync();

const AppContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts(Fonts.customFonts);

  useEffect(() => {
    // dispatch(initializeLanguage());
  }, [dispatch]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setAppIsReady(true);
      SplashScreen.hideAsync();
      console.log("Fonts loaded:", fontsLoaded, "Error:", fontError);
    }
  }, [fontsLoaded, fontError]);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#F59B21" />
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* <I18nextProvider i18n={i18n}> */}
      <AppContent>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="auth/login" options={{ title: "Login" }} />
          <Stack.Screen name="auth/signup" options={{ title: "Signup" }} />
          <Stack.Screen
            name="settings/services"
            options={{ title: "Service" }}
          />
          <Stack.Screen
            name="settings/universites"
            options={{ title: "Universite" }}
          />
          <Stack.Screen
            name="settings/entreprises"
            options={{ title: "Entreprise" }}
          />
          <Stack.Screen
            name="settings/entrepriseDetail"
            options={{ title: "EntrepriseDetail" }}
          />
          <Stack.Screen
            name="settings/universiteDetail"
            options={{ title: "UniversiteDetail" }}
          />
          <Stack.Screen name="about" options={{ title: "About" }} />
          <Stack.Screen name="blog/index" options={{ title: "Blog" }} />
          <Stack.Screen
            name="blog/blogDetails"
            options={{ title: "BlogDetail" }}
          />

          <Stack.Screen name="job/index" options={{ title: "Job" }} />
          <Stack.Screen name="job/jobDetail" options={{ title: "JobDetail" }} />

          <Stack.Screen name="books/index" options={{ title: "Book" }} />
          <Stack.Screen
            name="books/bookDetail"
            options={{ title: "BookDetail" }}
          />

          <Stack.Screen name="forum/index" options={{ title: "Forum" }} />
          <Stack.Screen
            name="forum/forumDetail"
            options={{ title: "forumDetail" }}
          />
          <Stack.Screen
            name="forum/topics"
            options={{ title: "topicDetail" }}
          />

          <Stack.Screen name="podcast/index" options={{ title: "Podcast" }} />
          <Stack.Screen
            name="podcast/podcastDetail"
            options={{ title: "PodcastDetail" }}
          />

          <Stack.Screen name="chat/index" options={{ title: "ChatRoom" }} />
          <Stack.Screen
            name="chat/conversation/[id]"
            options={{ title: "Conversation" }}
          />
        </Stack>
      </AppContent>
      {/* </I18nextProvider> */}
    </Provider>
  );
}
