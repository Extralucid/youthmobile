// app/chats/[id].tsx
import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { io, Socket } from "socket.io-client";
import { Message } from "../types/chats";

const ChatScreen = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const [messages, setMessages] = useState<Message[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [message, setMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  // Default names for chat rooms
  const chatNames: Record<string, string> = {
    "1": "John Doe",
    "2": "Tech Team",
    "3": "Sarah Smith",
  };

  const chatName = name || chatNames[id] || "Discussion";

  // Dummy data for messages
  const dummyMessages: Record<string, Message[]> = {
    "1": [
      { id: "1", text: "Hey there!", time: "10:00 AM", sender: "other" },
      { id: "2", text: "Hi! How are you?", time: "10:02 AM", sender: "me" },
      {
        id: "3",
        text: "I'm good, thanks for asking!",
        time: "10:05 AM",
        sender: "other",
      },
    ],
    "2": [
      {
        id: "1",
        text: "Welcome everyone to the group!",
        time: "9:00 AM",
        sender: "other",
        senderName: "Alice",
      },
      {
        id: "2",
        text: "Thanks for creating this group",
        time: "9:05 AM",
        sender: "me",
      },
      {
        id: "3",
        text: "When is our next meeting?",
        time: "9:10 AM",
        sender: "other",
        senderName: "Bob",
      },
    ],
    "3": [
      { id: "1", text: "Hi Sarah!", time: "2:00 PM", sender: "me" },
      {
        id: "2",
        text: "Hello! Can you help me with something?",
        time: "2:05 PM",
        sender: "other",
      },
      {
        id: "3",
        text: "Sure, what do you need?",
        time: "2:06 PM",
        sender: "me",
      },
    ],
  };

  useEffect(() => {
    // Initialize with dummy data
    if (1) {
      setMessages(dummyMessages[id] || []);
    }

    // Connect to Socket.io server
    socketRef.current = io("http://your-socket-server-url", {
      transports: ["websocket"],
      query: { chatId: id },
    });

    // Listen for new messages
    socketRef.current.on("newMessage", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
      scrollToBottom();
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [id]);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSend = () => {
    if (message.trim() === "" || !id) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
    };

    // In a real app, you would emit this to the server
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        chatId: id,
        message: newMessage,
      });
    }

    // For demo purposes, add to local state
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    scrollToBottom();
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.myMessage : styles.otherMessage,
      ]}
    >
      {item.sender !== "me" && item.senderName && (
        <Text style={styles.senderName}>{item.senderName}</Text>
      )}
      <View
        style={[
          styles.messageBubble,
          item.sender === "me" ? styles.myBubble : styles.otherBubble,
        ]}
      >
        <Text
          style={
            item.sender === "me"
              ? styles.myMessageText
              : styles.otherMessageText
          }
        >
          {item.text}
        </Text>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        {showSearch ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            <TouchableOpacity
              style={styles.closeSearch}
              onPress={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{chatName}</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerAction}
                onPress={() => setShowSearch(true)}
              >
                <Ionicons name="search" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontFamily: Fonts.type.primary,
    paddingVertical: 0,
  },
  closeSearch: {
    marginLeft: 8,
  },
  messagesList: {
    padding: 15,
  },
  otherMessage: {
    alignItems: "flex-start",
  },
  messageContainer: {
    marginBottom: 15,
    alignItems: "flex-start",
  },
  myMessage: {
    alignItems: "flex-end",
  },
  senderName: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginBottom: 4,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    maxWidth: "80%",
  },
  myBubble: {
    backgroundColor: "#06803A",
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "#e5e5ea",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: Fonts.type.primary,
  },
  myMessageText: {
    fontFamily: Fonts.type.primary,
    color: "#fff",
  },
  otherMessageText: {
    fontFamily: Fonts.type.primary,
    color: "#000",
  },
  messageTime: {
    fontSize: 11,
    fontFamily: Fonts.type.primary,
    color: "#999",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 40,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: Fonts.type.primary,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#06803A",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendText: {
    color: "#fff",
    fontFamily: Fonts.type.semi,
  },
});

export default ChatScreen;
