import {
    AntDesign,
    Feather,
    FontAwesome,
    Ionicons,
    MaterialIcons
} from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Linking,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

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
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Sample book data
  const book: BookDetail = {
    id: '1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverImage: 'https://m.media-amazon.com/images/I/51B7kuFwQFL._SY425_.jpg',
    price: 12.99,
    rating: 4.5,
    category: 'Thriller',
    description: 'Alicia Berenson was thirty-three years old when she killed her husband...',
    pages: 336,
    publisher: 'Celadon Books',
    publishedDate: 'February 5, 2019',
    isbn: '9781250301697',
    language: 'English',
    reviews: [
      {
        id: '1',
        user: 'BookLover42',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Absolutely mind-blowing twist at the end! Could not put it down.',
        likes: 24
      },
      // More reviews...
    ],
    relatedBooks: [
      {
        id: '2',
        title: 'The Maidens',
        author: 'Alex Michaelides',
        coverImage: 'https://m.media-amazon.com/images/I/51B7kuFwQFL._SY425_.jpg',
        price: 14.99,
        rating: 4.2
      },
      // More related books...
    ]
  };

  // Handler functions
  const handleAddToWishlist = () => setInWishlist(!inWishlist);
  const handleAddToCart = () => setInCart(!inCart);
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${book.title}" by ${book.author} - ${book.description.substring(0, 100)}...`,
        title: book.title
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handlePreview = () => {
    Linking.openURL(`https://books.google.com/books?id=${book.isbn}&pg=PP1&dq=${book.isbn}&hl=&cd=1&source=gbs_api`);
  };
  const handlePurchase = () => Linking.openURL('https://example.com/checkout');

  const handleAddReview = () => {
    if (newReview.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        user: 'CurrentUser',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        rating: 5,
        date: 'Just now',
        comment: newReview,
        likes: 0
      };
      setReviews([...reviews, review]);
      setNewReview('');
    }
  };

  const handleLikeReview = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, likes: review.likes + 1 } 
        : review
    ));
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));




  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Book Cover and Basic Info */}
      <View style={styles.header}>
        <Image 
          source={{ uri: book.coverImage }} 
          style={styles.coverImage}
          resizeMode="contain"
        />
        
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>by {book.author}</Text>
          
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingText}>{book.rating}</Text>
            <Text style={styles.category}>{book.category}</Text>
          </View>
          
          <Text style={styles.price}>${book.price.toFixed(2)}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, inWishlist && styles.inWishlist]}
          onPress={handleAddToWishlist}
        >
          <MaterialIcons 
            name={inWishlist ? "favorite" : "favorite-border"} 
            size={24} 
            color={inWishlist ? "#ff4444" : "#333"} 
          />
          <Text style={styles.actionButtonText}>
            {inWishlist ? 'Favoris' : 'Souhait'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, inCart && styles.inCart]}
          onPress={handleAddToCart}
        >
          <Feather 
            name={inCart ? "shopping-bag" : "shopping-cart"} 
            size={24} 
            color={inCart ? "#4CAF50" : "#333"} 
          />
          <Text style={styles.actionButtonText}>
            {inCart ? 'Au panier' : 'Ajouter'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleShare}
        >
          <Feather name="share-2" size={24} color="#333" />
          <Text style={styles.actionButtonText}>Partager</Text>
        </TouchableOpacity>
      </View>

       {/* Purchase Options */}
      <View style={styles.purchaseSection}>
        <Text style={styles.sectionTitle}> Options d'achat</Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <MaterialIcons name="remove" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <MaterialIcons name="add" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        <Text style={styles.totalPrice}>
          Total: ${(book.price * quantity).toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.buyButton} onPress={handlePurchase}>
          <Text style={styles.buyButtonText}>Payer Maintenant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>
            {inCart ? 'Au panier' : 'Ajouter au panier'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Book Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{book.description}</Text>
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <FontAwesome name="book" size={20} color="#666" />
          <Text style={styles.detailLabel}>Pages</Text>
          <Text style={styles.detailValue}>{book.pages}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialIcons name="language" size={20} color="#666" />
          <Text style={styles.detailLabel}>Langues</Text>
          <Text style={styles.detailValue}>{book.language}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Feather name="calendar" size={20} color="#666" />
          <Text style={styles.detailLabel}>Publié</Text>
          <Text style={styles.detailValue}>{book.publishedDate}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialIcons name="library-books" size={20} color="#666" />
          <Text style={styles.detailLabel}>Publisher</Text>
          <Text style={styles.detailValue}>{book.publisher}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialIcons name="featured-play-list" size={20} color="#666" />
          <Text style={styles.detailLabel}>ISBN</Text>
          <Text style={styles.detailValue}>{book.isbn}</Text>
        </View>
      </View>

      {/* Preview Button */}
      <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
        <Ionicons name="book-outline" size={24} color="#06803A" />
        <Text style={styles.previewButtonText}>Lire ce Livre</Text>
      </TouchableOpacity>


      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Commentaires des clients</Text>
        {[...book.reviews, ...reviews].map(review => (
          <View key={review.id} style={styles.reviewContainer}>
            <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
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
                <AntDesign name="like2" size={16} color="#666" />
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
            <Text style={styles.submitReviewText}>Soumettre un commentaire</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Related Books */}
      {book.relatedBooks.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vous aimerez peut-être aussi</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedBooksContainer}
          >
            {book.relatedBooks.map(book => (
              <Link href={`/bookstore/${book.id}`} key={book.id} asChild>
                <TouchableOpacity style={styles.relatedBookCard}>
                  <Image 
                    source={{ uri: book.coverImage }} 
                    style={styles.relatedBookCover}
                  />
                  <Text style={styles.relatedBookTitle} numberOfLines={1}>{book.title}</Text>
                  <Text style={styles.relatedBookAuthor}>{book.author}</Text>
                  <View style={styles.relatedBookFooter}>
                    <Text style={styles.relatedBookPrice}>${book.price.toFixed(2)}</Text>
                    <View style={styles.relatedBookRating}>
                      <MaterialIcons name="star" size={14} color="#FFD700" />
                      <Text style={styles.relatedBookRatingText}>{book.rating}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 20,
  },
  coverImage: {
    width: 120,
    height: 180,
    borderRadius: 4,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
    marginRight: 12,
  },
  category: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06803A',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    width: '30%',
  },
  inWishlist: {
    backgroundColor: '#ffebee',
  },
  inCart: {
    backgroundColor: '#e8f5e9',
  },
  actionButtonText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6ffebff',
    marginBottom: 24,
    borderRadius: 8,
    padding: 16,
  },
  previewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#06803A',
    marginLeft: 8,
  },
  purchaseSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  buyButton: {
    backgroundColor: '#06803A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#e6fff0ff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#06803A',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  addReviewContainer: {
    marginTop: 24,
  },
  addReviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  reviewInput: {
    backgroundColor: '#f8faf9ff',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    marginBottom: 12,
    fontSize: 14,
    color: '#333',
  },
  submitReviewButton: {
    backgroundColor: '#06803A',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    opacity: 1,
  },
  submitReviewButtonDisabled: {
    opacity: 0.5,
  },
  submitReviewText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  relatedBooksContainer: {
    paddingVertical: 8,
  },
  relatedBookCard: {
    width: 150,
    marginRight: 16,
  },
  relatedBookCover: {
    width: 150,
    height: 200,
    borderRadius: 4,
    marginBottom: 8,
  },
  relatedBookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  relatedBookAuthor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  relatedBookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  relatedBookPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#06803A',
  },
  relatedBookRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  relatedBookRatingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default BookDetailScreen;