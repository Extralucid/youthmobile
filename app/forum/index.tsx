import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
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

type Forum = {
  id: string;
  title: string;
  description: string;
  icon: string;
  topicsCount: number;
  postsCount: number;
  lastPost: {
    user: string;
    date: string;
  };
};

const ForumScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample forum data
  const forums: Forum[] = [
    {
      id: '1',
      title: 'React Native Discussions',
      description: 'Everything about React Native development',
      icon: 'https://randomuser.me/api/portraits/men/32.jpg',
      topicsCount: 1243,
      postsCount: 15678,
      lastPost: {
        user: 'dev_user123',
        date: '2 hours ago'
      }
    },
    {
      id: '2',
      title: 'JavaScript Help',
      description: 'Get help with JavaScript problems',
      icon: 'https://randomuser.me/api/portraits/men/32.jpg',
      topicsCount: 892,
      postsCount: 10234,
      lastPost: {
        user: 'js_wizard',
        date: '1 day ago'
      }
    },
    // Add more forums...
  ];

  // Filter forums based on search
  const filteredForums = forums.filter(forum => 
    forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    forum.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search forums..."
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

      {/* Forums List */}
      <ScrollView contentContainerStyle={styles.forumsContainer}>
        {filteredForums.length > 0 ? (
          filteredForums.map(forum => (
            <Link href={`/forum/forumDetail`} key={forum.id} asChild>
              <TouchableOpacity style={styles.forumCard}>
                <View style={styles.forumHeader}>
                  <Image 
                    source={{ uri: forum.icon }} 
                    style={styles.forumIcon}
                  />
                  <View style={styles.forumInfo}>
                    <Text style={styles.forumTitle}>{forum.title}</Text>
                    <Text style={styles.forumDescription}>{forum.description}</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color="#999" />
                </View>
                
                <View style={styles.forumStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{forum.topicsCount}</Text>
                    <Text style={styles.statLabel}>Topics</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{forum.postsCount}</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                  </View>
                  <View style={styles.lastPost}>
                    <Text style={styles.lastPostText} numberOfLines={1}>
                      Last post by {forum.lastPost.user}
                    </Text>
                    <Text style={styles.lastPostDate}>{forum.lastPost.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="forum" size={50} color="#ccc" />
            <Text style={styles.emptyStateText}>No forums found</Text>
            <Text style={styles.emptyStateSubtext}>Try a different search</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

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
  forumsContainer: {
    paddingBottom: 32,
  },
  forumCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  forumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  forumIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  forumInfo: {
    flex: 1,
  },
  forumTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  forumDescription: {
    fontSize: 14,
    color: '#666',
  },
  forumStats: {
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
  lastPost: {
    flex: 2,
    paddingLeft: 16,
  },
  lastPostText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  lastPostDate: {
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

export default ForumScreen;