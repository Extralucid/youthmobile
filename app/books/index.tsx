import Fonts from "@/constants/Fonts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  rating: number;
  category: string;
  reviewsCount: number;
};

const BookScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Sample book data
  const books: Book[] = [
    {
      id: "1",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      price: 12.99,
      rating: 4.8,
      category: "Thriller",
      reviewsCount: 1243,
    },
    {
      id: "2",
      title: "Atomic Habits",
      author: "James Clear",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      price: 15.99,
      rating: 4.9,
      category: "Développement Personnel",
      reviewsCount: 2856,
    },
    {
      id: "3",
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      price: 13.99,
      rating: 4.6,
      category: "Fiction",
      reviewsCount: 987,
    },
    {
      id: "4",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      price: 18.99,
      rating: 4.7,
      category: "Science",
      reviewsCount: 3421,
    },
    {
      id: "5",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      price: 14.99,
      rating: 4.8,
      category: "Finance",
      reviewsCount: 1654,
    },
    {
      id: "6",
      title: "Educated",
      author: "Tara Westover",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      price: 16.99,
      rating: 4.7,
      category: "Biographie",
      reviewsCount: 2103,
    },
  ];

  // Extract all unique categories
  const categories = Array.from(new Set(books.map((book) => book.category)));

  // Filter books based on selected category and search query
  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory
      ? book.category === selectedCategory
      : true;
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBooks = books.slice(0, 3);

  const renderFeaturedBook = ({ item }: { item: Book }) => (
    <Link href={`/books/bookDetail`} asChild>
      <TouchableOpacity style={styles.featuredCard}>
        <View style={styles.featuredContent}>
          <Image
            source={{ uri: item.coverImage }}
            style={styles.featuredCover}
          />
          <View style={styles.featuredInfo}>
            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.featuredBadgeText}>Top Rated</Text>
            </View>
            <Text style={styles.featuredTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.featuredAuthor}>{item.author}</Text>
            <View style={styles.featuredFooter}>
              <Text style={styles.featuredPrice}>${item.price}</Text>
              <View style={styles.featuredRating}>
                <MaterialIcons name="star" size={14} color="#FFD700" />
                <Text style={styles.featuredRatingText}>{item.rating}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
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
              placeholder="Rechercher un livre..."
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
            <Text style={styles.headerTitle}>Bibliothèque</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => setShowSearch(true)}
                style={styles.headerIcon}
              >
                <Ionicons name="search" size={22} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.navigate("/books/createBook" as any)}
                style={styles.headerIcon}
              >
                <Ionicons name="add" size={26} color="#06803A" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroOverlay}>
            <Ionicons name="library" size={40} color="rgba(255,255,255,0.9)" />
            <Text style={styles.heroTitle}>Explorez Notre Collection</Text>
            <Text style={styles.heroSubtitle}>
              {books.length} livres numériques disponibles
            </Text>
          </View>
        </View>

        {/* Featured Books Carousel */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>À la Une</Text>
              <Text style={styles.sectionSubtitle}>Les mieux notés</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredBooks}
            renderItem={renderFeaturedBook}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            <TouchableOpacity
              style={[
                styles.categoryChip,
                !selectedCategory && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Ionicons
                name="apps"
                size={18}
                color={!selectedCategory ? "#fff" : "#06803A"}
              />
              <Text
                style={[
                  styles.categoryChipText,
                  !selectedCategory && styles.categoryChipTextActive,
                ]}
              >
                Tous
              </Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() =>
                  setSelectedCategory(
                    category === selectedCategory ? null : category
                  )
                }
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category &&
                      styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Books Grid */}
        <View style={styles.booksSection}>
          <View style={styles.booksGrid}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <Link href={`/books/bookDetail`} key={book.id} asChild>
                  <TouchableOpacity style={styles.bookCard}>
                    <Image
                      source={{ uri: book.coverImage }}
                      style={styles.bookCover}
                    />
                    <View style={styles.bookInfo}>
                      <Text style={styles.bookTitle} numberOfLines={2}>
                        {book.title}
                      </Text>
                      <Text style={styles.bookAuthor} numberOfLines={1}>
                        {book.author}
                      </Text>
                      <View style={styles.bookMeta}>
                        <View style={styles.bookRating}>
                          <MaterialIcons
                            name="star"
                            size={14}
                            color="#FFD700"
                          />
                          <Text style={styles.bookRatingText}>
                            {book.rating}
                          </Text>
                        </View>
                        <Text style={styles.bookPrice}>${book.price}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialIcons name="menu-book" size={60} color="#ddd" />
                <Text style={styles.emptyStateText}>Aucun livre trouvé</Text>
                <Text style={styles.emptyStateSubtext}>
                  Essayez une autre recherche
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");
const BOOK_WIDTH = (width - 48) / 2;

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
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  sectionSubtitle: {
    fontSize: 13,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginTop: 2,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
  },
  featuredList: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  featuredCard: {
    width: width * 0.85,
    marginRight: 16,
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredContent: {
    flexDirection: "row",
    padding: 16,
  },
  featuredCover: {
    width: 100,
    height: 140,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  featuredInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  featuredBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  featuredBadgeText: {
    fontSize: 11,
    fontFamily: Fonts.type.semi,
    color: "#F57C00",
    marginLeft: 4,
  },
  featuredTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginTop: 8,
  },
  featuredAuthor: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginTop: 4,
  },
  featuredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  featuredPrice: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#06803A",
  },
  featuredRating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredRatingText: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginLeft: 4,
  },
  categoriesSection: {
    marginBottom: 24,
    paddingLeft: 16,
  },
  categoriesScroll: {
    paddingRight: 16,
    marginTop: 12,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: "#06803A",
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    color: "#666",
    marginLeft: 6,
  },
  categoryChipTextActive: {
    color: "white",
  },
  booksSection: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  booksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  bookCard: {
    width: BOOK_WIDTH,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bookCover: {
    width: "100%",
    height: 200,
    backgroundColor: "#f5f5f5",
  },
  bookInfo: {
    padding: 12,
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 4,
    height: 36,
  },
  bookAuthor: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginBottom: 8,
  },
  bookMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookRatingText: {
    fontSize: 12,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginLeft: 4,
  },
  bookPrice: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#06803A",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    width: "100%",
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

export default BookScreen;
