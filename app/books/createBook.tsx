import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
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

const AddBookScreen = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    coverImage: "",
    price: "",
    rating: "",
    category: "",
    description: "",
    pages: "",
    publisher: "",
    publishedDate: new Date(),
    isbn: "",
    language: "English",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setBook({ ...book, coverImage: result.assets[0].uri });
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || book.publishedDate;
    setShowDatePicker(Platform.OS === "ios");
    setBook({ ...book, publishedDate: currentDate });
  };

  const submitBook = () => {
    if (!book.title || !book.author || !book.coverImage || !book.isbn) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const formattedBook = {
      ...book,
      price: parseFloat(book.price),
      rating: parseFloat(book.rating),
      pages: parseInt(book.pages),
      publishedDate: book.publishedDate.toISOString().split("T")[0],
    };

    console.log("Submitting book:", formattedBook);
    Alert.alert("Success", "Book added successfully!");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouveau Livre</Text>
        <TouchableOpacity onPress={submitBook}>
          <Ionicons name="checkmark" size={28} color="#06803A" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Cover Image */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Image de couverture</Text>
            <TouchableOpacity
              style={styles.coverImageContainer}
              onPress={pickCoverImage}
            >
              {book.coverImage ? (
                <Image
                  source={{ uri: book.coverImage }}
                  style={styles.coverImage}
                />
              ) : (
                <View style={styles.coverImagePlaceholder}>
                  <View style={styles.uploadIcon}>
                    <Ionicons
                      name="cloud-upload-outline"
                      size={40}
                      color="#06803A"
                    />
                  </View>
                  <Text style={styles.coverImageText}>
                    Touchez pour ajouter une image
                  </Text>
                  <Text style={styles.coverImageHint}>
                    Ratio recommandé: 2:3
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Basic Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations de base</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Titre *</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez le titre du livre"
                placeholderTextColor="#999"
                value={book.title}
                onChangeText={(text) => setBook({ ...book, title: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Auteur *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom de l'auteur"
                placeholderTextColor="#999"
                value={book.author}
                onChangeText={(text) => setBook({ ...book, author: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ISBN *</Text>
              <TextInput
                style={styles.input}
                placeholder="9781234567890"
                placeholderTextColor="#999"
                value={book.isbn}
                onChangeText={(text) => setBook({ ...book, isbn: text })}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Décrivez le livre..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={book.description}
                onChangeText={(text) => setBook({ ...book, description: text })}
              />
            </View>
          </View>

          {/* Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Détails du livre</Text>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Prix ($)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="12.99"
                  placeholderTextColor="#999"
                  value={book.price}
                  onChangeText={(text) => setBook({ ...book, price: text })}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Note</Text>
                <TextInput
                  style={styles.input}
                  placeholder="4.5"
                  placeholderTextColor="#999"
                  value={book.rating}
                  onChangeText={(text) => setBook({ ...book, rating: text })}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Pages</Text>
                <TextInput
                  style={styles.input}
                  placeholder="336"
                  placeholderTextColor="#999"
                  value={book.pages}
                  onChangeText={(text) => setBook({ ...book, pages: text })}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Langue</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={book.language}
                    onValueChange={(itemValue) =>
                      setBook({ ...book, language: itemValue })
                    }
                    style={styles.picker}
                  >
                    <Picker.Item label="English" value="English" />
                    <Picker.Item label="Français" value="French" />
                    <Picker.Item label="Español" value="Spanish" />
                    <Picker.Item label="Deutsch" value="German" />
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Catégorie</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: Thriller, Romance, Science-Fiction..."
                placeholderTextColor="#999"
                value={book.category}
                onChangeText={(text) => setBook({ ...book, category: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Éditeur</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom de l'éditeur"
                placeholderTextColor="#999"
                value={book.publisher}
                onChangeText={(text) => setBook({ ...book, publisher: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date de publication</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={20} color="#06803A" />
                <Text style={styles.dateButtonText}>
                  {book.publishedDate.toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={book.publishedDate}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={submitBook}>
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.submitButtonText}>Publier le livre</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: "#06803A",
    padding: 24,
    marginBottom: 16,
  },

  section: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 16,
  },
  coverImageContainer: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverImagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  uploadIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e6fff0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  coverImageText: {
    fontSize: 16,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 8,
  },
  coverImageHint: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  pickerContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  dateButtonText: {
    marginLeft: 12,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
    flex: 1,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06803A",
    marginHorizontal: 16,
    marginBottom: 40,
    padding: 18,
    borderRadius: 16,
    shadowColor: "#06803A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    marginLeft: 8,
  },
});

export default AddBookScreen;
