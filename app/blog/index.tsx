import Fonts from "@/constants/Fonts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  tags: string[];
  readTime: string;
};

const BlogScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Sample blog post data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Getting Started with React Native",
      excerpt:
        "Learn the basics of building mobile apps with React Native and Expo",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      date: "May 15, 2023",
      tags: ["React Native", "Mobile"],
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "State Management in 2023",
      excerpt:
        "Comparing different state management solutions for your React applications",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      date: "June 2, 2023",
      tags: ["React", "State"],
      readTime: "8 min read",
    },
    {
      id: "3",
      title: "Building Scalable APIs",
      excerpt:
        "Best practices for designing RESTful APIs that scale with your business",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      date: "June 18, 2023",
      tags: ["Backend", "API"],
      readTime: "6 min read",
    },
    {
      id: "4",
      title: "UI/UX Design Principles",
      excerpt: "Essential design principles every developer should know",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      date: "July 5, 2023",
      tags: ["Design", "UI/UX"],
      readTime: "4 min read",
    },
  ];

  // Extract all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  // Filter posts based on search and active tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Header */}
      <View style={styles.header}>
        {showSearch ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search checks..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            <TouchableOpacity
              style={styles.closeSearch}
              onPress={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Les Articles de Blog</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowSearch(true)}
              >
                <Ionicons name="search" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.navigate("/blog/createBlog")}
              >
                <Ionicons name="add-circle" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Tags Filter */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsContainer}
        >
          <TouchableOpacity
            style={[styles.tag, !activeTag && styles.activeTag]}
            onPress={() => setActiveTag(null)}
          >
            <Text style={[styles.tagText, !activeTag && styles.activeTagText]}>
              All
            </Text>
          </TouchableOpacity>
          {allTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[styles.tag, activeTag === tag && styles.activeTag]}
              onPress={() => setActiveTag(tag === activeTag ? null : tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  activeTag === tag && styles.activeTagText,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Blog Posts List */}
      <ScrollView
        contentContainerStyle={styles.postsContainer}
        style={styles.postsList}
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link href="/blog/blogDetails" key={post.id} asChild>
              <TouchableOpacity key={post.id} style={styles.postCard}>
                <Image
                  source={{ uri: post.coverImage }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
                <View style={styles.postContent}>
                  <View style={styles.tagsContainer}>
                    {post.tags.map((tag) => (
                      <View key={`${post.id}-${tag}`} style={styles.postTag}>
                        <Text style={styles.postTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <Text style={styles.postExcerpt}>{post.excerpt}</Text>
                  <View style={styles.postFooter}>
                    <Text style={styles.postDate}>{post.date}</Text>
                    <Text style={styles.readTime}>{post.readTime}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="find-in-page" size={50} color="#ccc" />
            <Text style={styles.emptyStateText}>No posts found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try a different search or filter
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  filterContainer: {
    height: 56,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  tagsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  postsList: {
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 36,
    backgroundColor: "#f0f0f0",
    borderRadius: 18,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTag: {
    backgroundColor: "#06803A",
  },
  tagText: {
    color: "#666",
    fontSize: 14,
    fontFamily: Fonts.type.primary,
  },
  activeTagText: {
    color: "#fff",
    fontFamily: Fonts.type.semi,
  },
  postsContainer: {
    paddingBottom: 16,
  },
  postCard: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postImage: {
    width: "100%",
    height: 160,
  },
  postContent: {
    padding: 16,
  },
  postTag: {
    backgroundColor: "#e6fff0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  postTagText: {
    color: "#06803A",
    fontSize: 12,
    fontFamily: Fonts.type.semi,
  },
  postTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 8,
  },
  postExcerpt: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postDate: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  readTime: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
    fontStyle: "italic",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: Fonts.type.semi,
    color: "#666",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginTop: 4,
  },
  // ... previous styles ...
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
  },
  closeSearch: {
    marginLeft: 8,
  },
});

export default BlogScreen;
