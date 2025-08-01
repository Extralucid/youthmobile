import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type Comment = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
};

type BlogPost = {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  date: string;
  tags: string[];
  categories: string[];
  readTime: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  comments: Comment[];
};

const BlogDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  // Sample blog post data - in a real app you'd fetch this based on the id
  const post: BlogPost = {
    id: '1',
    title: 'Getting Started with React Native',
    content: 'React Native lets you build mobile apps using only JavaScript. It uses the same design as React, letting you compose a rich mobile UI from declarative components.\n\nWith React Native, you don\'t build a "mobile web app", an "HTML5 app", or a "hybrid app". You build a real mobile app that\'s indistinguishable from an app built using Objective-C or Java. React Native uses the same fundamental UI building blocks as regular iOS and Android apps. You just put those building blocks together using JavaScript and React.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    date: 'May 15, 2023',
    tags: ['React Native', 'Mobile', 'JavaScript'],
    categories: ['Development', 'Frontend'],
    readTime: '5 min read',
    author: {
      name: 'Jane Developer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Senior React Native Developer with 5+ years of experience'
    },
    comments: [
      {
        id: '1',
        author: 'Mike Commenter',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Great article! Really helped me understand the basics.',
        date: 'May 16, 2023',
        likes: 4
      },
      {
        id: '2',
        author: 'Sarah Reader',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
        content: 'Would love to see more examples of state management in React Native.',
        date: 'May 17, 2023',
        likes: 2
      }
    ]
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Current User', // In a real app, use logged in user's name
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        content: newComment,
        date: 'Just now',
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 } 
        : comment
    ));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cover Image */}
        <Image 
          source={{ uri: post.coverImage }} 
          style={styles.coverImage}
          resizeMode="cover"
        />

        {/* Post Content */}
        <View style={styles.contentContainer}>
          {/* Tags and Categories */}
          <View style={styles.tagsContainer}>
            {post.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.categoriesContainer}>
            {post.categories.map(category => (
              <View key={category} style={styles.category}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>

          {/* Title and Metadata */}
          <Text style={styles.title}>{post.title}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.date}>{post.date}</Text>
            <Text style={styles.readTime}>{post.readTime}</Text>
          </View>

          {/* Author Info */}
          <View style={styles.authorContainer}>
            <Image 
              source={{ uri: post.author.avatar }} 
              style={styles.avatar}
            />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{post.author.name}</Text>
              <Text style={styles.authorBio}>{post.author.bio}</Text>
            </View>
          </View>

          {/* Post Content */}
          <Text style={styles.content}>{post.content}</Text>

          {/* Comments Section */}
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsTitle}>Commentaires ({post.comments.length + comments.length})</Text>
          </View>

          {/* Comments List */}
          {[...post.comments, ...comments].map(comment => (
            <View key={comment.id} style={styles.commentContainer}>
              <Image 
                source={{ uri: comment.avatar }} 
                style={styles.commentAvatar}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthor}>{comment.author}</Text>
                  <Text style={styles.commentDate}>{comment.date}</Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
                <TouchableOpacity 
                  style={styles.likeButton}
                  onPress={() => handleLikeComment(comment.id)}
                >
                  <AntDesign name="like2" size={16} color="#666" />
                  <Text style={styles.likeCount}>{comment.likes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Comment Form */}
      <View style={styles.commentFormContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Ajouter un commentaire..."
          placeholderTextColor="#999"
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity 
          style={styles.commentButton}
          onPress={handleAddComment}
          disabled={!newComment.trim()}
        >
          <MaterialIcons 
            name="send" 
            size={24} 
            color={newComment.trim() ? '#06803A' : '#ccc'} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 80,
    marginTop: 40,
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#eaffe6ff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#06803A',
    fontSize: 12,
    fontWeight: '500',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  category: {
    backgroundColor: '#fff3e6ff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    color: '#F59B21',
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    lineHeight: 32,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
  readTime: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
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
  authorBio: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 32,
  },
  commentsHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#999',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  commentFormContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    fontSize: 14,
    color: '#333',
  },
  commentButton: {
    marginLeft: 8,
    padding: 8,
  },
});

export default BlogDetailScreen;