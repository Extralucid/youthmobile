import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateBlogPostScreen = () => {
  const [blogPost, setBlogPost] = useState<{
    title: string;
    content: string;
    coverImage: string;
    tags: string[];
    categories: string[];
    author: {
      name: string;
      avatar: string;
      bio: string;
    };
  }>({
    title: "",
    content: "",
    coverImage: "",
    tags: [],
    categories: [],
    author: {
      name: "",
      avatar: "",
      bio: "",
    },
  });

  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setBlogPost({ ...blogPost, coverImage: result.assets[0].uri });
    }
  };

  const pickAuthorAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setBlogPost({
        ...blogPost,
        author: {
          ...blogPost.author,
          avatar: result.assets[0].uri,
        },
      });
    }
  };

  const addTag = () => {
    if (!newTag.trim()) return;

    setBlogPost({
      ...blogPost,
      tags: [...blogPost.tags, newTag],
    });
    setNewTag("");
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;

    setBlogPost({
      ...blogPost,
      categories: [...blogPost.categories, newCategory],
    });
    setNewCategory("");
  };

  const removeTag = (index: number) => {
    setBlogPost({
      ...blogPost,
      tags: blogPost.tags.filter((_, i) => i !== index),
    });
  };

  const removeCategory = (index: number) => {
    setBlogPost({
      ...blogPost,
      categories: blogPost.categories.filter((_, i) => i !== index),
    });
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const submitBlogPost = () => {
    if (!blogPost.title || !blogPost.content || !blogPost.coverImage) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const readTime =
      Math.ceil(blogPost.content.split(" ").length / 200) + " min read";

    const finalBlogPost = {
      ...blogPost,
      date: formattedDate,
      readTime,
    };

    console.log("Submitting blog post:", finalBlogPost);
    Alert.alert("Success", "Blog post created successfully!");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Créer un article</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="menu" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Cover Image */}
          <TouchableOpacity
            style={styles.coverImageContainer}
            onPress={pickCoverImage}
          >
            {blogPost.coverImage ? (
              <Image
                source={{ uri: blogPost.coverImage }}
                style={styles.coverImage}
              />
            ) : (
              <View style={styles.coverImagePlaceholder}>
                <Ionicons name="add-circle" size={30} color="#888" />
                <Text style={styles.coverImageText}>Image de couverture</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Basic Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details de l&apos;article</Text>

            <TextInput
              style={styles.input}
              placeholder="Titre"
              value={blogPost.title}
              onChangeText={(text) => setBlogPost({ ...blogPost, title: text })}
            />

            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Contenu (Markdown supported)"
              multiline
              numberOfLines={10}
              value={blogPost.content}
              onChangeText={(text) =>
                setBlogPost({ ...blogPost, content: text })
              }
            />

            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar" size={20} color="#06803A" />
              <Text style={styles.datePickerText}>
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
          </View>

          {/* Tags & Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags & Categories</Text>

            <View style={styles.chipContainer}>
              <Text style={styles.label}>Tags</Text>
              <View style={styles.chipList}>
                {blogPost.tags.map((tag, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{tag}</Text>
                    <TouchableOpacity onPress={() => removeTag(index)}>
                      <Ionicons name="close" size={16} color="#888" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View style={styles.addItemContainer}>
                <TextInput
                  style={[styles.input, styles.addItemInput]}
                  placeholder="Ajouter un tag"
                  value={newTag}
                  onChangeText={setNewTag}
                  onSubmitEditing={addTag}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTag}>
                  <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.chipContainer, { marginTop: 15 }]}>
              <Text style={styles.label}>Categories</Text>
              <View style={styles.chipList}>
                {blogPost.categories.map((category, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{category}</Text>
                    <TouchableOpacity onPress={() => removeCategory(index)}>
                      <Ionicons name="close" size={16} color="#888" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View style={styles.addItemContainer}>
                <TextInput
                  style={[styles.input, styles.addItemInput]}
                  placeholder="Ajouter une categorie"
                  value={newCategory}
                  onChangeText={setNewCategory}
                  onSubmitEditing={addCategory}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={addCategory}
                >
                  <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Author Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Information de l&apos;auteur
            </Text>

            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={pickAuthorAvatar}
            >
              {blogPost.author.avatar ? (
                <Image
                  source={{ uri: blogPost.author.avatar }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="add-circle" size={24} color="#888" />
                  <Text style={styles.avatarText}>joindre une Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Noms de l'auteur"
              value={blogPost.author.name}
              onChangeText={(text) =>
                setBlogPost({
                  ...blogPost,
                  author: {
                    ...blogPost.author,
                    name: text,
                  },
                })
              }
            />

            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Bio de l'auteur"
              multiline
              numberOfLines={3}
              value={blogPost.author.bio}
              onChangeText={(text) =>
                setBlogPost({
                  ...blogPost,
                  author: {
                    ...blogPost.author,
                    bio: text,
                  },
                })
              }
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitBlogPost}
          >
            <Text style={styles.submitButtonText}>Publier l&apos;article</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 16,
  },
  coverImageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverImagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  coverImageText: {
    marginTop: 10,
    fontFamily: Fonts.type.primary,
    color: "#888",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    marginBottom: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: Fonts.type.primary,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  datePickerText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: Fonts.type.primary,
    color: "#333",
  },
  chipContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 8,
    color: "#666",
    fontSize: 14,
    fontFamily: Fonts.type.primary,
  },
  chipList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6fff0",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: "#06803A",
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    marginRight: 5,
  },
  addItemContainer: {
    flexDirection: "row",
  },
  addItemInput: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#06803A",
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#eee",
    borderRadius: 40,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    marginTop: 5,
    color: "#888",
    fontSize: 12,
    fontFamily: Fonts.type.primary,
  },
  submitButton: {
    backgroundColor: "#06803A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontFamily: Fonts.type.bold,
    fontSize: 18,
  },
});

export default CreateBlogPostScreen;
