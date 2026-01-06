import Fonts from "@/constants/Fonts";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Episode = {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  audioUrl: string;
  listens: number;
};

type Podcast = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  category: string;
  episodesCount: number;
  rating: number;
  followers: number;
  episodes: Episode[];
  similarPodcasts: {
    id: string;
    title: string;
    author: string;
    coverImage: string;
  }[];
};

const PodcastDetailScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(100);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  // Sample podcast data
  const podcast: Podcast = {
    id: "1",
    title: "The Daily Tech",
    author: "Tech Media Network",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    description:
      "The latest in technology news and trends, delivered daily by industry experts. We cover everything from startups to enterprise tech, with interviews from leading figures in the industry.",
    category: "Technology",
    episodesCount: 342,
    rating: 4.8,
    followers: 12500,
    episodes: [
      {
        id: "1",
        title: "The Future of AI in 2023",
        description:
          "In this episode, we discuss the major AI trends to watch in 2023 with Dr. Sarah Chen, AI researcher at Stanford University.",
        duration: "45:22",
        date: "2 days ago",
        audioUrl:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        listens: 1243,
      },
      // More episodes...
    ],
    similarPodcasts: [
      {
        id: "2",
        title: "Tech Today",
        author: "Digital Media Inc",
        coverImage:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      },
      // More similar podcasts...
    ],
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control audio playback
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleEpisodeSelect = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsPlaying(true);
    // In a real app, this would start playing the selected episode
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail Podcast</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerAction}>
            <Feather name="share-2" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerAction}>
            <MaterialIcons name="more-vert" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Podcast Header */}
        <View style={styles.podcastHeader}>
          <Image
            source={{ uri: podcast.coverImage }}
            style={styles.coverImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{podcast.title}</Text>
            <Text style={styles.author}>{podcast.author}</Text>
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <MaterialIcons name="library-books" size={16} color="#666" />
                <Text style={styles.metaText}>
                  {podcast.episodesCount} episodes
                </Text>
              </View>
              <View style={styles.metaItem}>
                <AntDesign name="star" size={16} color="#FFD700" />
                <Text style={styles.metaText}>{podcast.rating}</Text>
              </View>
              <View style={styles.metaItem}>
                <FontAwesome name="user" size={14} color="#666" />
                <Text style={styles.metaText}>
                  {podcast.followers.toLocaleString()}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={handleFollow}
            >
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followingButtonText,
                ]}
              >
                {isFollowing ? "Suivi" : "Suivre"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Podcast Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A propos</Text>
          <Text style={styles.description}>{podcast.description}</Text>
        </View>

        {/* Now Playing Bar (visible when episode is selected) */}
        {selectedEpisode && (
          <View style={styles.nowPlayingBar}>
            <Image
              source={{ uri: podcast.coverImage }}
              style={styles.nowPlayingImage}
            />
            <View style={styles.nowPlayingInfo}>
              <Text style={styles.nowPlayingTitle} numberOfLines={1}>
                {selectedEpisode.title}
              </Text>
              <Text style={styles.nowPlayingAuthor}>{podcast.author}</Text>
            </View>
            <TouchableOpacity
              onPress={handlePlayPause}
              style={styles.playButton}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={24}
                color="#06803A"
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Player Controls (visible when episode is selected) */}
        {selectedEpisode && (
          <View style={styles.playerControls}>
            <Slider
              style={styles.progressBar}
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              onValueChange={setCurrentTime}
              minimumTrackTintColor="#06803A"
              maximumTrackTintColor="#e0e0e0"
              thumbTintColor="#06803A"
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
            <View style={styles.secondaryControls}>
              <TouchableOpacity>
                <Ionicons name="play-back" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="play-forward" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="share-2" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo name="add-to-list" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Episodes List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Episodes</Text>
          {podcast.episodes.map((episode) => (
            <TouchableOpacity
              key={episode.id}
              style={[
                styles.episodeCard,
                selectedEpisode?.id === episode.id && styles.selectedEpisode,
              ]}
              onPress={() => handleEpisodeSelect(episode)}
            >
              <View style={styles.episodeHeader}>
                <Text style={styles.episodeTitle}>{episode.title}</Text>
                <Text style={styles.episodeDuration}>{episode.duration}</Text>
              </View>
              <Text style={styles.episodeDate}>
                {episode.date} • {episode.listens.toLocaleString()} En ecoute
              </Text>
              <Text style={styles.episodeDescription} numberOfLines={2}>
                {episode.description}
              </Text>
              <View style={styles.episodeActions}>
                <TouchableOpacity style={styles.episodeAction}>
                  <Feather name="download" size={16} color="#666" />
                  <Text style={styles.episodeActionText}>Telecharger</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.episodeAction}>
                  <Entypo name="add-to-list" size={16} color="#666" />
                  <Text style={styles.episodeActionText}>Enregistrer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.episodeAction}>
                  <Feather name="share-2" size={16} color="#666" />
                  <Text style={styles.episodeActionText}>Partager</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Similar Podcasts */}
        {podcast.similarPodcasts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}> Podcasts Similaires</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarPodcastsContainer}
            >
              {podcast.similarPodcasts.map((podcast) => (
                <TouchableOpacity
                  key={podcast.id}
                  style={styles.similarPodcastCard}
                  onPress={() => router.push("/podcast/podcastDetail")}
                >
                  <Image
                    source={{ uri: podcast.coverImage }}
                    style={styles.similarPodcastImage}
                  />
                  <Text style={styles.similarPodcastTitle} numberOfLines={1}>
                    {podcast.title}
                  </Text>
                  <Text style={styles.similarPodcastAuthor} numberOfLines={1}>
                    {podcast.author}
                  </Text>
                </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  podcastHeader: {
    flexDirection: "row",
    marginBottom: 24,
  },
  coverImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginLeft: 4,
  },
  followButton: {
    backgroundColor: "#06803A",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  followingButton: {
    backgroundColor: "#d6f9e0ff",
  },
  followButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Fonts.type.semi,
  },
  followingButtonText: {
    color: "#06803A",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    lineHeight: 22,
    color: "#333",
  },
  nowPlayingBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nowPlayingImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  nowPlayingInfo: {
    flex: 1,
  },
  nowPlayingTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 2,
  },
  nowPlayingAuthor: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0e6ff",
    justifyContent: "center",
    alignItems: "center",
  },
  playerControls: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressBar: {
    width: "100%",
    height: 4,
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  timeText: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
  },
  secondaryControls: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  episodeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedEpisode: {
    borderColor: "#06803A",
    borderWidth: 1,
  },
  episodeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  episodeTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.semi,
    color: "#333",
    flex: 1,
  },
  episodeDuration: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginLeft: 8,
  },
  episodeDate: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginBottom: 8,
  },
  episodeDescription: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#333",
    lineHeight: 20,
    marginBottom: 12,
  },
  episodeActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  episodeAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  episodeActionText: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginLeft: 4,
  },
  similarPodcastsContainer: {
    paddingVertical: 8,
  },
  similarPodcastCard: {
    width: 120,
    marginRight: 16,
  },
  similarPodcastImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarPodcastTitle: {
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 2,
  },
  similarPodcastAuthor: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
  },
});

export default PodcastDetailScreen;
