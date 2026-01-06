import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
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
// @ts-ignore
import ChipInput from "react-native-chip-input";

const CreateJobScreen = () => {
  const [job, setJob] = useState<{
    employer: {
      name: string;
      logo: string;
      about: string;
      website: string;
      founded: string;
      employees: string;
      industry: string;
      headquarters: string;
    };
    title: string;
    type: string;
    location: string;
    salary: string;
    skills: string[];
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
  }>({
    employer: {
      name: "",
      logo: "",
      about: "",
      website: "",
      founded: "",
      employees: "",
      industry: "",
      headquarters: "",
    },
    title: "",
    type: "Full-time",
    location: "",
    salary: "",
    skills: [],
    description: "",
    responsibilities: [],
    requirements: [],
    benefits: [],
  });

  const [newResponsibility, setNewResponsibility] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  const pickLogo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setJob({
        ...job,
        employer: {
          ...job.employer,
          logo: result.assets[0].uri,
        },
      });
    }
  };

  const addResponsibility = () => {
    if (!newResponsibility.trim()) return;

    setJob({
      ...job,
      responsibilities: [...job.responsibilities, newResponsibility],
    });
    setNewResponsibility("");
  };

  const addRequirement = () => {
    if (!newRequirement.trim()) return;

    setJob({
      ...job,
      requirements: [...job.requirements, newRequirement],
    });
    setNewRequirement("");
  };

  const addBenefit = () => {
    if (!newBenefit.trim()) return;

    setJob({
      ...job,
      benefits: [...job.benefits, newBenefit],
    });
    setNewBenefit("");
  };

  const removeItem = (
    arrayName: "responsibilities" | "requirements" | "benefits",
    index: number
  ) => {
    setJob({
      ...job,
      [arrayName]: job[arrayName].filter((_, i) => i !== index),
    });
  };

  const submitJob = () => {
    if (!job.title || !job.description || !job.employer.name) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    console.log("Submitting job:", job);
    Alert.alert("Success", "Job posted successfully!");
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
        <Text style={styles.title}>Créer une Offre</Text>
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
          {/* Employer Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Information de l&apos;employeur
            </Text>

            <TouchableOpacity style={styles.logoContainer} onPress={pickLogo}>
              {job.employer.logo ? (
                <Image
                  source={{ uri: job.employer.logo }}
                  style={styles.logo}
                />
              ) : (
                <View style={styles.logoPlaceholder}>
                  <Ionicons name="add-circle" size={30} color="#888" />
                  <Text style={styles.logoText}>Ajouter un Logo</Text>
                </View>
              )}
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Raison sociale"
              value={job.employer.name}
              onChangeText={(text) =>
                setJob({
                  ...job,
                  employer: {
                    ...job.employer,
                    name: text,
                  },
                })
              }
            />
            <Text style={styles.label}>A propos</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="A propos"
              multiline
              numberOfLines={3}
              value={job.employer.about}
              onChangeText={(text) =>
                setJob({
                  ...job,
                  employer: {
                    ...job.employer,
                    about: text,
                  },
                })
              }
            />

            <View style={styles.row}>
              <View
                style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}
              >
                <Text style={styles.label}>Site Web</Text>
                <TextInput
                  style={styles.input}
                  placeholder="https://company.com"
                  value={job.employer.website}
                  onChangeText={(text) =>
                    setJob({
                      ...job,
                      employer: {
                        ...job.employer,
                        website: text,
                      },
                    })
                  }
                />
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.label}>Créée</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Annee"
                  value={job.employer.founded}
                  onChangeText={(text) =>
                    setJob({
                      ...job,
                      employer: {
                        ...job.employer,
                        founded: text,
                      },
                    })
                  }
                />
              </View>
            </View>

            <View style={styles.row}>
              <View
                style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}
              >
                <Text style={styles.label}>Employés</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 50-100, 500+"
                  value={job.employer.employees}
                  onChangeText={(text) =>
                    setJob({
                      ...job,
                      employer: {
                        ...job.employer,
                        employees: text,
                      },
                    })
                  }
                />
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.label}>Industrie</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Industrie"
                  value={job.employer.industry}
                  onChangeText={(text) =>
                    setJob({
                      ...job,
                      employer: {
                        ...job.employer,
                        industry: text,
                      },
                    })
                  }
                />
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Localisation du siege"
              value={job.employer.headquarters}
              onChangeText={(text) =>
                setJob({
                  ...job,
                  employer: {
                    ...job.employer,
                    headquarters: text,
                  },
                })
              }
            />
          </View>

          {/* Job Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details de l&apos;offre</Text>

            <TextInput
              style={styles.input}
              placeholder="Titre (e.g., React Native Developer)"
              value={job.title}
              onChangeText={(text) => setJob({ ...job, title: text })}
            />

            <View style={styles.row}>
              <View
                style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}
              >
                <Text style={styles.label}>Type d&apos;offre</Text>
                <Picker
                  selectedValue={job.type}
                  style={styles.picker}
                  onValueChange={(itemValue) =>
                    setJob({ ...job, type: itemValue })
                  }
                >
                  <Picker.Item label="Temps plein" value="Full-time" />
                  <Picker.Item label="Partiel" value="Part-time" />
                  <Picker.Item label="Contrat" value="Contract" />
                  <Picker.Item label="Stage" value="Internship" />
                  <Picker.Item label="Temporaire" value="Temporary" />
                </Picker>
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.label}>Lieu</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Distance"
                  value={job.location}
                  onChangeText={(text) => setJob({ ...job, location: text })}
                />
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Interval salaire (e.g., $1200 - $1500)"
              value={job.salary}
              onChangeText={(text) => setJob({ ...job, salary: text })}
            />

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Competences requises</Text>
              <ChipInput
                values={job.skills}
                onAddChip={(chip: string) =>
                  setJob({ ...job, skills: [...job.skills, chip] })
                }
                onRemoveChip={(_chip: string, index: number) =>
                  setJob({
                    ...job,
                    skills: job.skills.filter((_, i) => i !== index),
                  })
                }
                placeholder="Ajouter les competences"
                chipStyle={styles.chip}
                chipTextStyle={styles.chipText}
                inputStyle={styles.chipInput}
              />
            </View>

            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Description"
              multiline
              numberOfLines={6}
              value={job.description}
              onChangeText={(text) => setJob({ ...job, description: text })}
            />
          </View>

          {/* Responsibilities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsabilités</Text>

            {job.responsibilities.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listItemText}>• {item}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem("responsibilities", index)}
                >
                  <Ionicons name="close" size={18} color="#ff4444" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.addItemContainer}>
              <TextInput
                style={[styles.input, styles.addItemInput]}
                placeholder="Ajouter"
                value={newResponsibility}
                onChangeText={setNewResponsibility}
                onSubmitEditing={addResponsibility}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={addResponsibility}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Requirements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pré-requis</Text>

            {job.requirements.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listItemText}>• {item}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem("requirements", index)}
                >
                  <Ionicons name="close" size={18} color="#ff4444" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.addItemContainer}>
              <TextInput
                style={[styles.input, styles.addItemInput]}
                placeholder="Ajouter"
                value={newRequirement}
                onChangeText={setNewRequirement}
                onSubmitEditing={addRequirement}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={addRequirement}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Avantages</Text>

            {job.benefits.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listItemText}>• {item}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem("benefits", index)}
                >
                  <Ionicons name="close" size={18} color="#ff4444" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.addItemContainer}>
              <TextInput
                style={[styles.input, styles.addItemInput]}
                placeholder="Ajouter"
                value={newBenefit}
                onChangeText={setNewBenefit}
                onSubmitEditing={addBenefit}
              />
              <TouchableOpacity style={styles.addButton} onPress={addBenefit}>
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={submitJob}>
            <Text style={styles.submitButtonText}>Envoyer l&apos;offre</Text>
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
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  logoPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    marginTop: 10,
    fontFamily: Fonts.type.primary,
    color: "#888",
    fontSize: 12,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: "#666",
    fontSize: 14,
    fontFamily: Fonts.type.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: Fonts.type.primary,
    backgroundColor: "#fff",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  chip: {
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
  },
  chipInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: Fonts.type.primary,
    backgroundColor: "#fff",
    minHeight: 50,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listItemText: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.type.primary,
    color: "#333",
  },
  removeButton: {
    marginLeft: 10,
  },
  addItemContainer: {
    flexDirection: "row",
    marginTop: 10,
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

export default CreateJobScreen;
