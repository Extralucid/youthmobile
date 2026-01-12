import Fonts from "@/constants/Fonts";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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

type Author = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  joinDate: string;
  postsCount: number;
};

type Post = {
  id: string;
  content: string;
  date: string;
  likes: number;
  author: Author;
  isOriginalPost?: boolean;
};

type Topic = {
  id: string;
  title: string;
  author: Author;
  createdAt: string;
  views: number;
  posts: Post[];
  isLocked: boolean;
};

const TopicDetailScreen = () => {
  const { forumId, topicId } = useLocalSearchParams();
  const [newPost, setNewPost] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Sample topic data
  const topic: Topic = {
    id: "1",
    title: "How to optimize performance in React Native?",
    author: {
      id: "1",
      name: "perf_guru",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Moderator",
      joinDate: "Jan 2020",
      postsCount: 342,
    },
    createdAt: "1 semaine",
    views: 1024,
    isLocked: false,
    posts: [
      {
        id: "1",
        content:
          "I've been having performance issues with my React Native app, especially with long lists. What are some proven strategies to optimize performance? I've already tried memoizing components but still seeing jank.",
        date: "1 heure",
        likes: 24,
        author: {
          id: "1",
          name: "perf_guru",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          role: "Moderator",
          joinDate: "Jan 2020",
          postsCount: 342,
        },
        isOriginalPost: true,
      },
      // More posts...
    ],
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      // In a real app, this would add a new post
      console.log("Adding new post:", newPost);
      setNewPost("");
      setReplyingTo(null);
    }
  };

  const handleLikePost = (postId: string) => {
    // In a real app, this would update the like count
    console.log("Liked post:", postId);
  };

  const handleReply = (postId: string) => {
    setReplyingTo(postId === replyingTo ? null : postId);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discussion</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Topic Header Card */}
        <View style={styles.topicHeaderCard}>
          <View style={styles.topicTitleSection}>
            <Text style={styles.title}>{topic.title}</Text>
            {topic.isLocked && (
              <View style={styles.lockedBadge}>
                <MaterialIcons name="lock" size={14} color="#fff" />
                <Text style={styles.lockedBadgeText}>Verrouillé</Text>
              </View>
            )}
          </View>

          <View style={styles.topicMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="person" size={14} color="#666" />
              <Text style={styles.metaText}>{topic.author.name}</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Ionicons name="time" size={14} color="#666" />
              <Text style={styles.metaText}>{topic.createdAt}</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Ionicons name="eye" size={14} color="#666" />
              <Text style={styles.metaText}>{topic.views} vues</Text>
            </View>
          </View>
        </View>

        {/* Posts List */}
        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>{topic.posts.length} Réponses</Text>
          {topic.posts.map((post, index) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postSidebar}>
                <Image
                  source={{ uri: post.author.avatar }}
                  style={styles.authorAvatar}
                  resizeMode="cover"
                />
                <View style={styles.authorDetails}>
                  <Text style={styles.authorName}>{post.author.name}</Text>
                  <View style={styles.authorRoleBadge}>
                    <Text style={styles.authorRole}>{post.author.role}</Text>
                  </View>
                  <Text style={styles.authorJoinDate}>
                    Rejoint {post.author.joinDate}
                  </Text>
                  <Text style={styles.authorPosts}>
                    {post.author.postsCount} posts
                  </Text>
                </View>
              </View>

              <View style={styles.postMain}>
                {post.isOriginalPost && (
                  <View style={styles.originalPostBadge}>
                    <Text style={styles.originalPostBadgeText}>
                      Post Original
                    </Text>
                  </View>
                )}
                <Text style={styles.postText}>{post.content}</Text>
                <Text style={styles.postDate}>{post.date}</Text>

                <View style={styles.postActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleLikePost(post.id)}
                  >
                    <Ionicons name="thumbs-up" size={16} color="#666" />
                    <Text style={styles.actionText}>
                      {post.likes} J&apos;aimes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleReply(post.id)}
                  >
                    <Feather name="message-square" size={16} color="#666" />
                    <Text style={styles.actionText}>Répondre</Text>
                  </TouchableOpacity>
                </View>

                {post.id === replyingTo && (
                  <View style={styles.replyForm}>
                    <TextInput
                      style={styles.replyInput}
                      placeholder="Écrivez votre réponse..."
                      placeholderTextColor="#999"
                      multiline
                      value={newPost}
                      onChangeText={setNewPost}
                    />
                    <View style={styles.replyButtons}>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setReplyingTo(null)}
                      >
                        <Text style={styles.cancelButtonText}>Annuler</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleAddPost}
                        disabled={!newPost.trim()}
                      >
                        <Text style={styles.submitButtonText}>Publier</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Add New Post (if not locked) */}
        {!topic.isLocked && (
          <View style={styles.newPostContainer}>
            <View style={styles.newPostHeader}>
              <Ionicons name="chatbox-ellipses" size={20} color="#06803A" />
              <Text style={styles.newPostTitle}>Ajouter une réponse</Text>
            </View>
            <TextInput
              style={styles.newPostInput}
              placeholder="Partagez votre opinion sur ce sujet..."
              placeholderTextColor="#999"
              multiline
              value={newPost}
              onChangeText={setNewPost}
            />
            <TouchableOpacity
              style={[
                styles.newPostButton,
                !newPost.trim() && styles.newPostButtonDisabled,
              ]}
              onPress={handleAddPost}
              disabled={!newPost.trim()}
            >
              <Ionicons name="send" size={18} color="#fff" />
              <Text style={styles.newPostButtonText}>Publier la réponse</Text>
            </TouchableOpacity>
          </View>
        )}

        {topic.isLocked && (
          <View style={styles.lockedNotice}>
            <MaterialIcons name="lock" size={24} color="#f44336" />
            <Text style={styles.lockedText}>
              Ce sujet est verrouillé et n&apos;accepte plus de nouvelles
              réponses
            </Text>
          </View>
        )}
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
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  topicHeaderCard: {
    backgroundColor: "white",
    margin: 16,
    marginTop: 8,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  topicTitleSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
    lineHeight: 28,
  },
  lockedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f44336",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  lockedBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: Fonts.type.semi,
  },
  topicMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    fontFamily: Fonts.type.primary,
    color: "#666",
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },
  postsSection: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 16,
  },
  postCard: {
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
  postSidebar: {
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  authorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
  },
  authorDetails: {
    alignItems: "center",
  },
  authorName: {
    fontSize: 15,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 6,
  },
  authorRoleBadge: {
    backgroundColor: "#e6fff0",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },
  authorRole: {
    fontSize: 11,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
  },
  authorJoinDate: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginBottom: 2,
  },
  authorPosts: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  postMain: {
    flex: 1,
  },
  originalPostBadge: {
    backgroundColor: "#06803A",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  originalPostBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: Fonts.type.bold,
  },
  postText: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    lineHeight: 24,
    color: "#333",
    marginBottom: 12,
  },
  postDate: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 13,
    fontFamily: Fonts.type.primary,
    color: "#666",
  },
  replyForm: {
    marginTop: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
  },
  replyInput: {
    minHeight: 80,
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#333",
    marginBottom: 12,
  },
  replyButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontFamily: Fonts.type.semi,
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#06803A",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontFamily: Fonts.type.semi,
  },
  newPostContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  newPostHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  newPostTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  newPostInput: {
    minHeight: 100,
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#333",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
  },
  newPostButton: {
    backgroundColor: "#06803A",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  newPostButtonDisabled: {
    opacity: 0.5,
  },
  newPostButtonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: Fonts.type.semi,
  },
  lockedNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  lockedText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    textAlign: "center",
  },
});

export default TopicDetailScreen;
