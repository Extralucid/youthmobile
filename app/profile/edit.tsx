import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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

export default function EditProfileScreen() {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const [formData, setFormData] = useState({
    nom: "OUEDRAOGO",
    prenoms: "Honoré",
    email: "honore.ouedraogo@youth.bf",
    telephone: "+226 70 12 34 56",
    adresse: "Ouagadougou, Burkina Faso",
    bio: "Développeur passionné par les technologies web et mobile",
    dateNaissance: "15/03/1995",
    profession: "Développeur Full Stack",
  });

  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Succès", "Votre profil a été mis à jour avec succès", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }, 1000);
  };

  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    multiline = false,
    icon,
  }: any) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name={icon} size={20} color="#999" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, multiline && styles.inputMultiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modifier le profil</Text>
        <TouchableOpacity onPress={handleSave} disabled={loading}>
          <Text
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          >
            {loading ? "..." : "Enregistrer"}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require("../../assets/images/education.jpg")}
                style={styles.avatar}
                placeholder={{ blurhash }}
              />
              <TouchableOpacity style={styles.changePhotoButton}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text style={styles.changePhotoText}>Changer la photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Informations personnelles</Text>
            <InputField
              label="Nom"
              value={formData.nom}
              onChangeText={(text: string) =>
                setFormData({ ...formData, nom: text })
              }
              placeholder="Votre nom"
              icon="person-outline"
            />
            <InputField
              label="Prénoms"
              value={formData.prenoms}
              onChangeText={(text: string) =>
                setFormData({ ...formData, prenoms: text })
              }
              placeholder="Vos prénoms"
              icon="person-outline"
            />
            <InputField
              label="Date de naissance"
              value={formData.dateNaissance}
              onChangeText={(text: string) =>
                setFormData({ ...formData, dateNaissance: text })
              }
              placeholder="JJ/MM/AAAA"
              icon="calendar-outline"
            />
            <InputField
              label="Profession"
              value={formData.profession}
              onChangeText={(text: string) =>
                setFormData({ ...formData, profession: text })
              }
              placeholder="Votre profession"
              icon="briefcase-outline"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <InputField
              label="Email"
              value={formData.email}
              onChangeText={(text: string) =>
                setFormData({ ...formData, email: text })
              }
              placeholder="votre@email.com"
              keyboardType="email-address"
              icon="mail-outline"
            />
            <InputField
              label="Téléphone"
              value={formData.telephone}
              onChangeText={(text: string) =>
                setFormData({ ...formData, telephone: text })
              }
              placeholder="+226 XX XX XX XX"
              keyboardType="phone-pad"
              icon="call-outline"
            />
            <InputField
              label="Adresse"
              value={formData.adresse}
              onChangeText={(text: string) =>
                setFormData({ ...formData, adresse: text })
              }
              placeholder="Votre adresse"
              icon="location-outline"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <InputField
              label="Biographie"
              value={formData.bio}
              onChangeText={(text: string) =>
                setFormData({ ...formData, bio: text })
              }
              placeholder="Parlez-nous de vous..."
              multiline
              icon="document-text-outline"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: "#333",
  },
  saveButton: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
  },
  saveButtonDisabled: {
    color: "#ccc",
  },
  keyboardView: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  avatarSection: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#06803A",
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#F59B21",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  changePhotoText: {
    fontSize: 14,
    fontFamily: Fonts.type.semi,
    color: "#06803A",
  },
  formSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#666",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
});
