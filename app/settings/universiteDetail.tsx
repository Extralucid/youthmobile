import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UniversiteDetailScreen = () => {
  const items = [
    {
      name: "Systeme d'information et reseaux",
      price: "xof450 000",
      quantity: "an 1",
      vat: "Première année",
    },
    {
      name: "Genie Industrielle",
      price: "xof450 000",
      quantity: "an 1",
      vat: "Première année",
    },
    {
      name: "Controle Audit",
      price: "xof450 000",
      quantity: "an 1",
      vat: "Première année",
    },
    {
      name: "Finances Comptabilite",
      price: "xof450 000",
      quantity: "an 1",
      vat: "Première année",
    },
  ];

  const subtotal = items.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace("$", "").replace(",", "")),
    0
  );
  const formattedSubtotal = `$${subtotal
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de l&apos;Université</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="bookmark-outline" size={22} color="#06803A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="share-social-outline" size={22} color="#06803A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* University Header Card */}
        <View style={styles.universityCard}>
          <View style={styles.universityHeader}>
            <View style={styles.logoLarge}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=400",
                }}
                style={styles.logoImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.universityHeaderInfo}>
              <Text style={styles.universityName}>ESTA</Text>
              <View style={styles.categoryBadge}>
                <Ionicons name="ribbon" size={14} color="#06803A" />
                <Text style={styles.categoryText}>Accréditation CAMES</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="calendar-outline" size={20} color="#06803A" />
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>Membre depuis</Text>
                <Text style={styles.statValue}>Mars 2018</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="book-outline" size={20} color="#06803A" />
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>Filières</Text>
                <Text style={styles.statValue}>{items.length}</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="people-outline" size={20} color="#06803A" />
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>Étudiants</Text>
                <Text style={styles.statValue}>2,500+</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <View style={styles.itemCard}>
              <Ionicons name="location-outline" size={20} color="#06803A" />
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>Localisation</Text>
                <Text style={styles.itemValue}>Ouagadougou, Burkina Faso</Text>
              </View>
            </View>
            <View style={styles.itemCard}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#06803A"
              />
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>Statut</Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>En Attente</Text>
                </View>
              </View>
            </View>
            <View style={styles.itemCard}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#06803A"
              />
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>Diplômes CAMES</Text>
                <Text style={styles.itemValue}>✅ Reconnus</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Programs Section */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Programmes & Filières</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.programCard}>
              <View style={styles.programHeader}>
                <View style={styles.programIcon}>
                  <Ionicons name="school-outline" size={20} color="#06803A" />
                </View>
                <View style={styles.programInfo}>
                  <Text style={styles.programName}>{item.name}</Text>
                  <Text style={styles.programLevel}>{item.vat}</Text>
                </View>
              </View>
              <View style={styles.programDivider} />
              <View style={styles.programFooter}>
                <View style={styles.priceTag}>
                  <Ionicons name="cash-outline" size={16} color="#F57C00" />
                  <Text style={styles.programPrice}>{item.price}</Text>
                </View>
                <TouchableOpacity style={styles.enrollButton}>
                  <Text style={styles.enrollButtonText}>S&apos;inscrire</Text>
                  <Ionicons name="arrow-forward" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Contact Card */}
        <View style={styles.contactCard}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="call" size={20} color="#fff" />
              <Text style={styles.contactButtonText}>Appeler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactButton, styles.secondaryContactButton]}
            >
              <Ionicons name="mail" size={20} color="#06803A" />
              <Text
                style={[
                  styles.contactButtonText,
                  styles.secondaryContactButtonText,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactButton, styles.secondaryContactButton]}
            >
              <Ionicons name="globe" size={20} color="#06803A" />
              <Text
                style={[
                  styles.contactButtonText,
                  styles.secondaryContactButtonText,
                ]}
              >
                Site Web
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Ionicons name="bookmark-outline" size={18} color="#666" />
          <Text style={styles.secondaryButtonText}>Sauvegarder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Ionicons name="send" size={18} color="#fff" />
          <Text style={styles.primaryButtonText}>Postuler</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginLeft: 12,
  },
  universityCard: {
    backgroundColor: "white",
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  universityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoLarge: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    marginRight: 16,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  universityHeaderInfo: {
    flex: 1,
  },
  universityName: {
    fontSize: 24,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryText: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
  },
  statsRow: {
    flexDirection: "row",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  statBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 12,
  },
  infoCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 8,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginBottom: 4,
  },
  itemValue: {
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    color: "#333",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F57C00",
  },
  statusText: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#F57C00",
  },
  programCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  programHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  programIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#e6fff0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  programInfo: {
    flex: 1,
  },
  programName: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 2,
  },
  programLevel: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
  },
  programDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
  programFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  programPrice: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#F57C00",
  },
  enrollButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#06803A",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 4,
  },
  enrollButtonText: {
    fontSize: 12,
    fontFamily: Fonts.type.semi,
    color: "#fff",
  },
  contactCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactButtons: {
    flexDirection: "row",
    gap: 8,
  },
  contactButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06803A",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  secondaryContactButton: {
    backgroundColor: "#e6fff0",
  },
  contactButtonText: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#fff",
  },
  secondaryContactButtonText: {
    color: "#06803A",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: "#06803A",
  },
  secondaryButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  primaryButtonText: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#fff",
  },
  secondaryButtonText: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#666",
  },
});

export default UniversiteDetailScreen;
