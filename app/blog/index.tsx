import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // Sample blog post data
    const blogPosts: BlogPost[] = [
        {
            id: '1',
            title: 'Getting Started with React Native',
            excerpt: 'Learn the basics of building mobile apps with React Native and Expo',
            coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
            date: 'May 15, 2023',
            tags: ['React Native', 'Mobile'],
            readTime: '5 min read'
        },
        {
            id: '2',
            title: 'State Management in 2023',
            excerpt: 'Comparing different state management solutions for your React applications',
            coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
            date: 'June 2, 2023',
            tags: ['React', 'State'],
            readTime: '8 min read'
        },
        {
            id: '3',
            title: 'Building Scalable APIs',
            excerpt: 'Best practices for designing RESTful APIs that scale with your business',
            coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
            date: 'June 18, 2023',
            tags: ['Backend', 'API'],
            readTime: '6 min read'
        },
        {
            id: '4',
            title: 'UI/UX Design Principles',
            excerpt: 'Essential design principles every developer should know',
            coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
            date: 'July 5, 2023',
            tags: ['Design', 'UI/UX'],
            readTime: '4 min read'
        },
    ];

    // Extract all unique tags
    const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

    // Filter posts based on search and active tag
    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
        return matchesSearch && matchesTag;
    });

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search blog posts..."
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

            {/* Tags Filter */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tagsContainer}
            >
                <TouchableOpacity
                    style={[styles.tag, !activeTag && styles.activeTag]}
                    onPress={() => setActiveTag(null)}
                >
                    <Text style={[styles.tagText, !activeTag && styles.activeTagText]}>All</Text>
                </TouchableOpacity>
                {allTags.map(tag => (
                    <TouchableOpacity
                        key={tag}
                        style={[styles.tag, activeTag === tag && styles.activeTag]}
                        onPress={() => setActiveTag(tag === activeTag ? null : tag)}
                    >
                        <Text style={[styles.tagText, activeTag === tag && styles.activeTagText]}>{tag}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Blog Posts List */}
            <ScrollView contentContainerStyle={styles.postsContainer}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <Link href={`blog/blogDetails`} key={post.id} asChild>
                            <TouchableOpacity key={post.id} style={styles.postCard}>
                                <Image
                                    source={{ uri: post.coverImage }}
                                    style={styles.postImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.postContent}>
                                    <View style={styles.tagsContainer}>
                                        {post.tags.map(tag => (
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
                            </TouchableOpacity >
                        </Link>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <MaterialIcons name="find-in-page" size={50} color="#ccc" />
                        <Text style={styles.emptyStateText}>No posts found</Text>
                        <Text style={styles.emptyStateSubtext}>Try a different search or filter</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

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
        marginBottom: 16,
        marginTop: 40,
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
    tagsContainer: {
        paddingVertical: 8,
        marginBottom: 16,
        paddingRight: 16,
    },
    tag: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 32,
        backgroundColor: '#f0f0f0ff',
        borderRadius: 16,
        marginRight: 8,
    },
    activeTag: {
        backgroundColor: '#F59B21',
    },
    tagText: {
        color: '#666',
        fontSize: 14,
    },
    activeTagText: {
        color: '#fff',
    },
    postsContainer: {
        paddingBottom: 32,
    },
    postCard: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    postImage: {
        width: '100%',
        height: 160,
    },
    postContent: {
        padding: 16,
    },
    postTag: {
        backgroundColor: '#eaffe6ff',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    postTagText: {
        color: '#06803A',
        fontSize: 12,
        fontWeight: '500',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    postExcerpt: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 12,
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    postDate: {
        fontSize: 12,
        color: '#999',
    },
    readTime: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
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
});

export default BlogScreen;