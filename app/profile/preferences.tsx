import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PreferencesScreen() {
  const [preferences, setPreferences] = useState({
    notifications: {
      push: true,
      email: false,
      sms: false,
      jobs: true,
      blogs: true,
      messages: true,
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
    },
    language: "fr",
    theme: "light",
  });

  const toggleSwitch = (category: keyof typeof preferences, key: string) => {
    if (category === "notifications" || category === "privacy") {
      setPreferences({
        ...preferences,
        [category]: {
          ...preferences[category],
          [key]:
            !preferences[category][
              key as keyof (typeof preferences)[typeof category]
            ],
        },
      });
    }
  };

  const SwitchItem = ({
    label,
    description,
    value,
    onToggle,
    icon,
  }: {
    label: string;
    description?: string;
    value: boolean;
    onToggle: () => void;
    icon: string;
  }) => (
    <View style={styles.switchItem}>
      <View style={styles.switchItemLeft}>
        <Ionicons name={icon as any} size={22} color="#666" />
        <View style={styles.switchItemText}>
          <Text style={styles.switchLabel}>{label}</Text>
          {description && (
            <Text style={styles.switchDescription}>{description}</Text>
          )}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#e0e0e0", true: "#A5D6A7" }}
        thumbColor={value ? "#06803A" : "#f4f3f4"}
      />
    </View>
  );

  const SelectItem = ({
    label,
    value,
    icon,
    onPress,
  }: {
    label: string;
    value: string;
    icon: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.selectItem} onPress={onPress}>
      <View style={styles.selectItemLeft}>
        <Ionicons name={icon as any} size={22} color="#666" />
        <Text style={styles.selectLabel}>{label}</Text>
      </View>
      <View style={styles.selectItemRight}>
        <Text style={styles.selectValue}>{value}</Text>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Préférences</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <SwitchItem
              label="Notifications push"
              description="Recevoir des notifications sur votre appareil"
              value={preferences.notifications.push}
              onToggle={() => toggleSwitch("notifications", "push")}
              icon="notifications"
            />
            <View style={styles.divider} />
            <SwitchItem
              label="Notifications email"
              description="Recevoir des notifications par email"
              value={preferences.notifications.email}
              onToggle={() => toggleSwitch("notifications", "email")}
              icon="mail"
            />
            <View style={styles.divider} />
            <SwitchItem
              label="Notifications SMS"
              description="Recevoir des notifications par SMS"
              value={preferences.notifications.sms}
              onToggle={() => toggleSwitch("notifications", "sms")}
              icon="chatbubble"
            />
          </View>
        </View>

        {/* Types de notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Types de notifications</Text>
          <View style={styles.card}>
            <SwitchItem
              label="Offres d'emploi"
              value={preferences.notifications.jobs}
              onToggle={() => toggleSwitch("notifications", "jobs")}
              icon="briefcase"
            />
            <View style={styles.divider} />
            <SwitchItem
              label="Nouveaux blogs"
              value={preferences.notifications.blogs}
              onToggle={() => toggleSwitch("notifications", "blogs")}
              icon="newspaper"
            />
            <View style={styles.divider} />
            <SwitchItem
              label="Messages"
              value={preferences.notifications.messages}
              onToggle={() => toggleSwitch("notifications", "messages")}
              icon="chatbubbles"
            />
          </View>
        </View>

        {/* Confidentialité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Confidentialité</Text>
          <View style={styles.card}>
            <SwitchItem
              label="Profil public"
              description="Rendre votre profil visible aux autres"
              value={preferences.privacy.profileVisible}
              onToggle={() => toggleSwitch("privacy", "profileVisible")}
              icon="eye"
            />
            <View style={styles.divider} />
            <SwitchItem
              label="Afficher l'email"
              description="Montrer votre email sur votre profil"
              value={preferences.privacy.showEmail}
              onToggle={() => toggleSwitch("privacy", "showEmail")}
              icon="mail"
            />
            <View style={styles.divider} />
            <SwitchItem
              label="Afficher le téléphone"
              description="Montrer votre téléphone sur votre profil"
              value={preferences.privacy.showPhone}
              onToggle={() => toggleSwitch("privacy", "showPhone")}
              icon="call"
            />
          </View>
        </View>

        {/* Apparence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apparence</Text>
          <View style={styles.card}>
            <SelectItem
              label="Langue"
              value="Français"
              icon="language"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <SelectItem
              label="Thème"
              value="Clair"
              icon="color-palette"
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
  content: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: "#f9f9f9",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  switchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  switchItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  switchItemText: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
    marginBottom: 2,
  },
  switchDescription: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  selectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  selectItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selectLabel: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
  },
  selectItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectValue: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 16,
  },
});
