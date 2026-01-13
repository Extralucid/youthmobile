import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewPasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSavePassword = () => {
    // Validation
    if (!newPassword || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert(
        "Mot de passe trop court",
        "Le mot de passe doit contenir au moins 6 caractères"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Erreur",
        "Les mots de passe ne correspondent pas. Veuillez réessayer."
      );
      return;
    }

    // Mock save - normalement on enverrait à l'API
    Alert.alert(
      "Succès",
      "Votre mot de passe a été réinitialisé avec succès !",
      [
        {
          text: "OK",
          onPress: () => router.replace("/auth/login"),
        },
      ]
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#06803A" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons name="lock-closed" size={80} color="#F59B21" />
            </View>

            <Text style={styles.title}>Créer un nouveau mot de passe</Text>
            <Text style={styles.subtitle}>
              Votre nouveau mot de passe doit être différent de l&apos;ancien
            </Text>

            {/* New Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nouveau mot de passe"
                placeholderTextColor="#999"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Password Requirements */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementTitle}>
                Le mot de passe doit contenir :
              </Text>
              <View style={styles.requirement}>
                <Ionicons
                  name={
                    newPassword.length >= 6
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={18}
                  color={newPassword.length >= 6 ? "#06803A" : "#999"}
                />
                <Text style={styles.requirementText}>
                  Au moins 6 caractères
                </Text>
              </View>
              <View style={styles.requirement}>
                <Ionicons
                  name={
                    newPassword === confirmPassword && newPassword.length > 0
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={18}
                  color={
                    newPassword === confirmPassword && newPassword.length > 0
                      ? "#06803A"
                      : "#999"
                  }
                />
                <Text style={styles.requirementText}>
                  Les mots de passe correspondent
                </Text>
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSavePassword}
            >
              <Text style={styles.saveButtonText}>
                Réinitialiser le mot de passe
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.semi,
    color: "#333",
    textAlign: "center",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
  },
  requirementsContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  requirementTitle: {
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 12,
  },
  requirement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: "#F59B21",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontFamily: Fonts.type.semi,
    fontSize: 16,
  },
});
