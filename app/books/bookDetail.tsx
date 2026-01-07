import Fonts from "@/constants/Fonts";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Review = {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
};

type RelatedBook = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  rating: number;
};

type BookDetail = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  rating: number;
  category: string;
  description: string;
  pages: number;
  publisher: string;
  publishedDate: string;
  isbn: string;
  language: string;
  reviews: Review[];
  relatedBooks: RelatedBook[];
};

const BookDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Sample book data
  const book: BookDetail = {
    id: "1",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    price: 12.99,
    rating: 4.5,
    category: "Thriller",
    description:
      "Alicia Berenson was thirty-three years old when she killed her husband...",
    pages: 336,
    publisher: "Celadon Books",
    publishedDate: "February 5, 2019",
    isbn: "9781250301697",
    language: "English",
    reviews: [
      {
        id: "1",
        user: "BookLover42",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Absolutely mind-blowing twist at the end! Could not put it down.",
        likes: 24,
      },
      // More reviews...
    ],
    relatedBooks: [
      {
        id: "2",
        title: "The Maidens",
        author: "Alex Michaelides",
        coverImage:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        price: 14.99,
        rating: 4.2,
      },
      {
        id: "3",
        title: "The Woman in the Window",
        author: "A.J. Finn",
        coverImage:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        price: 13.99,
        rating: 4.1,
      },
      {
        id: "4",
        title: "Gone Girl",
        author: "Gillian Flynn",
        coverImage:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        price: 12.99,
        rating: 4.5,
      },
      // More related books...
    ],
  };

  // Handler functions
  const handleAddToWishlist = () => setInWishlist(!inWishlist);
  const handleAddToCart = () => setInCart(!inCart);
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${book.title}" by ${
          book.author
        } - ${book.description.substring(0, 100)}...`,
        title: book.title,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handlePreview = () => {
    Linking.openURL(
      `https://books.google.com/books?id=${book.isbn}&pg=PP1&dq=${book.isbn}&hl=&cd=1&source=gbs_api`
    );
  };
  const handlePurchase = () => Linking.openURL("https://example.com/checkout");

  const handleAddReview = () => {
    if (newReview.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        user: "CurrentUser",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 5,
        date: "Just now",
        comment: newReview,
        likes: 0,
      };
      setReviews([...reviews, review]);
      setNewReview("");
    }
  };

  const handleLikeReview = (reviewId: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails du Livre</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleShare} style={styles.headerIcon}>
            <Ionicons name="share-outline" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddToWishlist}
            style={styles.headerIcon}
          >
            <Ionicons
              name={inWishlist ? "heart" : "heart-outline"}
              size={22}
              color={inWishlist ? "#ff4444" : "#333"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
            }}
            style={styles.heroCover}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingBadgeText}>{book.rating}</Text>
            </View>
          </View>
        </View>

        {/* Book Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{book.category}</Text>
          </View>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>par {book.author}</Text>
          <View style={styles.priceSection}>
            <Text style={styles.price}>${book.price.toFixed(2)}</Text>
            <View style={styles.detailsChips}>
              <View style={styles.chip}>
                <Ionicons name="document-text" size={14} color="#666" />
                <Text style={styles.chipText}>{book.pages} pages</Text>
              </View>
              <View style={styles.chip}>
                <Ionicons name="language" size={14} color="#666" />
                <Text style={styles.chipText}>{book.language}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handlePurchase}
          >
            <Ionicons name="cart" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Acheter Maintenant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handlePreview}
          >
            <Ionicons name="book-outline" size={20} color="#06803A" />
            <Text style={styles.secondaryButtonText}>Lire un extrait</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>

        {/* Book Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="business" size={20} color="#06803A" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Éditeur</Text>
                <Text style={styles.infoValue}>{book.publisher}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar" size={20} color="#06803A" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Date de publication</Text>
                <Text style={styles.infoValue}>{book.publishedDate}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="barcode" size={20} color="#06803A" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>ISBN</Text>
                <Text style={styles.infoValue}>{book.isbn}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Avis</Text>
            <View style={styles.reviewStats}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.reviewStatsText}>
                {book.rating} ({book.reviews.length} avis)
              </Text>
            </View>
          </View>

          {[...book.reviews, ...reviews].slice(0, 3).map((review) => (
            <View key={review.id} style={styles.reviewContainer}>
              <Image
                source={{ uri: review.avatar }}
                style={styles.reviewAvatar}
                resizeMode="cover"
              />
              <View style={styles.reviewContent}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <View style={styles.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <MaterialIcons
                        key={i}
                        name={i < review.rating ? "star" : "star-border"}
                        size={16}
                        color="#FFD700"
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
                <Text style={styles.reviewText}>{review.comment}</Text>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => handleLikeReview(review.id)}
                >
                  <Ionicons name="thumbs-up" size={16} color="#666" />
                  <Text style={styles.likeCount}>{review.likes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Add Review */}
          <View style={styles.addReviewContainer}>
            <Text style={styles.addReviewTitle}>Écrire un avis</Text>
            <TextInput
              style={styles.reviewInput}
              placeholder="Partagez vos pensées sur ce livre..."
              placeholderTextColor="#999"
              value={newReview}
              onChangeText={setNewReview}
              multiline
            />
            <TouchableOpacity
              style={styles.submitReviewButton}
              onPress={handleAddReview}
              disabled={!newReview.trim()}
            >
              <Text style={styles.submitReviewText}>
                Soumettre un commentaire
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Related Books */}
        {book.relatedBooks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Vous aimerez peut-être aussi
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedBooksContainer}
            >
              {book.relatedBooks.map((book) => (
                <Link
                  href={`/bookstore/${book.id}` as any}
                  key={book.id}
                  asChild
                >
                  <TouchableOpacity style={styles.relatedBookCard}>
                    <Image
                      source={{ uri: book.coverImage }}
                      style={styles.relatedBookCover}
                      resizeMode="cover"
                    />
                    <Text style={styles.relatedBookTitle} numberOfLines={1}>
                      {book.title}
                    </Text>
                    <Text style={styles.relatedBookAuthor}>{book.author}</Text>
                    <View style={styles.relatedBookFooter}>
                      <Text style={styles.relatedBookPrice}>
                        ${book.price.toFixed(2)}
                      </Text>
                      <View style={styles.relatedBookRating}>
                        <MaterialIcons name="star" size={14} color="#FFD700" />
                        <Text style={styles.relatedBookRatingText}>
                          {book.rating}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </ScrollView>
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
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginLeft: 12,
  },
  heroSection: {
    height: 300,
    position: "relative",
    backgroundColor: "#f0f0f0",
  },
  heroCover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroOverlay: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingBadgeText: {
    fontSize: 14,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: "white",
    margin: 16,
    marginTop: -40,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  categoryBadge: {
    backgroundColor: "#e6fff0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
  },
  bookTitle: {
    fontSize: 24,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 16,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginBottom: 16,
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 28,
    fontFamily: Fonts.type.bold,
    color: "#06803A",
  },
  detailsChips: {
    flexDirection: "row",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  chipText: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginLeft: 4,
  },
  actionButtonsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06803A",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "white",
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6fff0",
    padding: 16,
    borderRadius: 16,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
    marginLeft: 8,
  },
  section: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  reviewStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewStatsText: {
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    color: "#666",
    marginLeft: 4,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    lineHeight: 24,
    color: "#555",
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#e6fff0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#333",
  },
  reviewContainer: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  reviewUser: {
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    color: "#333",
  },
  reviewRating: {
    flexDirection: "row",
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#555",
    lineHeight: 20,
    marginBottom: 8,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginLeft: 4,
  },
  addReviewContainer: {
    marginTop: 24,
  },
  addReviewTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 12,
  },
  reviewInput: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#333",
    textAlignVertical: "top",
  },
  submitReviewButton: {
    backgroundColor: "#06803A",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  submitReviewText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: Fonts.type.bold,
  },
  relatedBooksContainer: {
    paddingVertical: 8,
  },
  relatedBookCard: {
    width: 140,
    marginRight: 16,
  },
  relatedBookCover: {
    width: 140,
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
  },
  relatedBookTitle: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 4,
  },
  relatedBookAuthor: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginBottom: 8,
  },
  relatedBookFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  relatedBookPrice: {
    fontSize: 14,
    fontFamily: Fonts.type.bold,
    color: "#06803A",
  },
  relatedBookRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  relatedBookRatingText: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginLeft: 4,
  },
});

export default BookDetailScreen;
