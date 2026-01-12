import Fonts from "@/constants/Fonts";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Notification = {
  id: string;
  type: "job" | "blog" | "message" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "job",
      title: "Nouvelle offre d'emploi",
      message: "TechCorp recrute un développeur React Native",
      time: "Il y a 2h",
      read: false,
    },
    {
      id: "2",
      type: "blog",
      title: "Nouvel article",
      message: "Découvrez les tendances tech 2026",
      time: "Il y a 5h",
      read: false,
    },
    {
      id: "3",
      type: "message",
      title: "Nouveau message",
      message: "Jean Dupont vous a envoyé un message",
      time: "Hier",
      read: true,
    },
    {
      id: "4",
      type: "system",
      title: "Mise à jour",
      message: "Votre profil a été mis à jour avec succès",
      time: "Il y a 2 jours",
      read: true,
    },
    {
      id: "5",
      type: "job",
      title: "Candidature acceptée",
      message: "Votre candidature pour le poste de Designer a été retenue",
      time: "Il y a 3 jours",
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "job":
        return { name: "briefcase", color: "#06803A" };
      case "blog":
        return { name: "newspaper", color: "#F59B21" };
      case "message":
        return { name: "chatbubble", color: "#2196F3" };
      case "system":
        return { name: "settings", color: "#9E9E9E" };
      default:
        return { name: "notifications", color: "#666" };
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderNotification = ({ item }: { item: Notification }) => {
    const icon = getIcon(item.type);

    return (
      <TouchableOpacity
        style={[styles.notificationCard, !item.read && styles.unreadCard]}
        onPress={() => markAsRead(item.id)}
      >
        <View style={styles.notificationContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${icon.color}15` },
            ]}
          >
            <Ionicons name={icon.name as any} size={22} color={icon.color} />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              {!item.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteNotification(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#E53935" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <MaterialCommunityIcons name="check-all" size={24} color="#06803A" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {/* Unread Count */}
        {unreadCount > 0 && (
          <View style={styles.unreadBanner}>
            <Ionicons name="notifications" size={18} color="#F59B21" />
            <Text style={styles.unreadText}>
              {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue
              {unreadCount > 1 ? "s" : ""}
            </Text>
          </View>
        )}

        {/* Notifications List */}
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons
                name="notifications-off-outline"
                size={60}
                color="#ddd"
              />
              <Text style={styles.emptyText}>Aucune notification</Text>
              <Text style={styles.emptySubtext}>Vous êtes à jour !</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

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
  unreadBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  unreadText: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#F57C00",
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  unreadCard: {
    backgroundColor: "#F8FFFA",
  },
  notificationContent: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  notificationTitle: {
    fontSize: 15,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F59B21",
  },
  notificationMessage: {
    fontSize: 13,
    fontFamily: Fonts.type.primary,
    color: "#666",
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginTop: 2,
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
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
