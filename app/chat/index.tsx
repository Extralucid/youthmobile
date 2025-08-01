// app/(tabs)/chats/index.tsx
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChatRoom } from '../types/chats';

const ChatRoomsScreen = () => {
  // Dummy data for chat rooms
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hey, how are you doing?',
      time: '10:30 AM',
      unreadCount: 2,
      isGroup: false,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: '2',
      name: 'Tech Team',
      lastMessage: 'Alice: The meeting is at 3pm',
      time: 'Yesterday',
      unreadCount: 5,
      isGroup: true,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: '3',
      name: 'Sarah Smith',
      lastMessage: 'Thanks for the help!',
      time: 'Monday',
      unreadCount: 0,
      isGroup: false,
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    }
  ]);

  const renderItem = ({ item }: { item: ChatRoom }) => (
    <Link href={{
        pathname: `/chat/conversation`,
        params: { id: item.id, other: "anything you want here" },
    }} asChild>
      <TouchableOpacity style={styles.chatItem}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatTime}>{item.time}</Text>
          </View>
          <Text style={styles.chatMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatTime: {
    color: '#999',
    fontSize: 12,
  },
  chatMessage: {
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default ChatRoomsScreen;