import {
    AntDesign,
    Feather,
    MaterialIcons
} from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
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

type Author = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  joinDate: string;
  postsCount: number;
};

type Post = {
  id: string;
  content: string;
  date: string;
  likes: number;
  author: Author;
  isOriginalPost?: boolean;
};

type Topic = {
  id: string;
  title: string;
  author: Author;
  createdAt: string;
  views: number;
  posts: Post[];
  isLocked: boolean;
};

const TopicDetailScreen = () => {
  const { forumId, topicId } = useLocalSearchParams();
  const [newPost, setNewPost] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Sample topic data
  const topic: Topic = {
    id: '1',
    title: 'How to optimize performance in React Native?',
    author: {
      id: '1',
      name: 'perf_guru',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'Moderator',
      joinDate: 'Jan 2020',
      postsCount: 342
    },
    createdAt: '1 semaine',
    views: 1024,
    isLocked: false,
    posts: [
      {
        id: '1',
        content: 'I\'ve been having performance issues with my React Native app, especially with long lists. What are some proven strategies to optimize performance? I\'ve already tried memoizing components but still seeing jank.',
        date: '1 heure',
        likes: 24,
        author: {
          id: '1',
          name: 'perf_guru',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          role: 'Moderator',
          joinDate: 'Jan 2020',
          postsCount: 342
        },
        isOriginalPost: true
      },
      // More posts...
    ]
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      // In a real app, this would add a new post
      console.log('Adding new post:', newPost);
      setNewPost('');
      setReplyingTo(null);
    }
  };

  const handleLikePost = (postId: string) => {
    // In a real app, this would update the like count
    console.log('Liked post:', postId);
  };

  const handleReply = (postId: string) => {
    setReplyingTo(postId === replyingTo ? null : postId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Topic Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{topic.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>Commencer par {topic.author.name}</Text>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{topic.createdAt}</Text>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{topic.views} vues</Text>
          {topic.isLocked && (
            <>
              <Text style={styles.metaText}>•</Text>
              <MaterialIcons name="lock" size={16} color="#f44336" />
            </>
          )}
        </View>
      </View>

      {/* Posts List */}
      <View style={styles.postsContainer}>
        {topic.posts.map(post => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image 
                source={{ uri: post.author.avatar }} 
                style={styles.authorAvatar}
              />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{post.author.name}</Text>
                <View style={styles.authorMeta}>
                  <Text style={styles.authorRole}>{post.author.role}</Text>
                  <Text style={styles.authorJoinDate}>Rejoint {post.author.joinDate}</Text>
                  <Text style={styles.authorPosts}>{post.author.postsCount} posts</Text>
                </View>
              </View>
              {post.isOriginalPost && (
                <View style={styles.originalPostBadge}>
                  <Text style={styles.originalPostBadgeText}>OP</Text>
                </View>
              )}
            </View>
            
            <View style={styles.postContent}>
              <Text style={styles.postText}>{post.content}</Text>
              <Text style={styles.postDate}>{post.date}</Text>
            </View>
            
            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleLikePost(post.id)}
              >
                <AntDesign name="like2" size={16} color="#666" />
                <Text style={styles.actionText}>Jaimes ({post.likes})</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleReply(post.id)}
              >
                <Feather name="message-square" size={16} color="#666" />
                <Text style={styles.actionText}>Repondre</Text>
              </TouchableOpacity>
              
              {post.id === replyingTo && (
                <View style={styles.replyForm}>
                  <TextInput
                    style={styles.replyInput}
                    placeholder="Ecrivez votre réponse..."
                    placeholderTextColor="#999"
                    multiline
                    value={newPost}
                    onChangeText={setNewPost}
                  />
                  <View style={styles.replyButtons}>
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={() => setReplyingTo(null)}
                    >
                      <Text style={styles.cancelButtonText}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.submitButton}
                      onPress={handleAddPost}
                      disabled={!newPost.trim()}
                    >
                      <Text style={styles.submitButtonText}>Postez votre réponse</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Add New Post (if not locked) */}
      {!topic.isLocked && (
        <View style={styles.newPostContainer}>
          <Text style={styles.newPostTitle}>Postez votre réponse</Text>
          <TextInput
            style={styles.newPostInput}
            placeholder="Écrivez votre réponse..."
            placeholderTextColor="#999"
            multiline
            value={newPost}
            onChangeText={setNewPost}
          />
          <TouchableOpacity 
            style={[
              styles.newPostButton,
              !newPost.trim() && styles.newPostButtonDisabled
            ]}
            onPress={handleAddPost}
            disabled={!newPost.trim()}
          >
            <Text style={styles.newPostButtonText}>Publier une réponse</Text>
          </TouchableOpacity>
        </View>
      )}

      {topic.isLocked && (
        <View style={styles.lockedNotice}>
          <MaterialIcons name="lock" size={24} color="#f44336" />
          <Text style={styles.lockedText}>Ce sujet est verrouillé</Text>
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
    marginBottom: 20,
    marginTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  postsContainer: {
    marginBottom: 16,
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  authorMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  authorRole: {
    fontSize: 12,
    color: '#06803A',
    marginRight: 8,
  },
  authorJoinDate: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  authorPosts: {
    fontSize: 12,
    color: '#666',
  },
  originalPostBadge: {
    backgroundColor: '#06803A',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  originalPostBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  postContent: {
    marginBottom: 12,
  },
  postText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  postActions: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  replyForm: {
    marginTop: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  replyInput: {
    minHeight: 80,
    fontSize: 15,
    color: '#333',
    marginBottom: 12,
  },
  replyButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#06803A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  newPostContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  newPostTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  newPostInput: {
    minHeight: 100,
    fontSize: 15,
    color: '#333',
    marginBottom: 12,
  },
  newPostButton: {
    backgroundColor: '#06803A',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  newPostButtonDisabled: {
    opacity: 0.5,
  },
  newPostButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  lockedNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lockedText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
});

export default TopicDetailScreen;