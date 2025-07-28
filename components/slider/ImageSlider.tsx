import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width;
const SLIDE_HEIGHT = 200;

type Slide = {
    id: string;
    image: any; // or use require() with local images
    title: string;
    subtitle: string;
};

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const slides: Slide[] = [
        {
            id: '1',
            image: require('../../assets/images/education.jpg'), // or use { uri: 'https://...' }
            title: 'Premium Services',
            subtitle: 'Experience top-quality solutions tailored for you'
        },
        {
            id: '2',
            image: require('../../assets/images/education.jpg'),
            title: 'Expert Team',
            subtitle: 'Work with certified professionals'
        },
        {
            id: '3',
            image: require('../../assets/images/education.jpg'),
            title: '24/7 Support',
            subtitle: 'We\'re always here to help'
        }
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            const newIndex = (currentIndex + 1) % slides.length;
            slidesRef.current.scrollToIndex({ index: newIndex });
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const handlePrev = () => {
        if (currentIndex > 0) {
            slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
    };

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
    };

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={slidesRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                onMomentumScrollEnd={(e) => {
                    const newIndex = Math.round(e.nativeEvent.contentOffset.x / SLIDER_WIDTH);
                    setCurrentIndex(newIndex);
                }}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.subtitle}>{item.subtitle}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />

            {/* Navigation arrows */}
            <TouchableOpacity
                style={[styles.arrow, styles.leftArrow]}
                onPress={handlePrev}
                disabled={currentIndex === 0}
            >
                <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color={currentIndex === 0 ? '#ccc' : '#fff'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.arrow, styles.rightArrow]}
                onPress={handleNext}
                disabled={currentIndex === slides.length - 1}
            >
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={24}
                    color={currentIndex === slides.length - 1 ? '#ccc' : '#fff'}
                />
            </TouchableOpacity>

            {/* Pagination indicators */}
            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: SLIDE_HEIGHT,
    },
    slide: {
        width: SLIDER_WIDTH,
        height: SLIDE_HEIGHT,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
    },
    arrow: {
        position: 'absolute',
        top: '50%',
        marginTop: -20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftArrow: {
        left: 10,
    },
    rightArrow: {
        right: 10,
    },
    pagination: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#fff',
        width: 16,
    },
});

export default ImageSlider;