import Fonts from "@/constants/Fonts";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const stats = [
    { label: "Offres postulées", value: "12", icon: "briefcase" },
    { label: "Tutoriels suivis", value: "8", icon: "school" },
    { label: "Blogs publiés", value: "5", icon: "newspaper" },
  ];

  const menuSections = [
    {
      title: "Mon Compte",
      items: [
        {
          label: "Modifier le profil",
          icon: "pencil",
          iconType: "MaterialCommunityIcons",
          href: "/profile/edit",
        },
        {
          label: "Préférences",
          icon: "cog",
          iconType: "MaterialCommunityIcons",
          href: "/profile/preferences",
        },
        {
          label: "Sécurité",
          icon: "shield-checkmark",
          iconType: "Ionicons",
          href: "/settings",
        },
      ],
    },
    {
      title: "Mes Activités",
      items: [
        {
          label: "Mes candidatures",
          icon: "file-document",
          iconType: "MaterialCommunityIcons",
          href: "/job",
        },
        {
          label: "Mes favoris",
          icon: "heart",
          iconType: "MaterialCommunityIcons",
          href: "/",
        },
        {
          label: "Historique",
          icon: "history",
          iconType: "MaterialIcons",
          href: "/",
        },
      ],
    },
  ];

  const renderIcon = (
    iconType: string,
    iconName: string,
    size: number,
    color: string
  ) => {
    if (iconType === "Ionicons") {
      return <Ionicons name={iconName as any} size={size} color={color} />;
    } else if (iconType === "MaterialCommunityIcons") {
      return (
        <MaterialCommunityIcons
          name={iconName as any}
          size={size}
          color={color}
        />
      );
    } else if (iconType === "MaterialIcons") {
      return <MaterialIcons name={iconName as any} size={size} color={color} />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <TouchableOpacity onPress={() => router.push("/profile/edit")}>
          <Ionicons name="create-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/education.jpg")}
              style={styles.avatar}
              placeholder={{ blurhash }}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>M. Honoré OUEDRAOGO</Text>
          <Text style={styles.userEmail}>honore.ouedraogo@youth.bf</Text>
          <View style={styles.userBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#06803A" />
            <Text style={styles.badgeText}>Membre vérifié</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statBox}>
              <Ionicons name={stat.icon as any} size={24} color="#F59B21" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push(item.href as any)}
                  >
                    <View style={styles.menuItemLeft}>
                      {renderIcon(item.iconType, item.icon, 22, "#666")}
                      <Text style={styles.menuItemText}>{item.label}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                  </TouchableOpacity>
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.menuDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <TouchableOpacity style={styles.dangerButton}>
            <MaterialCommunityIcons name="logout" size={20} color="#E53935" />
            <Text style={styles.dangerButtonText}>Se déconnecter</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#06803A",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#F59B21",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 22,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginBottom: 12,
  },
  userBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  statValue: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  statLabel: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#666",
    textAlign: "center",
  },
  menuSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 16,
  },
  dangerZone: {
    marginTop: 8,
    marginBottom: 16,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#FFEBEE",
  },
  dangerButtonText: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#E53935",
  },
});
