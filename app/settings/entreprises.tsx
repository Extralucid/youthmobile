import Fonts from "@/constants/Fonts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { Link, router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Check = {
  id: string;
  brand: string;
  logo?: number; // local asset
  amount: string;
  date: string;
  status: "En attente";
};

const ALL_DATA: Check[] = [
  {
    id: "1",
    brand: "SANCFIS",
    logo: require("../../assets/images/hermes-logo.png"),
    amount: "xof1,500.67",
    date: "12/12/2020",
    status: "En attente",
  },
  {
    id: "2",
    brand: "Orange",
    logo: require("../../assets/images/hermes-logo.png"),
    amount: "xof1,245.17",
    date: "22/10/2025",
    status: "En attente",
  },
  {
    id: "3",
    brand: "ATOS",
    logo: require("../../assets/images/hermes-logo.png"),
    amount: "xof545.28",
    date: "12/10/2009",
    status: "En attente",
  },
  {
    id: "4",
    brand: "Kenzo",
    logo: require("../../assets/images/hermes-logo.png"),
    amount: "xof375.37",
    date: "12/11/2021",
    status: "En attente",
  },
];

const FILTER_OPTIONS = ["Tous", "En attente", "Valide"];

export default function EntreprisesScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeChip, setActiveChip] = useState("Tous");

  /* ---------- Filtering & Search ---------- */
  const filteredData = useMemo(() => {
    let data = ALL_DATA;

    // 1. Chip filter
    if (activeChip !== "Tous") {
      data = data.filter((c) => c.status === activeChip);
    }

    // 2. Text search (case-insensitive, brand only)
    if (searchText.trim()) {
      data = data.filter((c) =>
        c.brand.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return data;
  }, [activeChip, searchText]);

  /* ---------- Render ---------- */
  const renderItem = ({ item }: { item: Check }) => (
    <Link href={`/settings/entrepriseDetail`} key={item.id} asChild>
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
              style={styles.companyLogo}
              resizeMode="cover"
            />
            <View style={styles.companyMeta}>
              <Text style={styles.brandText}>{item.brand}</Text>
              <View style={styles.verifiedRow}>
                <Ionicons name="shield-checkmark" size={14} color="#F59B21" />
                <Text style={styles.verifiedText}>Partenaire vérifié</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Séparateur */}
        <View style={styles.divider} />

        {/* Stats en grille avec bordures */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Ionicons name="calendar-outline" size={20} color="#F59B21" />
            <Text style={styles.statLabel}>Rejoint le</Text>
            <Text style={styles.statValue}>{item.date}</Text>
          </View>
          <View style={styles.statBoxDivider} />
          <View style={styles.statBox}>
            <Ionicons name="people-outline" size={20} color="#F59B21" />
            <Text style={styles.statLabel}>Employés</Text>
            <Text style={styles.statValue}>250+</Text>
          </View>
          <View style={styles.statBoxDivider} />
          <View style={styles.statBox}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.statLabel}>Note</Text>
            <Text style={styles.statValue}>4.8</Text>
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
            <Ionicons name="mail" size={20} color="#06803A" />
            <Text style={styles.contactLabel}>Email</Text>
          </TouchableOpacity>
          <View style={styles.contactDivider} />
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="location" size={20} color="#06803A" />
            <Text style={styles.contactLabel}>Adresse</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const renderChip = (label: string) => (
    <Pressable
      key={label}
      onPress={() => setActiveChip(label)}
      style={[styles.chip, activeChip === label && styles.chipActive]}
    >
      <Text
        style={[styles.chipText, activeChip === label && styles.chipTextActive]}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {showSearch ? (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher..."
                value={searchText}
                onChangeText={setSearchText}
                autoFocus={true}
              />
              <TouchableOpacity
                style={styles.closeSearch}
                onPress={() => {
                  setShowSearch(false);
                  setSearchText("");
                }}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Entreprises Partenaires</Text>
              <TouchableOpacity onPress={() => setShowSearch(true)}>
                <Ionicons name="search" size={24} color="#333" />
              </TouchableOpacity>
            </>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContent}
        >
          {FILTER_OPTIONS.map(renderChip)}
        </ScrollView>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(c) => c.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="business" size={60} color="#ddd" />
            <Text style={styles.emptyText}>Aucune entreprise trouvée</Text>
            <Text style={styles.emptySubtext}>
              Essayez un autre filtre ou recherche
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

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
    color: "#333",
  },
  closeSearch: {
    marginLeft: 8,
  },
  chipsContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingTop: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
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
  listContent: {
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#fff",
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
  companyLogo: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  companyMeta: {
    flexDirection: "column",
    alignItems: "center",
  },
  brandText: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#fff",
    marginBottom: 4,
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
  amountSection: {
    alignItems: "center",
    paddingVertical: 4,
  },
  amountLabel: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  amountText: {
    fontSize: 22,
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
