import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Chips } from 'react-native-material-chips';
type PreferenceItem = {
  id: string;
  name: string;
};

const SkillsScreen = () => {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const skills: PreferenceItem[] = [
    { id: 'programming', name: 'Programming' },
    { id: 'design', name: 'Design' },
    { id: 'writing', name: 'Writing' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'photography', name: 'Photography' },
    { id: 'leadership', name: 'Leadership' },
    { id: 'languages', name: 'Languages' },
    { id: 'cooking', name: 'Cooking' },
  ];

  const [items, setItems] = useState([
    { label: 'Programmation', value: '1' },
    { label: 'Design', value: '2' },
    { label: 'Romancier', value: '3' },
    { label: 'Marketing', value: '4' },
    { label: 'Photographie', value: '5' },
    { label: 'Leadership', value: '6' },
  ]);

  const [selectedValues, setSelectedValues] = useState(['1', '2']);
  // Animation values
  const scaleAnimations = skills.reduce((acc, skill) => {
    acc[skill.id] = new Animated.Value(1);
    return acc;
  }, {} as Record<string, Animated.Value>);

  // Filter categories based on search
  const filteredSkills = skills.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Load saved skills
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPrefs = await AsyncStorage.getItem('userPreferences');
        if (savedPrefs) {
          const { skills } = JSON.parse(savedPrefs);
          setSelectedSkills(skills || []);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadPreferences();
  }, []);

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  // Minimum selection requirement
  const MIN_SELECTIONS = 3;
  const totalSelections = selectedSkills.length;
  const isSubmitDisabled = totalSelections < MIN_SELECTIONS;


  const handleSubmit = async () => {
    try {
      const existingPrefs = await AsyncStorage.getItem('userPreferences');
      const preferences = existingPrefs
        ? { ...JSON.parse(existingPrefs), skills: selectedSkills }
        : { categories: [], skills: selectedSkills };

      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
      router.replace('/');
    } catch (error) {
      console.error('Failed to save preferences', error);
    }
  };

  if (isLoading) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Compétences acquises</Text>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search skills..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />

        <Text style={[styles.subtitle, { marginTop: 10 }]}>Marquez vos compétences</Text>

        <View style={styles.tagsContainer}>
          <Chips
            type="filter"
            itemVariant="outlined"
            items={items}
            setItems={setItems}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
        </View>

        {totalSelections > 0 && totalSelections < MIN_SELECTIONS && (
          <Text style={styles.minSelectionText}>
            Selectionnez au moins {MIN_SELECTIONS} competences pour continuer
          </Text>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.skipButton]}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.skipButtonText}>Sauter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Completer ses preferences</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Reuse the same styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    marginTop: 30,
    backgroundColor: '#fff',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#6200ee',
    width: 16,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedTag: {
    backgroundColor: '#F59B21',
    borderColor: '#F59B21',
  },
  tagText: {
    color: '#333',
  },
  selectedTagText: {
    color: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#F59B21',
    paddingVertical: 5,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  minSelectionText: {
    color: '#ff6b6b',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SkillsScreen;