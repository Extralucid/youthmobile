import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");

type ServiceItem = {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  description: string;
  href: string;
  color: string;
};

const ServicesScreen = () => {
  const cardData: ServiceItem[] = [
    {
      id: 1,
      icon: "briefcase-outline",
      label: "Offres d'emploi",
      description: "Découvrez les opportunités",
      href: "/job",
      color: "#06803A",
    },
    {
      id: 2,
      icon: "document-text-outline",
      label: "Blogs",
      description: "Articles et actualités",
      href: "/blog",
      color: "#2196F3",
    },
    {
      id: 3,
      icon: "school-outline",
      label: "Tutoriels",
      description: "Apprenez de nouvelles compétences",
      href: "/tutorials",
      color: "#FF9800",
    },
    {
      id: 4,
      icon: "mic-outline",
      label: "Podcasts",
      description: "Écoutez et inspirez-vous",
      href: "/podcast",
      color: "#9C27B0",
    },
    {
      id: 5,
      icon: "chatbubbles-outline",
      label: "Chat",
      description: "Discutez en temps réel",
      href: "/chat",
      color: "#4CAF50",
    },
    {
      id: 6,
      icon: "library-outline",
      label: "Livres",
      description: "Bibliothèque numérique",
      href: "/books",
      color: "#F44336",
    },
    {
      id: 7,
      icon: "people-outline",
      label: "Forums",
      description: "Échangez avec la communauté",
      href: "/forum",
      color: "#00BCD4",
    },
    {
      id: 8,
      icon: "business-outline",
      label: "Entreprises",
      description: "Annuaire des sociétés",
      href: "/settings/entreprises",
      color: "#607D8B",
    },
    {
      id: 9,
      icon: "book-outline",
      label: "Universités",
      description: "Instituts et formations",
      href: "/settings/universites",
      color: "#795548",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.backText}>Services</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Explorez nos services</Text>
            <Text style={styles.heroSubtitle}>
              Toutes les ressources dont vous avez besoin pour réussir
            </Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>9</Text>
              <Text style={styles.statLabel}>Services</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Disponible</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          {cardData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => {
                router.navigate(item.href as any);
              }}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color + "15" },
                ]}
              >
                <Ionicons name={item.icon} size={32} color={item.color} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
  },
  headerButton: {
    padding: 4,
  },
  heroSection: {
    backgroundColor: "#06803A",
    margin: 16,
    marginTop: 8,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#06803A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heroContent: {
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: Fonts.type.bold,
    color: "white",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontFamily: Fonts.type.bold,
    color: "white",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "rgba(255,255,255,0.85)",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    fontFamily: Fonts.type.primary,
    color: "#666",
  },
});

export default ServicesScreen;
