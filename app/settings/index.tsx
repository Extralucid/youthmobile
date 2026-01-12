import Fonts from "@/constants/Fonts";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    biometric: true,
    loginAlerts: true,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const toggleSwitch = (key: keyof typeof securitySettings) => {
    setSecuritySettings({
      ...securitySettings,
      [key]: !securitySettings[key],
    });
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }
    Alert.alert("Succès", "Votre mot de passe a été modifié");
    setPasswords({ current: "", new: "", confirm: "" });
    setShowPasswordModal(false);
  };

  const SecurityItem = ({
    label,
    description,
    value,
    onToggle,
    icon,
    iconColor,
  }: {
    label: string;
    description: string;
    value: boolean;
    onToggle: () => void;
    icon: string;
    iconColor: string;
  }) => (
    <View style={styles.securityItem}>
      <View style={styles.securityItemLeft}>
        <View
          style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}
        >
          <Ionicons name={icon as any} size={22} color={iconColor} />
        </View>
        <View style={styles.securityItemText}>
          <Text style={styles.securityLabel}>{label}</Text>
          <Text style={styles.securityDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#e0e0e0", true: "#A5D6A7" }}
        thumbColor={value ? "#06803A" : "#f4f3f4"}
      />
    </View>
  );

  const ActionItem = ({
    label,
    description,
    icon,
    iconColor,
    onPress,
  }: {
    label: string;
    description: string;
    icon: string;
    iconColor: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={styles.actionItemLeft}>
        <View
          style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}
        >
          <Ionicons name={icon as any} size={22} color={iconColor} />
        </View>
        <View style={styles.actionItemText}>
          <Text style={styles.actionLabel}>{label}</Text>
          <Text style={styles.actionDescription}>{description}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sécurité</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Security Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <Ionicons name="shield-checkmark" size={40} color="#06803A" />
          </View>
          <Text style={styles.statusTitle}>Compte sécurisé</Text>
          <Text style={styles.statusDescription}>
            Votre compte est protégé avec nos meilleures pratiques de sécurité
          </Text>
        </View>

        {/* Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Authentification</Text>
          <View style={styles.card}>
            {showPasswordModal ? (
              <View style={styles.passwordForm}>
                <Text style={styles.formTitle}>Changer le mot de passe</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Mot de passe actuel</Text>
                  <TextInput
                    style={styles.input}
                    value={passwords.current}
                    onChangeText={(text) =>
                      setPasswords({ ...passwords, current: text })
                    }
                    placeholder="Entrez votre mot de passe actuel"
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
                  <TextInput
                    style={styles.input}
                    value={passwords.new}
                    onChangeText={(text) =>
                      setPasswords({ ...passwords, new: text })
                    }
                    placeholder="Entrez le nouveau mot de passe"
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Confirmer le mot de passe
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={passwords.confirm}
                    onChangeText={(text) =>
                      setPasswords({ ...passwords, confirm: text })
                    }
                    placeholder="Confirmez le nouveau mot de passe"
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                </View>
                <View style={styles.formButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowPasswordModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleChangePassword}
                  >
                    <Text style={styles.confirmButtonText}>Confirmer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <ActionItem
                label="Mot de passe"
                description="Modifier votre mot de passe"
                icon="key"
                iconColor="#F59B21"
                onPress={() => setShowPasswordModal(true)}
              />
            )}
          </View>
        </View>

        {/* Security Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Options de sécurité</Text>
          <View style={styles.card}>
            <SecurityItem
              label="Authentification à deux facteurs"
              description="Ajoutez une couche de sécurité supplémentaire"
              value={securitySettings.twoFactor}
              onToggle={() => toggleSwitch("twoFactor")}
              icon="lock-closed"
              iconColor="#06803A"
            />
            <View style={styles.divider} />
            <SecurityItem
              label="Authentification biométrique"
              description="Utilisez Face ID ou Touch ID"
              value={securitySettings.biometric}
              onToggle={() => toggleSwitch("biometric")}
              icon="finger-print"
              iconColor="#2196F3"
            />
            <View style={styles.divider} />
            <SecurityItem
              label="Alertes de connexion"
              description="Recevez des notifications lors des connexions"
              value={securitySettings.loginAlerts}
              onToggle={() => toggleSwitch("loginAlerts")}
              icon="notifications"
              iconColor="#F59B21"
            />
          </View>
        </View>

        {/* Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sessions actives</Text>
          <View style={styles.card}>
            <ActionItem
              label="Appareils connectés"
              description="Gérer les appareils connectés à votre compte"
              icon="phone-portrait"
              iconColor="#9C27B0"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <ActionItem
              label="Historique de connexion"
              description="Voir l'historique de vos connexions"
              icon="time"
              iconColor="#607D8B"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zone de danger</Text>
          <TouchableOpacity style={styles.dangerCard}>
            <MaterialCommunityIcons
              name="delete-forever"
              size={24}
              color="#E53935"
            />
            <View style={styles.dangerText}>
              <Text style={styles.dangerLabel}>Supprimer le compte</Text>
              <Text style={styles.dangerDescription}>
                Cette action est irréversible
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  content: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: "#f9f9f9",
  },
  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statusIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    fontFamily: Fonts.type.primary,
    color: "#666",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  securityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  securityItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  securityItemText: {
    flex: 1,
  },
  securityLabel: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
    marginBottom: 2,
  },
  securityDescription: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  actionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  actionItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  actionItemText: {
    flex: 1,
  },
  actionLabel: {
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
  passwordForm: {
    padding: 16,
  },
  formTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    color: "#333",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: Fonts.type.semi,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  formButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#666",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#06803A",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 16,
  },
  dangerCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#FFEBEE",
  },
  dangerText: {
    flex: 1,
  },
  dangerLabel: {
    fontSize: 15,
    fontFamily: Fonts.type.semi,
    color: "#E53935",
    marginBottom: 2,
  },
  dangerDescription: {
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    color: "#999",
  },
});
