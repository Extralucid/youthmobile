import Fonts from "@/constants/Fonts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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

export default function EntrepriseDetailScreen() {
  /* Hard-coded for the demo – replace with route params */
  const data = {
    brand: "Philipp Plein",
    amount: "$1,245.17",
    date: "13/12/2018",
    status: "Not received",
    items: [
      { name: "Lather moto jacket", price: "$8,564.00" },
      { name: "Lorem ipsum", price: "$358.00" },
      { name: "Enim ad minim veniam", price: "$1,355.00" },
      { name: "Dolor in reprehenderit", price: "$2,333.12" },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de l&apos;Entreprise</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- Company Main Card ---------- */}
        <View style={styles.mainCard}>
          {/* Header with logo */}
          <View style={styles.companyHeader}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/hermes-logo.png")}
                style={styles.logo}
                resizeMode="cover"
              />
            </View>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{data.brand}</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={16} color="#06803A" />
                <Text style={styles.verifiedText}>Partenaire vérifié</Text>
              </View>
            </View>
          </View>

          {/* Quick stats inline */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="calendar" size={16} color="#666" />
              <Text style={styles.statText}>Depuis 2018</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="people" size={16} color="#666" />
              <Text style={styles.statText}>250+ employés</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.statText}>4.8</Text>
            </View>
          </View>

          {/* Subscription info integrated */}
          <View style={styles.divider} />

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Souscription</Text>
              <View style={styles.infoValueRow}>
                <Ionicons name="wallet" size={16} color="#06803A" />
                <Text style={styles.infoValue}>{data.amount}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Date d&apos;adhésion</Text>
              <View style={styles.infoValueRow}>
                <Ionicons name="calendar" size={16} color="#06803A" />
                <Text style={styles.infoValue}>{data.date}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Statut</Text>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{data.status}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ---------- Services List ---------- */}
        <View style={styles.servicesCard}>
          <Text style={styles.sectionTitle}>Services & Prestations</Text>
          {data.items.map((it, idx) => (
            <View key={idx} style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <MaterialIcons name="work-outline" size={18} color="#06803A" />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{it.name}</Text>
                <Text style={styles.serviceDetails}>×1 • TVA incluse</Text>
              </View>
              <Text style={styles.servicePrice}>{it.price}</Text>
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

      {/* Footer Buttons
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Ionicons name="bookmark-outline" size={18} color="#666" />
          <Text style={styles.secondaryButtonText}>Sauvegarder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Ionicons name="send" size={18} color="#fff" />
          <Text style={styles.primaryButtonText}>Postuler</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
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
  scroll: {
    padding: 16,
    paddingBottom: 120,
  },
  mainCard: {
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
  companyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    marginRight: 14,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 6,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
  },
  statsRow: {
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "space-around",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#666",
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: "#e0e0e0",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 14,
  },
  infoGrid: {
    gap: 14,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 13,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  infoValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoValue: {
    fontSize: 15,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 5,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#F57C00",
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.type.semi,
    color: "#F57C00",
  },
  servicesCard: {
    backgroundColor: "#fff",
    marginBottom: 18,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 14,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    gap: 12,
  },
  serviceIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#e6fff0",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 2,
  },
  serviceDetails: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  servicePrice: {
    fontSize: 15,
    fontFamily: Fonts.type.bold,
    color: "#06803A",
  },

  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 12,
  },
  contactBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#e6fff0",
    justifyContent: "center",
    alignItems: "center",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondary: {
    backgroundColor: "#f5f5f5",
  },
  btnPrimary: {
    backgroundColor: "#06803A",
  },
  btnSecondaryText: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#666",
  },
  btnPrimaryText: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#fff",
  },
  contactCard: {
    backgroundColor: "white",
    marginBottom: 16,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
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
  footer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12,
  },
});
