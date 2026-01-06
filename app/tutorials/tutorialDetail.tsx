import Fonts from "@/constants/Fonts";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Video } from "expo-av";
import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Section = {
  id: string;
  title: string;
  type: "video" | "pdf";
  duration?: string;
  contentUrl: string;
  completed?: boolean;
};

type Tutorial = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
  duration: string;
  difficulty: string;
  sections: Section[];
  resources?: {
    title: string;
    url: string;
  }[];
};

const TutorialDetailScreen = () => {
  const videoRef = useRef<Video>(null);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Sample tutorial data
  const tutorial: Tutorial = {
    id: "1",
    title: "React Native Fundamentals",
    description:
      "This comprehensive tutorial covers all the core concepts you need to start building React Native applications. Learn about components, state management, navigation and more.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    author: {
      name: "Jane Developer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    duration: "4h 30m",
    difficulty: "Beginner",
    sections: [
      {
        id: "1",
        title: "Introduction to React Native",
        type: "video",
        duration: "10:34",
        contentUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        completed: true,
      },
      {
        id: "2",
        title: "React Native Components Guide",
        type: "pdf",
        contentUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "3",
        title: "State Management Basics",
        type: "video",
        duration: "15:22",
        contentUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: "4",
        title: "Navigation Patterns",
        type: "video",
        duration: "12:45",
        contentUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
      {
        id: "5",
        title: "Best Practices & Tips",
        type: "pdf",
        contentUrl:
          "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
      },
    ],
    resources: [
      {
        title: "React Native Documentation",
        url: "https://reactnative.dev/docs/getting-started",
      },
      {
        title: "Expo Documentation",
        url: "https://docs.expo.dev",
      },
      {
        title: "React Navigation Docs",
        url: "https://reactnavigation.org/docs/getting-started",
      },
    ],
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSectionSelect = (section: Section) => {
    setCurrentSection(section);
    setIsPlaying(false);
  };

  const handleOpenPDF = async (url: string) => {
    try {
      const fileUri = `${FileSystem.cacheDirectory}temp.pdf`;
      const { uri } = await FileSystem.downloadAsync(url, fileUri);

      // Open the PDF
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: uri,
        flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
        type: "application/pdf",
      });
    } catch (error) {
      console.error("Error opening PDF:", error);
    }
  };

  const handleResourcePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tutoriel</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerAction}>
            <MaterialIcons name="bookmark-border" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerAction}>
            <Feather name="share-2" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Tutorial Header */}
        <View style={styles.tutorialHeader}>
          <Image
            source={{ uri: tutorial.thumbnail }}
            style={styles.thumbnail}
          />
          <Text style={styles.title}>{tutorial.title}</Text>
          <View style={styles.authorContainer}>
            <Image
              source={{ uri: tutorial.author.avatar }}
              style={styles.authorAvatar}
            />
            <Text style={styles.authorName}>{tutorial.author.name}</Text>
          </View>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MaterialIcons name="access-time" size={16} color="#666" />
              <Text style={styles.metaText}>{tutorial.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="school" size={16} color="#666" />
              <Text style={styles.metaText}>{tutorial.difficulty}</Text>
            </View>
          </View>
          <Text style={styles.description}>{tutorial.description}</Text>
        </View>

        {/* Current Section Player/Viewer */}
        {currentSection && (
          <View style={styles.currentSectionContainer}>
            <Text style={styles.sectionTitle}>
              Now Viewing: {currentSection.title}
            </Text>

            {currentSection.type === "video" ? (
              <>
                <Video
                  ref={videoRef}
                  source={{ uri: currentSection.contentUrl }}
                  style={styles.videoPlayer}
                  useNativeControls
                  resizeMode={"contain" as any}
                  onPlaybackStatusUpdate={(status) => {
                    if ("isLoaded" in status && status.isLoaded) {
                      setIsPlaying(status.isPlaying || false);
                      if (status.durationMillis) {
                        setProgress(
                          status.positionMillis / status.durationMillis
                        );
                      }
                    }
                  }}
                />
                <View style={styles.videoControls}>
                  <TouchableOpacity onPress={handlePlayPause}>
                    <Ionicons
                      name={isPlaying ? "pause" : "play"}
                      size={24}
                      color="#06803A"
                    />
                  </TouchableOpacity>
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        { width: `${progress * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.durationText}>
                    {currentSection.duration}
                  </Text>
                </View>
              </>
            ) : (
              <TouchableOpacity
                style={styles.pdfContainer}
                onPress={() => handleOpenPDF(currentSection.contentUrl)}
              >
                <Feather name="file-text" size={48} color="#06803A" />
                <Text style={styles.pdfText}>Open PDF Document</Text>
                <Text style={styles.pdfSubtext}>{currentSection.title}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Sections List */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionHeader}>Course Content</Text>
          {tutorial.sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionItem,
                currentSection?.id === section.id && styles.activeSection,
              ]}
              onPress={() => handleSectionSelect(section)}
            >
              <View style={styles.sectionLeft}>
                {section.type === "video" ? (
                  <Feather name="video" size={20} color="#666" />
                ) : (
                  <Feather name="file-text" size={20} color="#666" />
                )}
                <Text style={styles.sectionTitleText}>{section.title}</Text>
              </View>
              <View style={styles.sectionRight}>
                {section.duration && (
                  <Text style={styles.sectionDuration}>{section.duration}</Text>
                )}
                {section.completed && (
                  <AntDesign name="check" size={16} color="#4CAF50" />
                )}
                <MaterialIcons name="chevron-right" size={20} color="#999" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Resources */}
        {tutorial.resources && tutorial.resources.length > 0 && (
          <View style={styles.resourcesContainer}>
            <Text style={styles.sectionHeader}>Resources</Text>
            {tutorial.resources.map((resource, index) => (
              <TouchableOpacity
                key={index}
                style={styles.resourceItem}
                onPress={() => handleResourcePress(resource.url)}
              >
                <Feather name="external-link" size={16} color="#06803A" />
                <Text style={styles.resourceText}>{resource.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerAction: {
    padding: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#f8f9fa",
  },
  tutorialHeader: {
    marginBottom: 24,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 12,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontFamily: Fonts.type.primary,
    color: "#666",
  },
  metaContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginLeft: 4,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    lineHeight: 22,
    color: "#333",
  },
  currentSectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 12,
  },
  videoPlayer: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
    marginBottom: 8,
  },
  videoControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#06803A",
  },
  durationText: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    minWidth: 40,
    textAlign: "right",
  },
  pdfContainer: {
    alignItems: "center",
    padding: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
  },
  pdfText: {
    fontSize: 16,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
    marginTop: 8,
  },
  pdfSubtext: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginTop: 4,
  },
  sectionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 16,
  },
  sectionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activeSection: {
    backgroundColor: "#f5f5f5",
  },
  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  sectionTitleText: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
  sectionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionDuration: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginRight: 12,
  },
  resourcesContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  resourceText: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
});

export default TutorialDetailScreen;
