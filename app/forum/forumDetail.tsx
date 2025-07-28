import {
  Feather,
  MaterialIcons
} from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type Topic = {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  replies: number;
  views: number;
  lastReply: {
    user: string;
    date: string;
  };
  isSticky?: boolean;
  isLocked?: boolean;
};

type ForumDetail = {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: Topic[];
};

const ForumDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');

  // Sample forum data
  const forum: ForumDetail = {
    id: '1',
    title: 'React Native Discussions',
    description: 'Everything about React Native development',
    icon: 'https://randomuser.me/api/portraits/men/32.jpg',
    topics: [
      {
        id: '1',
        title: 'How to optimize performance in React Native?',
        author: {
          name: 'perf_guru',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        replies: 42,
        views: 1024,
        lastReply: {
          user: 'mobile_dev',
          date: '3 hours ago'
        },
        isSticky: true
      },
      {
        id: '2',
        title: 'How to use prisma',
        author: {
          name: 'Honore',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        replies: 42,
        views: 1024,
        lastReply: {
          user: 'Full_dev',
          date: '1 hours ago'
        },
        isSticky: true
      },
      // More topics...
    ]
  };

  // Filter topics based on search
  const filteredTopics = forum.topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTopic = () => {
    if (newTopicTitle.trim()) {
      // In a real app, this would create a new topic
      console.log('Creating new topic:', newTopicTitle);
      setNewTopicTitle('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Forum Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: forum.icon }} 
          style={styles.forumIcon}
        />
        <View style={styles.forumInfo}>
          <Text style={styles.forumTitle}>{forum.title}</Text>
          <Text style={styles.forumDescription}>{forum.description}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search topics..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Create New Topic */}
      <View style={styles.createTopicContainer}>
        <TextInput
          style={styles.topicInput}
          placeholder="Commencer un sujet..."
          placeholderTextColor="#999"
          value={newTopicTitle}
          onChangeText={setNewTopicTitle}
        />
        <TouchableOpacity 
          style={[
            styles.createButton,
            !newTopicTitle.trim() && styles.createButtonDisabled
          ]}
          onPress={handleCreateTopic}
          disabled={!newTopicTitle.trim()}
        >
          <Text style={styles.createButtonText}>Creer</Text>
        </TouchableOpacity>
      </View>

      {/* Topics List */}
      <View style={styles.topicsContainer}>
        {filteredTopics.length > 0 ? (
          filteredTopics.map(topic => (
            <Link href={`/forum/topics`} key={topic.id} asChild>
              <TouchableOpacity style={styles.topicCard}>
                <View style={styles.topicHeader}>
                  <Image 
                    source={{ uri: topic.author.avatar }} 
                    style={styles.authorAvatar}
                  />
                  <View style={styles.topicInfo}>
                    <Text style={styles.topicTitle} numberOfLines={1}>
                      {topic.title}
                    </Text>
                    <Text style={styles.topicAuthor}>
                      Commencé par {topic.author.name}
                    </Text>
                  </View>
                  {(topic.isSticky || topic.isLocked) && (
                    <View style={styles.topicBadges}>
                      {topic.isSticky && (
                        <View style={styles.badgeSticky}>
                          <MaterialIcons name="push-pin" size={14} color="#fff" />
                        </View>
                      )}
                      {topic.isLocked && (
                        <View style={styles.badgeLocked}>
                          <MaterialIcons name="lock" size={14} color="#fff" />
                        </View>
                      )}
                    </View>
                  )}
                </View>
                
                <View style={styles.topicStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{topic.replies}</Text>
                    <Text style={styles.statLabel}>Reponses</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{topic.views}</Text>
                    <Text style={styles.statLabel}>Vues</Text>
                  </View>
                  <View style={styles.lastReply}>
                    <Text style={styles.lastReplyText} numberOfLines={1}>
                      Dernière réponse par {topic.lastReply.user}
                    </Text>
                    <Text style={styles.lastReplyDate}>{topic.lastReply.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="forum" size={50} color="#ccc" />
            <Text style={styles.emptyStateText}>No topics found</Text>
            <Text style={styles.emptyStateSubtext}>
              {searchQuery ? 'Try a different search' : 'Be the first to start a topic'}
            </Text>
          </View>
        )}
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  forumIcon: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  forumInfo: {
    flex: 1,
  },
  forumTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  forumDescription: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 48,
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
  createTopicContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  topicInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
  createButton: {
    backgroundColor: '#06803A',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  topicsContainer: {
    marginBottom: 32,
  },
  topicCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  topicHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  topicAuthor: {
    fontSize: 12,
    color: '#666',
  },
  topicBadges: {
    flexDirection: 'row',
    gap: 4,
  },
  badgeSticky: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    padding: 4,
  },
  badgeLocked: {
    backgroundColor: '#f44336',
    borderRadius: 4,
    padding: 4,
  },
  topicStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#06803A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  lastReply: {
    flex: 2,
    paddingLeft: 16,
  },
  lastReplyText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  lastReplyDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyState: {
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

export default ForumDetailScreen;