import Fonts from "@/constants/Fonts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UniversiteScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [checks, setChecks] = useState([
    {
      id: 1,
      company: "ESTA",
      logo: require("../../assets/images/hermes-logo.png"), // Replace with actual logo
      amount: "Ouaga",
      date: "March 13, 2018",
      category: "Reseaux et Télécoms",
      status: "En attente",
      checked: false,
    },
    {
      id: 2,
      company: "ISIG",
      logo: require("../../assets/images/philipp-plein-logo.png"),
      amount: "Bobo",
      date: "March 13, 2018",
      category: "Informatique",
      status: "En attente",
      checked: false,
    },
    {
      id: 3,
      company: "USTA",
      logo: require("../../assets/images/loctane-logo.png"),
      amount: "Ouaga",
      date: "March 13, 2018",
      category: "Electronique",
      status: "En attente",
      checked: false,
    },
    {
      id: 4,
      company: "UJKZ",
      logo: require("../../assets/images/kenzo-logo.png"),
      amount: "Ouaga",
      date: "March 13, 2018",
      status: "En attente",
      category: "Langues",
      checked: false,
    },
  ]);

  const filters = [
    "Tous",
    "Journalisme",
    "Electronique",
    "Informatique",
    "Autres",
  ];

  const toggleCheck = (id: number) => {
    setChecks(
      checks.map((check) =>
        check.id === id ? { ...check, checked: !check.checked } : check
      )
    );
  };

  const filteredChecks = checks.filter((check) => {
    const matchesSearch = check.company
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "Tous" || check.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {showSearch ? (
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color="#999" />
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              <TouchableOpacity
                onPress={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
              >
                <Ionicons name="close" size={18} color="#999" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Universités Partenaires</Text>
              <TouchableOpacity onPress={() => setShowSearch(true)}>
                <Ionicons name="search" size={22} color="#333" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.chip,
                activeFilter === filter && styles.chipActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.chipText,
                  activeFilter === filter && styles.chipTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* University List */}
      <FlatList
        data={filteredChecks}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link href={`/settings/universiteDetail`} key={item.id} asChild>
            <TouchableOpacity style={styles.card}>
              {/* Banner flou en arrière-plan */}
              <View style={styles.cardHeader}>
                <ImageBackground
                  source={require("../../assets/images/sample1.jpg")}
                  style={styles.bannerBackground}
                  imageStyle={styles.bannerImage}
                  blurRadius={8}
                >
                  <View style={styles.overlay} />
                </ImageBackground>

                {/* Contenu au premier plan */}
                <View style={styles.headerContent}>
                  <Image
                    source={item.logo}
                    style={styles.universityLogo}
                    resizeMode="cover"
                  />
                  <View style={styles.universityMeta}>
                    <Text style={styles.universityName}>{item.company}</Text>
                    <View style={styles.verifiedRow}>
                      <Ionicons name="ribbon" size={14} color="#F59B21" />
                      <Text style={styles.verifiedText}>
                        Accréditation CAMES
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Séparateur */}
              <View style={styles.divider} />

              {/* Filière mise en avant */}
              <View style={styles.categorySection}>
                <Text style={styles.categoryLabel}>Filière principale</Text>
                <View style={styles.categoryContainer}>
                  <Ionicons name="book" size={20} color="#06803A" />
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </View>

              {/* Séparateur */}
              <View style={styles.divider} />

              {/* Stats en grille */}
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Ionicons name="location-outline" size={20} color="#F59B21" />
                  <Text style={styles.statLabel}>Ville</Text>
                  <Text style={styles.statValue}>{item.amount}</Text>
                </View>
                <View style={styles.statBoxDivider} />
                <View style={styles.statBox}>
                  <Ionicons name="calendar-outline" size={20} color="#F59B21" />
                  <Text style={styles.statLabel}>Membre depuis</Text>
                  <Text style={styles.statValue}>2018</Text>
                </View>
                <View style={styles.statBoxDivider} />
                <View style={styles.statBox}>
                  <Ionicons name="people-outline" size={20} color="#F59B21" />
                  <Text style={styles.statLabel}>Étudiants</Text>
                  <Text style={styles.statValue}>1,200+</Text>
                </View>
              </View>

              {/* Séparateur */}
              <View style={styles.divider} />

              {/* Contacts footer */}
              <View style={styles.contactRow}>
                <TouchableOpacity style={styles.contactItem}>
                  <Ionicons name="call" size={20} color="#06803A" />
                  <Text style={styles.contactLabel}>Appeler</Text>
                </TouchableOpacity>
                <View style={styles.contactDivider} />
                <TouchableOpacity style={styles.contactItem}>
                  <Ionicons name="globe" size={20} color="#06803A" />
                  <Text style={styles.contactLabel}>Site Web</Text>
                </TouchableOpacity>
                <View style={styles.contactDivider} />
                <TouchableOpacity style={styles.contactItem}>
                  <Ionicons name="document-text" size={20} color="#06803A" />
                  <Text style={styles.contactLabel}>Programmes</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="school" size={60} color="#ddd" />
            <Text style={styles.emptyText}>Aucune université trouvée</Text>
            <Text style={styles.emptySubtext}>
              Essayez un autre filtre ou recherche
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
    flex: 1,
    marginLeft: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
  },
  chipsContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingTop: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  chipActive: {
    backgroundColor: "#06803A",
  },
  chipText: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#666",
  },
  chipTextActive: {
    color: "#fff",
  },
  content: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    position: "relative",
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    height: 180,
  },
  bannerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  bannerImage: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  headerContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    paddingVertical: 20,
  },
  universityLogo: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  universityMeta: {
    flexDirection: "column",
    alignItems: "center",
  },
  universityName: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#fff",
    marginBottom: 6,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontFamily: Fonts.type.semi,
    color: "#F59B21",
  },
  statusBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F57C00",
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.type.semi,
    color: "#F57C00",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 14,
  },
  categorySection: {
    alignItems: "center",
    paddingVertical: 4,
  },
  categoryLabel: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryText: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#06803A",
  },
  statsGrid: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  statBoxDivider: {
    width: 1,
    backgroundColor: "#f0f0f0",
  },
  statLabel: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginTop: 6,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 15,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  contactRow: {
    flexDirection: "row",
    paddingTop: 4,
  },
  contactItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    gap: 4,
  },
  contactDivider: {
    width: 1,
    backgroundColor: "#f0f0f0",
  },
  contactLabel: {
    fontSize: 11,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#999",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#bbb",
    marginTop: 8,
  },
});

export default UniversiteScreen;
