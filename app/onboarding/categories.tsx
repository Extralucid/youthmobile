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

const CategoriesScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [items, setItems] = useState([
    { label: "Technologies", value: "1" },
    { label: "ICT4D", value: "2" },
    { label: "Music", value: "3" },
    { label: "Sports", value: "4" },
    { label: "Cuisine", value: "5" },
    { label: "Education", value: "6" },
    { label: "Agriculture", value: "7" },
    { label: "Santé", value: "8" },
    { label: "Finance", value: "9" },
    { label: "Arts", value: "10" },
  ]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Load saved categories
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPrefs = await AsyncStorage.getItem("userPreferences");
        if (savedPrefs) {
          const { categories } = JSON.parse(savedPrefs);
          if (categories && categories.length > 0) {
            setSelectedValues(categories);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadPreferences();
  }, []);

  const handleSkip = () => {
    router.replace("/");
  };

  // Minimum selection requirement
  const MIN_SELECTIONS = 3;
  const totalSelections = selectedValues.length;
  const isSubmitDisabled = totalSelections < MIN_SELECTIONS;

  const handleContinue = async () => {
    try {
      const existingPrefs = await AsyncStorage.getItem("userPreferences");
      const preferences = existingPrefs
        ? { ...JSON.parse(existingPrefs), categories: selectedValues }
        : { categories: selectedValues, skills: [] };

      await AsyncStorage.setItem(
        "userPreferences",
        JSON.stringify(preferences)
      );
      router.push("/onboarding/skills");
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
        <View style={styles.progressIndicator}>
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
        </View>
        <Text style={styles.headerTitle}>Configuration du profil</Text>
        <Text style={styles.headerSubtitle}>Étape 1 sur 2</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Section */}
        <View style={styles.introSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="grid-outline" size={32} color="#06803A" />
          </View>
          <Text style={styles.title}>Catégories préférées</Text>
          <Text style={styles.subtitle}>
            Sélectionnez au moins {MIN_SELECTIONS} catégories qui vous
            intéressent pour personnaliser votre expérience
          </Text>
        </View>

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
            placeholder="Rechercher des catégories..."
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

        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Choisissez vos catégories</Text>

        <View style={styles.tagsContainer}>
          <Chips
            type="filter"
            itemVariant="outlined"
            items={items}
            setItems={setItems}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
        </View>

        {/* Help Text */}
        {totalSelections === 0 && (
          <View style={styles.helpContainer}>
            <Ionicons name="information-circle" size={20} color="#06803A" />
            <Text style={styles.helpText}>
              Commencez par sélectionner les catégories qui vous passionnent
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Passer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            isSubmitDisabled && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={isSubmitDisabled}
        >
          <Text style={styles.continueButtonText}>Continuer</Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color="#fff"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Reuse the same styles from previous solution

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  progressIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
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
    width: 60,
    height: 2,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#999",
    textAlign: "center",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
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
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.type.bold,
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.type.primary,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
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
    gap: 12,
    marginTop: 10,
  },
  helpText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#06803A",
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
    paddingBottom: 30,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 12,
  },
  skipButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  skipButtonText: {
    color: "#666",
    fontSize: 16,
    fontFamily: Fonts.type.semi,
  },
  continueButton: {
    flex: 2,
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06803A",
    shadowColor: "#06803A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.type.semi,
  },
});

export default CategoriesScreen;
