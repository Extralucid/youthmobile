import ImageSlider from '@/components/slider/ImageSlider';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const { width: screenWidth } = Dimensions.get('window');
const ServicesScreen = () => {

    const cardData = [
        {
            id: 1,
            icon: '🏷️', // Offers - gift box
            label: 'Offres',
            href: '/job',
        },
        {
            id: 2,
            icon: '📝', // Blogs - memo/notepad
            label: 'Blogs',
            href: '/blog',
        },
        {
            id: 3,
            icon: '🎓', // Tutorials - graduation cap
            label: 'Tutoriels',
            href: '/tutorials',
        },
        {
            id: 4,
            icon: '🎙️', // Podcasts - microphone
            label: 'Podcasts',
            href: '/podcast',
        },
        {
            id: 5,
            icon: '💬', // Chat - speech bubble
            label: 'Chat',
            href: '/chat',
        },
        {
            id: 6,
            icon: '📚', // Books - stack of books
            label: 'Livres',
            href: '/books',
        },
        {
            id: 7,
            icon: '🗣️', // Forums - speaking head
            label: 'Forums',
            href: '/forum',
        },
        {
            id: 8,
            icon: '💼', // Enterprises - office building
            label: 'Sociétés',
            href: '/settings/entreprises',
        },
        {
            id: 9,
            icon: '🏛️', // Universities - classical building
            label: 'Instituts',
            href: '/settings/universites',
        },
    ];


    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.carouselContainer}>
                    <ImageSlider />
                </View>


                {/* Cards Grid Section */}
                <View style={styles.gridContainer}>
                    <Text style={styles.gridTitle}>Ressources et Opportunités</Text>
                    <View style={styles.grid}>
                        {cardData.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.card}
                                onPress={() => { router.navigate(item.href) }}>
                                <Text style={styles.cardIcon}>{item.icon}</Text>
                                <Text style={styles.cardLabel}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        paddingHorizontal: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: 'white',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    headerButton: {
        padding: 4,
    },
    carouselContainer: {
        margin: 15,
    },
    carouselItem: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    carouselImage: {
        width: '100%',
        height: 180,
    },
    carouselTextContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
    },
    carouselTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    carouselSubtitle: {
        color: 'white',
        fontSize: 16,
    },
    gridContainer: {
        backgroundColor: 'white',
        padding: 15,
        paddingBottom: 100,
        margin: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    gridTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: (screenWidth - 60) / 3.9, // Adjusted for horizontal gap
        aspectRatio: 1,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    cardIcon: {
        fontSize: 25,
        marginBottom: 5,
    },
    cardLabel: {
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        color: '#555',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        paddingBottom: 45,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
});

export default ServicesScreen;