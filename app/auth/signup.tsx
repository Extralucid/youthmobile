import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
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
import { Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [finger, setFinger] = useState(null);
  const [email, setEmail] = React.useState("");
  const [unom, setUnom] = React.useState("");
  const [uprenom, setUprenom] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const AffichePassword = () => {
    setShowPassword(!showPassword);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function redirect() {
    if (phone === "" || password === "") {
      setMessage("Remplissez tous les champs !");
      onToggleSnackBar();
    } else {
      await login();
    }
  }

  const goToLogin = async () => {
    router.replace("/auth/login");
    //router.replace('/onboarding/categories');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const goToHome = async () => {
    //router.replace('/onboarding/categories');
  };

  const goToCodeOTP = async () => {
    console.log("Navigating to Code OTP Screen");
    router.replace("/auth/codeOTP");
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
            <Text style={styles.title}>YouthConnekt Burkina</Text>

            {/* Nom Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nom"
                placeholderTextColor="#999"
                value={unom}
                onChangeText={(text) => setUnom(text)}
                autoCapitalize="words"
              />
            </View>

            {/* Prénom Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Prénom(s)"
                placeholderTextColor="#999"
                value={uprenom}
                onChangeText={(text) => setUprenom(text)}
                autoCapitalize="words"
              />
            </View>

            {/* Téléphone Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Téléphone"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Adresse mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#999"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={AffichePassword}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Signup Button */}
            <TouchableOpacity style={styles.signupButton} onPress={goToCodeOTP}>
              <Text style={styles.signupButtonText}>S&apos;inscrire</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Ou</Text>
              <View style={styles.divider} />
            </View>

            {/* Login Link */}
            <TouchableOpacity onPress={goToLogin}>
              <Text style={styles.loginLink}>Connectez-vous</Text>
            </TouchableOpacity>

            {/* Loading Overlay */}
            {loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#F59B21" />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Compris",
          onPress: () => {
            onToggleSnackBar();
          },
        }}
      >
        {message}
      </Snackbar>
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
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    paddingHorizontal: 16,
    width: "100%",
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
  signupButton: {
    backgroundColor: "#F59B21",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
    marginBottom: 24,
  },
  signupButtonText: {
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
    textAlign: "center",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    opacity: 0.8,
  },
});
