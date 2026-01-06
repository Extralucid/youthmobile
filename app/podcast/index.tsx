import Fonts from "@/constants/Fonts";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Podcast = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  episodesCount: number;
  rating: number;
};

const PodcastsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sample podcast data
  const podcasts: Podcast[] = [
    {
      id: "1",
      title: "The Daily Tech",
      author: "Tech Media Network",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      category: "Technology",
      episodesCount: 342,
      rating: 4.8,
    },
    {
      id: "2",
      title: "Science Weekly",
      author: "Science Foundation",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      category: "Science",
      episodesCount: 215,
      rating: 4.7,
    },
    // Add more podcasts...
  ];

  // Extract all unique categories
  const categories = Array.from(
    new Set(podcasts.map((podcast) => podcast.category))
  );

  // Filter podcasts based on search and category
  const filteredPodcasts = podcasts.filter((podcast) => {
    const matchesCategory = selectedCategory
      ? podcast.category === selectedCategory
      : true;
    const matchesSearch =
      searchQuery === "" ||
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        {showSearch ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher podcasts..."
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
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Podcasts</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerAction}
                onPress={() => setShowSearch(true)}
              >
                <Ionicons name="search" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerAction}>
                <Ionicons name="add-circle" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Categories Filter */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity
            style={[
              styles.category,
              !selectedCategory && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.categoryText,
                !selectedCategory && styles.activeCategoryText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.category,
                selectedCategory === category && styles.activeCategory,
              ]}
              onPress={() =>
                setSelectedCategory(
                  category === selectedCategory ? null : category
                )
              }
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Podcasts Grid */}
      <ScrollView
        style={styles.podcastsList}
        contentContainerStyle={styles.podcastsContainer}
      >
        {filteredPodcasts.length > 0 ? (
          filteredPodcasts.map((podcast) => (
            <Link href={`/podcast/podcastDetail`} key={podcast.id} asChild>
              <TouchableOpacity style={styles.podcastCard}>
                <Image
                  source={{ uri: podcast.coverImage }}
                  style={styles.podcastCover}
                  resizeMode="cover"
                />
                <View style={styles.podcastInfo}>
                  <Text style={styles.podcastTitle} numberOfLines={1}>
                    {podcast.title}
                  </Text>
                  <Text style={styles.podcastAuthor}>{podcast.author}</Text>
                  <View style={styles.podcastMeta}>
                    <View style={styles.metaItem}>
                      <MaterialIcons
                        name="library-books"
                        size={16}
                        color="#666"
                      />
                      <Text style={styles.metaText}>
                        {podcast.episodesCount} episodes
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <AntDesign name="star" size={16} color="#FFD700" />
                      <Text style={styles.metaText}>{podcast.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="podcasts" size={50} color="#ccc" />
            <Text style={styles.emptyStateText}>No podcasts found</Text>
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
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row with padding

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerAction: {
    padding: 4,
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
    fontFamily: Fonts.type.primary,
    paddingVertical: 0,
  },
  closeSearch: {
    marginLeft: 8,
  },
  filterContainer: {
    height: 56,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    justifyContent: "center",
  },
  activeCategory: {
    backgroundColor: "#06803A",
  },
  categoryText: {
    fontFamily: Fonts.type.primary,
    color: "#666",
    fontSize: 14,
  },
  activeCategoryText: {
    fontFamily: Fonts.type.semi,
    color: "#fff",
  },
  podcastsList: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  podcastsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
    paddingBottom: 32,
  },
  podcastCard: {
    width: CARD_WIDTH,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  podcastCover: {
    width: "100%",
    height: CARD_WIDTH,
  },
  podcastInfo: {
    padding: 12,
  },
  podcastTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 4,
  },
  podcastAuthor: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginBottom: 8,
  },
  podcastMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    width: "100%",
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
});

export default PodcastsScreen;
