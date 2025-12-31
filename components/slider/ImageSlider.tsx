import Fonts from "@/constants/Fonts";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDE_HEIGHT = 200;
const SLIDE_WIDTH = SCREEN_WIDTH - 50; // 25px padding de chaque côté

type Slide = {
  id: string;
  image: any;
  title: string;
  subtitle: string;
};

const SLIDES: Slide[] = [
  {
    id: "1",
    image: require("../../assets/images/education.jpg"),
    title: "Bienvenue",
    subtitle: "Découvrez nos services pour la jeunesse",
  },
  {
    id: "2",
    image: require("../../assets/images/education.jpg"),
    title: "Formation",
    subtitle: "Développez vos compétences professionnelles",
  },
  {
    id: "3",
    image: require("../../assets/images/education.jpg"),
    title: "Opportunités",
    subtitle: "Accédez aux meilleures offres d'emploi",
  },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % SLIDES.length;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SLIDE_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    }
  );

  const handleScrollEnd = useCallback((event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SLIDE_WIDTH);
    setCurrentIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        decelerationRate="fast"
        bounces={false}
      >
        {SLIDES.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.75)"]}
              locations={[0.3, 1]}
              style={styles.gradient}
            >
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>

      {/* Pagination */}
      <View style={styles.pagination}>
        {SLIDES.map((_, index) => {
          const inputRange = [
            (index - 1) * SLIDE_WIDTH,
            index * SLIDE_WIDTH,
            (index + 1) * SLIDE_WIDTH,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [6, 20, 6],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor: currentIndex === index ? "#F59B21" : "#fff",
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SLIDE_HEIGHT,
    marginBottom: 16,
    paddingHorizontal: 25,
  },
  slide: {
    width: SCREEN_WIDTH - 50,
    height: SLIDE_HEIGHT,
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    justifyContent: "flex-end",
    padding: 20,
    paddingBottom: 24,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: 24,
    color: "#fff",
    marginBottom: 6,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: Fonts.type.primary,
    fontSize: 16,
    color: "#fff",
    opacity: 0.95,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  pagination: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
});

export default ImageSlider;
