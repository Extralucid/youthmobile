import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

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
    const [searchQuery, setSearchQuery] = useState('');

    // Sample book data
    const books: Book[] = [
        {
            id: '1',
            title: 'The Silent Patient',
            author: 'Alex Michaelides',
            coverImage: 'https://m.media-amazon.com/images/I/51B7kuFwQFL._SY425_.jpg',
            price: 12.99,
            rating: 4.5,
            category: 'Thriller',
            reviewsCount: 1243
        },
        {
            id: '2',
            title: 'Atomic Habits',
            author: 'James Clear',
            coverImage: 'https://m.media-amazon.com/images/I/51B7kuFwQFL._SY425_.jpg',
            price: 12.99,
            rating: 4.5,
            category: 'Thriller',
            reviewsCount: 1243
        },
        // Add more books...
    ];

    // Extract all unique categories
    const categories = Array.from(new Set(books.map(book => book.category)));

    // Filter books based on selected category and search query
    const filteredBooks = books.filter(book => {
        const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
        const matchesSearch = searchQuery === '' ||
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search books or authors..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                        <MaterialIcons name="clear" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Categories Filter */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            >
                <TouchableOpacity
                    style={[styles.category, !selectedCategory && styles.activeCategory]}
                    onPress={() => setSelectedCategory(null)}
                >
                    <Text style={[styles.categoryText, !selectedCategory && styles.activeCategoryText]}>All</Text>
                </TouchableOpacity>
                {categories.map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[styles.category, selectedCategory === category && styles.activeCategory]}
                        onPress={() => setSelectedCategory(category === selectedCategory ? null : category)}
                    >
                        <Text style={[styles.categoryText, selectedCategory === category && styles.activeCategoryText]}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Books Grid */}
            <ScrollView contentContainerStyle={styles.booksContainer}>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <Link href={`/books/bookDetail`} key={book.id} asChild>
                            <TouchableOpacity style={styles.bookCard}>
                                <Image
                                    source={{ uri: book.coverImage }}
                                    style={styles.bookCover}
                                    resizeMode="contain"
                                />
                                <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
                                <Text style={styles.bookAuthor}>{book.author}</Text>
                                <View style={styles.bookFooter}>
                                    <Text style={styles.bookPrice}>${book.price.toFixed(2)}</Text>
                                    <View style={styles.ratingContainer}>
                                        <MaterialIcons name="star" size={16} color="#FFD700" />
                                        <Text style={styles.ratingText}>{book.rating}</Text>
                                        <Text style={styles.reviewsCount}>({book.reviewsCount})</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <MaterialIcons name="search-off" size={50} color="#ccc" />
                        <Text style={styles.emptyStateText}>No books found</Text>
                        <Text style={styles.emptyStateSubtext}>Try a different search or filter</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const { width } = Dimensions.get('window');
const BOOK_WIDTH = (width - 48) / 2; // 2 books per row with padding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginTop: 40,
        marginBottom: 16,
        height: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
    },
    clearButton: {
        padding: 4,
    },
    reviewsCount: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        width: '100%',
    },
    emptyStateText: {
        fontSize: 18,
        color: '#666',
        marginTop: 16,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 4,
    },
    categoriesContainer: {
        paddingVertical: 8,
        paddingRight: 16,

    },
    category: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 32,
        backgroundColor: '#f0f0f0ff',
        borderRadius: 16,
        marginRight: 8,
    },
    activeCategory: {
        backgroundColor: '#06803A',
    },
    categoryText: {
        color: '#666',
        fontSize: 14,
    },
    activeCategoryText: {
        color: '#fff',
    },
    booksContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 0,
        paddingBottom: 32,
    },
    bookCard: {
        width: BOOK_WIDTH,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    bookCover: {
        width: '100%',
        height: 180,
        marginBottom: 8,
        borderRadius: 4,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    bookFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#06803A',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
});

export default BookScreen;