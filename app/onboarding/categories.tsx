import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type PreferenceItem = {
  id: string;
  name: string;
};

const CategoriesScreen = () => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: PreferenceItem[] = [
    { id: 'tech', name: 'Technology' },
    { id: 'sports', name: 'Sports' },
    { id: 'music', name: 'Music' },
    { id: 'art', name: 'Art' },
    { id: 'food', name: 'Food & Cooking' },
    { id: 'travel', name: 'Travel' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'business', name: 'Business' },
    { id: 'education', name: 'Education' },
    { id: 'gaming', name: 'Gaming' },
  ];

    // Animation values
  const scaleAnimations = categories.reduce((acc, category) => {
    acc[category.id] = new Animated.Value(1);
    return acc;
  }, {} as Record<string, Animated.Value>);

  // Filter categories based on search
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Load saved categories
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPrefs = await AsyncStorage.getItem('userPreferences');
        if (savedPrefs) {
          const { categories } = JSON.parse(savedPrefs);
          setSelectedCategories(categories || []);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadPreferences();
  }, []);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

    // Save preferences and navigate
  const handleSubmit = async () => {
    try {
      const preferences = {
        categories: selectedCategories,
        skills: [],
      };
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
      router.replace('/');
    } catch (error) {
      console.error('Failed to save preferences', error);
    }
  };

  const handleSkip = () => {
    router.replace('/');
  };

  // Minimum selection requirement
  const MIN_SELECTIONS = 3;
  const totalSelections = selectedCategories.length;
  const isSubmitDisabled = totalSelections < MIN_SELECTIONS;

  const handleContinue = async () => {
    try {
      const existingPrefs = await AsyncStorage.getItem('userPreferences');
      const preferences = existingPrefs 
        ? { ...JSON.parse(existingPrefs), categories: selectedCategories }
        : { categories: selectedCategories, skills: [] };
      
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
      router.push('/onboarding/skills');
    } catch (error) {
      console.error('Failed to save preferences', error);
    }
  };

  if (isLoading) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      {/* <View style={styles.progressContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.progressDot, 
              index < currentStep && styles.activeDot
            ]} 
          />
        ))}
      </View> */}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Choisissez vos Interets</Text>
        
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />

        <Text style={styles.subtitle}>Choisissez les catégories qui vous intéressent</Text>
        
        <View style={styles.tagsContainer}>
          {filteredCategories.map((category) => (
            <Animated.View 
              key={category.id}
              style={{ transform: [{ scale: scaleAnimations[category.id] }] }}
            >
              <TouchableOpacity
                style={[
                  styles.tag,
                  selectedCategories.includes(category.id) && styles.selectedTag
                ]}
                onPress={() => toggleCategory(category.id)}
              >
                <Text style={[
                  styles.tagText,
                  selectedCategories.includes(category.id) && styles.selectedTagText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {totalSelections > 0 && totalSelections < MIN_SELECTIONS && (
          <Text style={styles.minSelectionText}>
            Select at least {MIN_SELECTIONS} items to continue
          </Text>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.skipButton]}
          onPress={handleSkip}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.button,
            styles.submitButton,
            isSubmitDisabled && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={isSubmitDisabled}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitDisabled ? `Select ${MIN_SELECTIONS - totalSelections} more` : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Reuse the same styles from previous solution

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
    paddingHorizontal: 15,
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
    paddingVertical: 15,
    paddingHorizontal: 25,
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

export default CategoriesScreen;