import Fonts from "@/constants/Fonts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Tutorial = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  sectionsCount: number;
  author: string;
};

const TutorialsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  // Sample tutorial data
  const tutorials: Tutorial[] = [
    {
      id: "1",
      title: "React Native Fundamentals",
      description: "Learn the core concepts of React Native development",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      duration: "4h 30m",
      difficulty: "Beginner",
      sectionsCount: 12,
      author: "Jane Developer",
    },
    // Add more tutorials...
  ];

  // Filter tutorials
  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty
      ? tutorial.difficulty === selectedDifficulty
      : true;
    return matchesSearch && matchesDifficulty;
  });

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {showSearch ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search checks..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            <TouchableOpacity
              style={styles.closeSearch}
              onPress={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Formations || Tutoriels</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowSearch(true)}
              >
                <Ionicons name="search" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.navigate("/tutorials/createTutorial")}
              >
                <Ionicons name="add-circle" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Difficulty Filter */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.difficultyContainer}
        >
          <TouchableOpacity
            style={[
              styles.difficulty,
              !selectedDifficulty && styles.activeDifficulty,
            ]}
            onPress={() => setSelectedDifficulty(null)}
          >
            <Text
              style={[
                styles.difficultyText,
                !selectedDifficulty && styles.activeDifficultyText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={[
                styles.difficulty,
                selectedDifficulty === difficulty && styles.activeDifficulty,
              ]}
              onPress={() =>
                setSelectedDifficulty(
                  difficulty === selectedDifficulty ? null : difficulty
                )
              }
            >
              <Text
                style={[
                  styles.difficultyText,
                  selectedDifficulty === difficulty &&
                    styles.activeDifficultyText,
                ]}
              >
                {difficulty}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tutorials List */}
      <ScrollView
        contentContainerStyle={styles.tutorialsContainer}
        style={styles.tutorialsList}
      >
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map((tutorial) => (
            <Link href={`/tutorials/tutorialDetail`} key={tutorial.id} asChild>
              <TouchableOpacity style={styles.tutorialCard}>
                <Image
                  source={{ uri: tutorial.thumbnail }}
                  style={styles.tutorialThumbnail}
                />
                <View style={styles.tutorialInfo}>
                  <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
                  <Text style={styles.tutorialDescription} numberOfLines={2}>
                    {tutorial.description}
                  </Text>
                  <View style={styles.tutorialMeta}>
                    <View style={styles.metaItem}>
                      <MaterialIcons
                        name="library-books"
                        size={16}
                        color="#666"
                      />
                      <Text style={styles.metaText}>
                        {tutorial.sectionsCount} sections
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <MaterialIcons
                        name="access-time"
                        size={16}
                        color="#666"
                      />
                      <Text style={styles.metaText}>{tutorial.duration}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.difficultyBadge,
                      tutorial.difficulty === "Beginner" &&
                        styles.beginnerBadge,
                      tutorial.difficulty === "Intermediate" &&
                        styles.intermediateBadge,
                      tutorial.difficulty === "Advanced" &&
                        styles.advancedBadge,
                    ]}
                  >
                    <Text style={styles.difficultyBadgeText}>
                      {tutorial.difficulty}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="school" size={50} color="#ccc" />
            <Text style={styles.emptyStateText}>No tutorials found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try a different search or filter
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    fontFamily: Fonts.type.primary,
  },
  closeSearch: {
    marginLeft: 8,
  },
  filterContainer: {
    height: 56,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  difficultyContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  tutorialsList: {
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  difficulty: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 36,
    backgroundColor: "#f0f0f0",
    borderRadius: 18,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDifficulty: {
    backgroundColor: "#06803A",
  },
  difficultyText: {
    color: "#666",
    fontSize: 14,
    fontFamily: Fonts.type.primary,
  },
  activeDifficultyText: {
    color: "#fff",
    fontFamily: Fonts.type.semi,
  },
  tutorialsContainer: {
    paddingBottom: 16,
  },
  tutorialCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tutorialThumbnail: {
    width: "100%",
    height: 180,
  },
  tutorialInfo: {
    padding: 16,
  },
  tutorialTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 8,
  },
  tutorialDescription: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  tutorialMeta: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginLeft: 4,
  },
  difficultyBadge: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  beginnerBadge: {
    backgroundColor: "#e6f7e6",
  },
  intermediateBadge: {
    backgroundColor: "#fff3e0",
  },
  advancedBadge: {
    backgroundColor: "#ffebee",
  },
  difficultyBadgeText: {
    fontSize: 12,
    fontFamily: Fonts.type.semi,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: Fonts.type.semi,
    color: "#666",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginTop: 4,
  },
});

export default TutorialsScreen;
