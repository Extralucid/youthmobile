import Fonts from "@/constants/Fonts";
import React, { useEffect, useState } from "react";
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

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [finger, setFinger] = useState(null);
  const [identifiant, setIdentifiant] = React.useState("");
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

  async function redirect() {
    if (identifiant === "" || password === "") {
      setMessage("Remplissez tous les champs !");
      onToggleSnackBar();
    } else {
      if (
        identifiant === "honore.ouedraogo@maqom.org" ||
        identifiant === "75552635"
      ) {
        await login();
      } else {
        setMessage("Acces incorrecte !");
        onToggleSnackBar();
      }
    }
  }

  const goToRegister = async () => {
    router.replace("/auth/signup");
  };

  const goToForgot = async () => {
    router.replace("/auth/forgetPassword");
  };

  const scanFingerprint = async () => {
    const email = await AsyncStorage.getItem("email");
    const pwd = await AsyncStorage.getItem("pwd");

    // if (!email || !pwd) return;

    let result = await LocalAuthentication.authenticateAsync();
    console.log("Scan Result:", result);
    //setFinger(JSON.stringify(result));
    if (result.success === true) {
      await loginWithFingerPrint(email, pwd);
    }
  };

  async function login() {
    router.replace("/onboarding/categories");
    // setLoading(true);
    // const url = 'https://gesmuttest.menet.ci:5482/api/v1/signin';
    // return fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: identifiant,
    //     password: password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then(async (responseData) => {
    //     if (responseData.status == 'Success') {
    //       const name = responseData.data.original.adherent.anom;
    //       const prenoms = responseData.data.original.adherent.aprenom;
    //       const genre = responseData.data.original.adherent.asexe;
    //       const id = responseData.data.original.adherent.aid;
    //       const photo = responseData.data.original.adherent.aphoto;
    //       const token = responseData.data.original.token;
    //       await AsyncStorage.setItem('nom', name);
    //       await AsyncStorage.setItem('prenoms', prenoms);
    //       await AsyncStorage.setItem('genre', genre);
    //       await AsyncStorage.setItem('id', String(id));
    //       await AsyncStorage.setItem('email', responseData.data.original.user.email);
    //       await AsyncStorage.setItem('pwd', password);
    //       await AsyncStorage.setItem('token', token);
    //       await AsyncStorage.setItem('aphoto', photo);
    //       await setObjectValue(responseData.data.original.adherent);
    //       // console.log('data saved connexion')
    //       setLoading(false);
    //       //navigation.navigate('Tabs');
    //     } else if (responseData.status == 'Error') {
    //       setMessage('Accès incorrects');
    //       setLoading(false);
    //       onToggleSnackBar();
    //     }
    //   })
    //   .catch((error) => {
    //     if (error === 'Network request failed') {
    //       setMessage("L'application est indisponible");
    //       setLoading(false);
    //       onToggleSnackBar();
    //     }
    //   });
  }

  async function loginWithFingerPrint(email: string, password: string) {
    // if (email && password) {
    //   setLoading(true);
    //   const url = '/';
    //   return fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then(async (responseData) => {
    //       if (responseData.status == 'Success') {
    //         const name = responseData.data.original.adherent.anom;
    //         const prenoms = responseData.data.original.adherent.aprenom;
    //         const genre = responseData.data.original.adherent.asexe;
    //         const id = responseData.data.original.adherent.aid;
    //         const photo = responseData.data.original.adherent.aphoto;
    //         const token = responseData.data.original.token;
    //         await AsyncStorage.setItem('nom', name);
    //         await AsyncStorage.setItem('prenoms', prenoms);
    //         await AsyncStorage.setItem('genre', genre);
    //         await AsyncStorage.setItem('id', String(id));
    //         await AsyncStorage.setItem('email', responseData.data.original.user.email);
    //         await AsyncStorage.setItem('pwd', password);
    //         await AsyncStorage.setItem('token', token);
    //         await AsyncStorage.setItem('aphoto', photo);
    //         await setObjectValue(responseData.data.original.adherent);
    //         console.log('data saved connexion');
    //         setLoading(false);
    //         //navigation.navigate('Tabs');
    //       } else if (responseData.status == 'Error') {
    //         setMessage('Accès incorrects');
    //         setLoading(false);
    //         onToggleSnackBar();
    //       }
    //     })
    //     .catch((error) => {
    //       if (error === 'Network request failed') {
    //         setMessage("L'application est indisponible");
    //         setLoading(false);
    //         onToggleSnackBar();
    //       }
    //     });
    // } else {
    //   setMessage('Veuillez vous connecter au moins une fois avec vos identifiants');
    //   console.log(email);
    //   console.log(password);
    //   onToggleSnackBar();
    // }
  }
  useEffect(() => {
    scanFingerprint();
  });

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

            {/* Email/Phone Input */}
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
                value={identifiant}
                onChangeText={(text) => setIdentifiant(text)}
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

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={goToForgot}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgetPasswordText}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={redirect}>
              <Text style={styles.loginButtonText}>Se connecter</Text>
            </TouchableOpacity>

            {/* Fingerprint */}
            <View style={styles.print}>
              <MaterialCommunityIcons
                name="fingerprint"
                color="#000"
                size={55}
                onPress={scanFingerprint}
              />
              <Text style={styles.fingerprintText}>
                Se connecter par empreinte digitale
              </Text>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Ou</Text>
              <View style={styles.divider} />
            </View>

            {/* Sign Up Link */}
            <TouchableOpacity onPress={goToRegister}>
              <Text style={styles.signInLink}>Inscrivez-vous</Text>
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
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgetPasswordText: {
    color: "#F59B21",
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#F59B21",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: Fonts.type.semi,
    fontSize: 16,
  },
  print: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  fingerprintText: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    marginTop: 8,
    color: "#666",
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
  signInLink: {
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
