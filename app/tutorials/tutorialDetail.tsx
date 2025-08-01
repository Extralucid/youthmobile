import {
    AntDesign,
    Feather,
    Ionicons,
    MaterialIcons
} from '@expo/vector-icons';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type Section = {
  id: string;
  title: string;
  type: 'video' | 'pdf';
  duration?: string;
  contentUrl: string;
  completed?: boolean;
};

type Tutorial = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
  duration: string;
  difficulty: string;
  sections: Section[];
  resources?: {
    title: string;
    url: string;
  }[];
};

const TutorialDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const videoRef = useRef<Video>(null);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Sample tutorial data
  const tutorial: Tutorial = {
    id: '1',
    title: 'React Native Fundamentals',
    description: 'This comprehensive tutorial covers all the core concepts you need to start building React Native applications. Learn about components, state management, navigation and more.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    author: {
      name: 'Jane Developer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    duration: '4h 30m',
    difficulty: 'Beginner',
    sections: [
      {
        id: '1',
        title: 'Introduction to React Native',
        type: 'video',
        duration: '15:20',
        contentUrl: 'https://example.com/video1.mp4',
        completed: true
      },
      {
        id: '2',
        title: 'Core Components Guide',
        type: 'pdf',
        contentUrl: 'https://example.com/pdf1.pdf'
      },
      // More sections...
    ],
    resources: [
      {
        title: 'React Native Documentation',
        url: 'https://reactnative.dev/docs/getting-started'
      },
      // More resources...
    ]
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSectionSelect = (section: Section) => {
    setCurrentSection(section);
    setIsPlaying(false);
  };

  const handleOpenPDF = async (url: string) => {
    try {
      // Download the PDF first
      const fileUri = `${FileSystem.documentDirectory}temp.pdf`;
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri
      );

      const { uri } = await downloadResumable.downloadAsync();
      
      // Open the PDF
      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: uri,
        flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
        type: 'application/pdf'
      });
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  const handleResourcePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tutorial Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: tutorial.thumbnail }} 
          style={styles.thumbnail}
        />
        <Text style={styles.title}>{tutorial.title}</Text>
        <View style={styles.authorContainer}>
          <Image 
            source={{ uri: tutorial.author.avatar }} 
            style={styles.authorAvatar}
          />
          <Text style={styles.authorName}>{tutorial.author.name}</Text>
        </View>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <MaterialIcons name="access-time" size={16} color="#666" />
            <Text style={styles.metaText}>{tutorial.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons name="school" size={16} color="#666" />
            <Text style={styles.metaText}>{tutorial.difficulty}</Text>
          </View>
        </View>
        <Text style={styles.description}>{tutorial.description}</Text>
      </View>

      {/* Current Section Player/Viewer */}
      {currentSection && (
        <View style={styles.currentSectionContainer}>
          <Text style={styles.sectionTitle}>Now Viewing: {currentSection.title}</Text>
          
          {currentSection.type === 'video' ? (
            <>
              <Video
                ref={videoRef}
                source={{ uri: currentSection.contentUrl }}
                style={styles.videoPlayer}
                useNativeControls
                resizeMode="contain"
                onPlaybackStatusUpdate={status => {
                  setIsPlaying(status.isPlaying || false);
                  if (status.durationMillis) {
                    setProgress(status.positionMillis / status.durationMillis);
                  }
                }}
              />
              <View style={styles.videoControls}>
                <TouchableOpacity onPress={handlePlayPause}>
                  <Ionicons 
                    name={isPlaying ? "pause" : "play"} 
                    size={24} 
                    color="#06803A" 
                  />
                </TouchableOpacity>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                </View>
                <Text style={styles.durationText}>
                  {currentSection.duration}
                </Text>
              </View>
            </>
          ) : (
            <TouchableOpacity 
              style={styles.pdfContainer}
              onPress={() => handleOpenPDF(currentSection.contentUrl)}
            >
              <Feather name="file-text" size={48} color="#06803A" />
              <Text style={styles.pdfText}>Open PDF Document</Text>
              <Text style={styles.pdfSubtext}>{currentSection.title}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Sections List */}
      <View style={styles.sectionsContainer}>
        <Text style={styles.sectionHeader}>Course Content</Text>
        {tutorial.sections.map(section => (
          <TouchableOpacity 
            key={section.id}
            style={[
              styles.sectionItem,
              currentSection?.id === section.id && styles.activeSection
            ]}
            onPress={() => handleSectionSelect(section)}
          >
            <View style={styles.sectionLeft}>
              {section.type === 'video' ? (
                <Feather name="video" size={20} color="#666" />
              ) : (
                <Feather name="file-text" size={20} color="#666" />
              )}
              <Text style={styles.sectionTitleText}>{section.title}</Text>
            </View>
            <View style={styles.sectionRight}>
              {section.duration && (
                <Text style={styles.sectionDuration}>{section.duration}</Text>
              )}
              {section.completed && (
                <AntDesign name="checkcircle" size={16} color="#4CAF50" />
              )}
              <MaterialIcons name="chevron-right" size={20} color="#999" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Resources */}
      {tutorial.resources && tutorial.resources.length > 0 && (
        <View style={styles.resourcesContainer}>
          <Text style={styles.sectionHeader}>Resources</Text>
          {tutorial.resources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resourceItem}
              onPress={() => handleResourcePress(resource.url)}
            >
              <Feather name="external-link" size={16} color="#06803A" />
              <Text style={styles.resourceText}>{resource.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginTop: 40,
    marginBottom: 24,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    color: '#666',
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  currentSectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    marginBottom: 8,
  },
  videoControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#06803A',
  },
  durationText: {
    fontSize: 12,
    color: '#666',
    minWidth: 40,
    textAlign: 'right',
  },
  pdfContainer: {
    alignItems: 'center',
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  pdfText: {
    fontSize: 16,
    color: '#06803A',
    marginTop: 8,
    fontWeight: '500',
  },
  pdfSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activeSection: {
    backgroundColor: '#f5f5f5',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitleText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  sectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionDuration: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  resourcesContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resourceText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
});

export default TutorialDetailScreen;