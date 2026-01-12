import Fonts from "@/constants/Fonts";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
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

type Topic = {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  replies: number;
  views: number;
  lastReply: {
    user: string;
    date: string;
  };
  isSticky?: boolean;
  isLocked?: boolean;
};

type ForumDetail = {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: Topic[];
};

const ForumDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");

  // Sample forum data
  const forum: ForumDetail = {
    id: "1",
    title: "React Native Discussions",
    description: "Everything about React Native development",
    icon: "https://randomuser.me/api/portraits/men/32.jpg",
    topics: [
      {
        id: "1",
        title: "How to optimize performance in React Native?",
        author: {
          name: "perf_guru",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        replies: 42,
        views: 1024,
        lastReply: {
          user: "mobile_dev",
          date: "3 hours ago",
        },
        isSticky: true,
      },
      {
        id: "2",
        title: "How to use prisma",
        author: {
          name: "Honore",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        replies: 42,
        views: 1024,
        lastReply: {
          user: "Full_dev",
          date: "1 hours ago",
        },
        isSticky: true,
      },
      // More topics...
    ],
  };

  // Filter topics based on search
  const filteredTopics = forum.topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTopic = () => {
    if (newTopicTitle.trim()) {
      // In a real app, this would create a new topic
      console.log("Creating new topic:", newTopicTitle);
      setNewTopicTitle("");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails du Forum</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Forum Header Card */}
        <View style={styles.forumHeaderCard}>
          <View style={styles.forumIconLarge}>
            <Ionicons name="chatbubbles" size={36} color="#06803A" />
          </View>
          <Text style={styles.forumTitle}>{forum.title}</Text>
          <Text style={styles.forumDescription}>{forum.description}</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un topic..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Create New Topic */}
        <View style={styles.createTopicSection}>
          <Text style={styles.createTopicTitle}>Créer un nouveau topic</Text>
          <View style={styles.createTopicContainer}>
            <TextInput
              style={styles.topicInput}
              placeholder="Quel est votre sujet de discussion ?"
              placeholderTextColor="#999"
              value={newTopicTitle}
              onChangeText={setNewTopicTitle}
            />
            <TouchableOpacity
              style={[
                styles.createButton,
                !newTopicTitle.trim() && styles.createButtonDisabled,
              ]}
              onPress={handleCreateTopic}
              disabled={!newTopicTitle.trim()}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.createButtonText}>Créer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Topics List */}
        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Topics actifs</Text>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <Link href={`/forum/topics`} key={topic.id} asChild>
                <TouchableOpacity style={styles.topicCard}>
                  {(topic.isSticky || topic.isLocked) && (
                    <View style={styles.topicBadges}>
                      {topic.isSticky && (
                        <View style={styles.badgeSticky}>
                          <MaterialIcons
                            name="push-pin"
                            size={12}
                            color="#fff"
                          />
                          <Text style={styles.badgeText}>Épinglé</Text>
                        </View>
                      )}
                      {topic.isLocked && (
                        <View style={styles.badgeLocked}>
                          <MaterialIcons name="lock" size={12} color="#fff" />
                          <Text style={styles.badgeText}>Verrouillé</Text>
                        </View>
                      )}
                    </View>
                  )}

                  <View style={styles.topicHeader}>
                    <Image
                      source={{ uri: topic.author.avatar }}
                      style={styles.authorAvatar}
                      resizeMode="cover"
                    />
                    <View style={styles.topicInfo}>
                      <Text style={styles.topicTitle} numberOfLines={2}>
                        {topic.title}
                      </Text>
                      <Text style={styles.topicAuthor}>
                        par {topic.author.name}
                      </Text>
                    </View>
                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color="#999"
                    />
                  </View>

                  <View style={styles.topicStats}>
                    <View style={styles.topicStatItem}>
                      <Ionicons
                        name="chatbox-outline"
                        size={16}
                        color="#06803A"
                      />
                      <Text style={styles.topicStatNumber}>
                        {topic.replies}
                      </Text>
                      <Text style={styles.topicStatLabel}>Réponses</Text>
                    </View>
                    <View style={styles.topicStatItem}>
                      <Ionicons name="eye-outline" size={16} color="#06803A" />
                      <Text style={styles.topicStatNumber}>{topic.views}</Text>
                      <Text style={styles.topicStatLabel}>Vues</Text>
                    </View>
                    <View style={styles.lastReply}>
                      <Text style={styles.lastReplyLabel}>
                        Dernière réponse
                      </Text>
                      <Text style={styles.lastReplyText} numberOfLines={1}>
                        {topic.lastReply.user}
                      </Text>
                      <Text style={styles.lastReplyDate}>
                        {topic.lastReply.date}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="forum" size={60} color="#ddd" />
              <Text style={styles.emptyStateText}>Aucun topic trouvé</Text>
              <Text style={styles.emptyStateSubtext}>
                {searchQuery
                  ? "Essayez une autre recherche"
                  : "Soyez le premier à démarrer un topic"}
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
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  forumHeaderCard: {
    backgroundColor: "white",
    margin: 16,
    marginTop: 8,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  forumIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#e6fff0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  forumTitle: {
    fontSize: 24,
    fontFamily: Fonts.type.bold,
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  forumDescription: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  forumMetaStats: {
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 16,
    gap: 16,
  },
  metaStatItem: {
    flex: 1,
    alignItems: "center",
  },
  metaStatNumber: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginTop: 8,
  },
  metaStatLabel: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    height: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
  },
  createTopicSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  createTopicTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 12,
  },
  createTopicContainer: {
    flexDirection: "row",
    gap: 12,
  },
  topicInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  createButton: {
    backgroundColor: "#06803A",
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: Fonts.type.semi,
  },
  topicsSection: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 16,
  },
  topicCard: {
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
  topicBadges: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  badgeSticky: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  badgeLocked: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f44336",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: Fonts.type.semi,
  },
  topicHeader: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 15,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 4,
    lineHeight: 20,
  },
  topicAuthor: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
  },
  topicStats: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
    gap: 8,
  },
  topicStatItem: {
    alignItems: "center",
    flex: 1,
  },
  topicStatNumber: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginTop: 4,
  },
  topicStatLabel: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginTop: 2,
  },
  lastReply: {
    flex: 2,
    paddingLeft: 12,
  },
  lastReplyLabel: {
    fontSize: 11,
    fontFamily: Fonts.type.semi,
    color: "#999",
    marginBottom: 2,
  },
  lastReplyText: {
    fontSize: 12,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 2,
  },
  lastReplyDate: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  emptyState: {
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

export default ForumDetailScreen;
