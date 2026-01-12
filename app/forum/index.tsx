import Fonts from "@/constants/Fonts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Forum = {
  id: string;
  title: string;
  description: string;
  icon: string;
  topicsCount: number;
  postsCount: number;
  lastPost: {
    user: string;
    date: string;
  };
};

const ForumScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Sample forum data
  const forums: Forum[] = [
    {
      id: "1",
      title: "React Native Discussions",
      description: "Everything about React Native development",
      icon: "https://randomuser.me/api/portraits/men/32.jpg",
      topicsCount: 1243,
      postsCount: 15678,
      lastPost: {
        user: "dev_user123",
        date: "2 hours ago",
      },
    },
    {
      id: "2",
      title: "JavaScript Help",
      description: "Get help with JavaScript problems",
      icon: "https://randomuser.me/api/portraits/men/32.jpg",
      topicsCount: 892,
      postsCount: 10234,
      lastPost: {
        user: "js_wizard",
        date: "1 day ago",
      },
    },
    // Add more forums...
  ];

  // Filter forums based on search
  const filteredForums = forums.filter(
    (forum) =>
      forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      forum.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        {showSearch ? (
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#999"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un forum..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            <TouchableOpacity
              onPress={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
            >
              <Ionicons name="close" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Forums disponibles</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => setShowSearch(true)}
                style={styles.headerIcon}
              >
                <Ionicons name="search" size={22} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="add-circle" size={24} color="#06803A" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Forums List */}
        <View style={styles.forumsSection}>
          <Text style={styles.sectionTitle}>Tous les Forums</Text>

          {filteredForums.length > 0 ? (
            filteredForums.map((forum) => (
              <Link href={`/forum/forumDetail`} key={forum.id} asChild>
                <TouchableOpacity style={styles.forumCard}>
                  <View style={styles.forumHeader}>
                    <View style={styles.forumIconContainer}>
                      <Image
                        source={{ uri: forum.icon }}
                        style={{ width: 30, height: 30 }}
                      />
                      {/* <Ionicons name="chatbubbles" size={28} color="#06803A" /> */}
                    </View>
                    <View style={styles.forumInfo}>
                      <Text style={styles.forumTitle}>{forum.title}</Text>
                      <Text style={styles.forumDescription} numberOfLines={2}>
                        {forum.description}
                      </Text>
                    </View>
                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color="#999"
                    />
                  </View>

                  <View style={styles.forumStats}>
                    <View style={styles.forumStatItem}>
                      <Ionicons
                        name="document-text"
                        size={16}
                        color="#06803A"
                      />
                      <Text style={styles.statNumber}>{forum.topicsCount}</Text>
                      <Text style={styles.statLabel}>Topics</Text>
                    </View>
                    <View style={styles.forumStatItem}>
                      <Ionicons name="chatbox" size={16} color="#06803A" />
                      <Text style={styles.statNumber}>{forum.postsCount}</Text>
                      <Text style={styles.statLabel}>Posts</Text>
                    </View>
                    <View style={styles.lastPost}>
                      <Text style={styles.lastPostLabel}>
                        Dernière activité
                      </Text>
                      <Text style={styles.lastPostText} numberOfLines={1}>
                        {forum.lastPost.user}
                      </Text>
                      <Text style={styles.lastPostDate}>
                        {forum.lastPost.date}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="forum" size={60} color="#ddd" />
              <Text style={styles.emptyStateText}>Aucun forum trouvé</Text>
              <Text style={styles.emptyStateSubtext}>
                Essayez une autre recherche
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
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
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
  },
  heroSection: {
    height: 180,
    backgroundColor: "#06803A",
    margin: 16,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  heroTitle: {
    fontSize: 26,
    fontFamily: Fonts.type.bold,
    color: "white",
    marginTop: 12,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "rgba(255,255,255,0.9)",
    marginTop: 8,
    textAlign: "center",
  },
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginTop: 4,
  },
  forumsSection: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 16,
  },
  forumCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  forumHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  forumIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#e6fff0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  forumInfo: {
    flex: 1,
  },
  forumTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 4,
  },
  forumDescription: {
    fontSize: 13,
    fontFamily: Fonts.type.primary,
    color: "#666",
    lineHeight: 18,
  },
  forumStats: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
    gap: 8,
  },
  forumStatItem: {
    alignItems: "center",
    flex: 1,
  },
  lastPost: {
    flex: 2,
    paddingLeft: 12,
  },
  lastPostLabel: {
    fontSize: 11,
    fontFamily: Fonts.type.semi,
    color: "#999",
    marginBottom: 2,
  },
  lastPostText: {
    fontSize: 12,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 2,
  },
  lastPostDate: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#999",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#bbb",
    marginTop: 8,
  },
});

export default ForumScreen;
