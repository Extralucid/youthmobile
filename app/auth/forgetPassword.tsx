import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
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

export default function ForgotPasswordScreen() {
  const [contact, setContact] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contactType, setContactType] = useState<"email" | "phone" | null>(
    null
  );

  const validateAndSend = () => {
    if (!contact.trim()) {
      Alert.alert(
        "Erreur",
        "Veuillez entrer votre email ou numéro de téléphone"
      );
      return;
    }

    // Déterminer si c'est un email ou un téléphone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9]{8,15}$/;

    let type: "email" | "phone";
    if (emailRegex.test(contact)) {
      type = "email";
    } else if (phoneRegex.test(contact.replace(/\s/g, ""))) {
      type = "phone";
    } else {
      Alert.alert(
        "Format invalide",
        "Veuillez entrer un email ou un numéro de téléphone valide"
      );
      return;
    }

    // Naviguer vers OTP avec les paramètres
    router.push({
      pathname: "/auth/codeOTP",
      params: {
        type: "reset",
        contact: contact,
        contactType: type,
      },
    });
  };

  const goToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Logo */}
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />

            {/* Title */}
            <Text style={styles.title}>Mot de passe oublié ?</Text>
            <Text style={styles.subtitle}>
              Entrez votre email ou numéro de téléphone pour recevoir un code de
              vérification
            </Text>

            {/* Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email ou Téléphone"
                placeholderTextColor="#999"
                value={contact}
                onChangeText={setContact}
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>

            {/* Send Button */}
            <TouchableOpacity
              style={styles.sendButton}
              onPress={validateAndSend}
            >
              <Text style={styles.sendButtonText}>Envoyer le code</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Ou</Text>
              <View style={styles.divider} />
            </View>

            {/* Back to Login */}
            <TouchableOpacity onPress={goToLogin}>
              <Text style={styles.loginLink}>Retour à la connexion</Text>
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

  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 87,
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
    width: "100%",
    marginBottom: 24,
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
  sendButton: {
    backgroundColor: "#F59B21",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  sendButtonText: {
    color: "#fff",
    fontFamily: Fonts.type.semi,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  loginLink: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#F59B21",
    textDecorationLine: "underline",
  },
});
