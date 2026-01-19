import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Chips } from "react-native-material-chips";
import { SafeAreaView } from "react-native-safe-area-context";

const MIN_SELECTIONS = 3;

const SkillsScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Items for the Chips component
  const [items] = useState([
    { id: 1, value: "1", label: "Programmation" },
    { id: 2, value: "2", label: "Design" },
    { id: 3, value: "3", label: "Rédaction" },
    { id: 4, value: "4", label: "Marketing" },
    { id: 5, value: "5", label: "Photographie" },
    { id: 6, value: "6", label: "Leadership" },
    { id: 7, value: "7", label: "Langues" },
    { id: 8, value: "8", label: "Cuisine" },
    { id: 9, value: "9", label: "Gestion de projet" },
    { id: 10, value: "10", label: "Communication" },
    { id: 11, value: "11", label: "Analyses de données" },
    { id: 12, value: "12", label: "Entrepreneuriat" },
  ]);

  // Selected values controlled by Chips component
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const totalSelections = selectedValues.length;
  // Load saved skills
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPrefs = await AsyncStorage.getItem("userPreferences");
        if (savedPrefs) {
          const { skills } = JSON.parse(savedPrefs);
          if (skills && skills.length > 0) {
            setSelectedValues(skills);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadPreferences();
  }, []);

  const isSubmitDisabled = totalSelections < MIN_SELECTIONS;

  const handleSubmit = async () => {
    try {
      const existingPrefs = await AsyncStorage.getItem("userPreferences");
      const preferences = existingPrefs
        ? { ...JSON.parse(existingPrefs), skills: selectedValues }
        : { categories: [], skills: selectedValues };

      await AsyncStorage.setItem(
        "userPreferences",
        JSON.stringify(preferences)
      );
      router.replace("/");
    } catch (error) {
      console.error("Failed to save preferences", error);
    }
  };

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#06803A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.progressIndicator}>
            <View style={styles.progressDot} />
            <View style={styles.progressLine} />
            <View style={[styles.progressDot, styles.activeDot]} />
          </View>
          <Text style={styles.headerTitle}>Configuration du profil</Text>
          <Text style={styles.headerSubtitle}>Étape 2 sur 2</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Section */}
        <View style={styles.introSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="bulb-outline" size={32} color="#06803A" />
          </View>
          <Text style={styles.title}>Compétences acquises</Text>
          <Text style={styles.subtitle}>
            Sélectionnez au moins {MIN_SELECTIONS} compétences que vous
            maîtrisez pour mettre en valeur votre profil
          </Text>
        </View>

        {/* Stats Card */}
        {totalSelections > 0 && (
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle" size={24} color="#06803A" />
              <View style={styles.statContent}>
                <Text style={styles.statNumber}>{totalSelections}</Text>
                <Text style={styles.statLabel}>Sélectionné(s)</Text>
              </View>
            </View>
            {totalSelections < MIN_SELECTIONS && (
              <View style={styles.statDivider} />
            )}
            {totalSelections < MIN_SELECTIONS && (
              <View style={styles.statItem}>
                <Ionicons
                  name="alert-circle-outline"
                  size={24}
                  color="#F59B21"
                />
                <View style={styles.statContent}>
                  <Text style={styles.statNumber}>
                    {MIN_SELECTIONS - totalSelections}
                  </Text>
                  <Text style={styles.statLabel}>Restant(s)</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Search Input */}
        <Text style={styles.sectionTitle}>Rechercher</Text>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des compétences..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Skills Section */}
        <Text style={styles.sectionTitle}>Choisissez vos compétences</Text>

        <View style={styles.tagsContainer}>
          <Chips
            type="filter"
            itemVariant="outlined"
            items={items}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
        </View>

        {/* Help Text */}
        {totalSelections === 0 && (
          <View style={styles.helpContainer}>
            <Ionicons name="information-circle" size={20} color="#06803A" />
            <Text style={styles.helpText}>
              Commencez par sélectionner les compétences que vous possédez
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.skipButtonText}>Passer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.completeButton,
            isSubmitDisabled && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
        >
          <Text style={styles.completeButtonText}>Terminer</Text>
          <Ionicons
            name="checkmark"
            size={20}
            color="#fff"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Reuse the same styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  progressIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
  },
  activeDot: {
    backgroundColor: "#06803A",
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 13,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginTop: 4,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  introSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.type.bold,
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  statContent: {
    marginLeft: 12,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
  },
  tagsContainer: {
    marginBottom: 20,
  },
  helpContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  helpText: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#06803A",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 12,
  },
  skipButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  skipButtonText: {
    color: "#666",
    fontSize: 16,
    fontFamily: Fonts.type.semi,
  },
  completeButton: {
    flex: 2,
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06803A",
    shadowColor: "#06803A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.6,
    shadowOpacity: 0,
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.type.semi,
  },
});

export default SkillsScreen;
