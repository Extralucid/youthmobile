import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

export default function CodeOTPScreen() {
  const params = useLocalSearchParams();
  const type = params.type as string; // 'signup' ou 'reset'
  const contact = params.contact as string;
  const contactType = params.contactType as string; // 'email' ou 'phone'

  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(60);
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<TextInput>(null);

  const startTimer = useCallback(() => {
    stopTimer();
    setSecondsLeft(60);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          stopTimer();
          return 0;
        }
        return s - 1;
      });
    }, 1000) as unknown as number;
  }, []);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current as unknown as number);
      timerRef.current = null;
    }
  };

  const handleResend = () => {
    Alert.alert("Code renvoyé", "Un nouveau code a été envoyé.");
    startTimer();
  };

  const handleBack = () => {
    if (type === "reset") {
      router.push("/auth/forgetPassword");
    } else {
      router.push("/auth/signup");
    }
  };

  const handleVerify = () => {
    if (code.length < 4) {
      Alert.alert(
        "Code invalide",
        "Veuillez saisir le code reçu (4 chiffres)."
      );
      return;
    }

    // Mock verification
    if (code === "0000" || code === "1234" || code.length >= 4) {
      if (type === "reset") {
        // Naviguer vers la page de nouveau mot de passe
        router.replace("/auth/newPassword");
      } else {
        // Navigation normale pour l'inscription
        router.replace("/onboarding/categories");
      }
    } else {
      Alert.alert("Code incorrect", "Le code saisi est incorrect.");
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
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
          {/* Centered content */}
          <View style={styles.content}>
            <Text style={styles.title}>Vérification OTP</Text>
            <Text style={styles.subtitle}>
              {type === "reset"
                ? "Veuillez entrer le code que nous venons d'envoyer pour réinitialiser votre mot de passe"
                : "Veuillez entrer le code que nous venons d'envoyer à votre téléphone"}
            </Text>
            <Text style={styles.phone}>
              {contactType === "email"
                ? `${contact.substring(0, 3)}***@${contact.split("@")[1]}`
                : `+226 XX XX XX XX`}
            </Text>

            {/* OTP Input boxes */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={focusInput}
              style={styles.otpContainer}
            >
              {[0, 1, 2, 3].map((index) => (
                <View
                  key={index}
                  style={[styles.otpBox, code[index] && styles.otpBoxFilled]}
                >
                  <Text style={styles.otpText}>{code[index] || ""}</Text>
                </View>
              ))}
            </TouchableOpacity>

            {/* Hidden input for actual typing */}
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              keyboardType="number-pad"
              value={code}
              onChangeText={(t) => setCode(t.replace(/[^0-9]/g, ""))}
              maxLength={4}
              autoFocus
            />

            {/* Resend section */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                Vous n&apos;avez pas reçu le code ?
              </Text>
              <TouchableOpacity
                disabled={secondsLeft > 0}
                onPress={handleResend}
              >
                <Text
                  style={[
                    styles.resendLink,
                    secondsLeft > 0 && { opacity: 0.5 },
                  ]}
                >
                  {secondsLeft > 0
                    ? `Renvoyer dans ${secondsLeft}s`
                    : "Renvoyer le code"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Verify button */}
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerify}
            >
              <Text style={styles.verifyButtonText}>Vérifier</Text>
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
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
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
  content: {
    alignItems: "center",
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
    marginBottom: 8,
    lineHeight: 22,
  },
  phone: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#333",
    marginBottom: 48,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 32,
  },
  otpBox: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: "#A5D6A7",
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  otpBoxFilled: {
    borderColor: "#06803A",
    borderWidth: 2,
    backgroundColor: "#E8F5E9",
  },
  otpText: {
    fontSize: 26,
    fontFamily: Fonts.type.semi,
    color: "#333",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  resendText: {
    fontSize: 13,
    fontFamily: Fonts.type.primary,
    color: "#666",
    marginBottom: 8,
  },
  resendLink: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#F59B21",
  },
  verifyButton: {
    backgroundColor: "#F59B21",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  verifyButtonText: {
    color: "#fff",
    fontFamily: Fonts.type.semi,
    fontSize: 16,
  },
});
