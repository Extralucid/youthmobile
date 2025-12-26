import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
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
    View
} from 'react-native';

const CreateTutorialScreen = () => {
    const [tutorial, setTutorial] = useState({
        title: '',
        description: '',
        thumbnail: '',
        duration: '',
        difficulty: 'Beginner',
        sections: [],
        resources: []
    });

    const [newSection, setNewSection] = useState({
        title: '',
        type: 'video',
        duration: '',
        contentUrl: ''
    });

    const [newResource, setNewResource] = useState({
        title: '',
        url: ''
    });

    const [showSectionForm, setShowSectionForm] = useState(false);
    const [showResourceForm, setShowResourceForm] = useState(false);
    const [date, setDate] = useState(new Date());

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setTutorial({ ...tutorial, thumbnail: result.assets[0].uri });
        }
    };

    const addSection = () => {
        if (!newSection.title || !newSection.contentUrl) {
            Alert.alert('Error', 'Please fill all required fields for the section');
            return;
        }

        setTutorial({
            ...tutorial,
            sections: [...tutorial.sections, { ...newSection, id: Date.now().toString() }]
        });
        setNewSection({
            title: '',
            type: 'video',
            duration: '',
            contentUrl: ''
        });
        setShowSectionForm(false);
    };

    const addResource = () => {
        if (!newResource.title || !newResource.url) {
            Alert.alert('Error', 'Please fill all required fields for the resource');
            return;
        }

        setTutorial({
            ...tutorial,
            resources: [...tutorial.resources, newResource]
        });
        setNewResource({
            title: '',
            url: ''
        });
        setShowResourceForm(false);
    };

    const submitTutorial = () => {
        if (!tutorial.title || !tutorial.description) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }

        console.log('Submitting tutorial:', tutorial);
        Alert.alert('Success', 'Tutorial created successfully!');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>

                <>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Créer un Tutoriel</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => router.navigate('/tutorials/createTutorial')}>
                            <Ionicons name="menu" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Thumbnail Upload */}
                <TouchableOpacity style={styles.thumbnailContainer} onPress={pickImage}>
                    {tutorial.thumbnail ? (
                        <Image source={{ uri: tutorial.thumbnail }} style={styles.thumbnail} />
                    ) : (
                        <View style={styles.thumbnailPlaceholder}>
                            <Ionicons name="image" size={30} color="#888" />
                            <Text style={styles.thumbnailText}>Ajouter une couverture</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Basic Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Information de base</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Titre "
                        value={tutorial.title}
                        onChangeText={(text) => setTutorial({ ...tutorial, title: text })}
                    />
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder="Description"
                        multiline
                        numberOfLines={4}
                        value={tutorial.description}
                        onChangeText={(text) => setTutorial({ ...tutorial, description: text })}
                    />

                    <View style={styles.row}>
                        <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                            <Text style={styles.label}>Duré</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="4h 30m"
                                value={tutorial.duration}
                                onChangeText={(text) => setTutorial({ ...tutorial, duration: text })}
                            />
                        </View>

                        <View style={[styles.inputContainer, { flex: 1 }]}>
                            <Text style={styles.label}>Difficulté</Text>
                            <Picker
                                selectedValue={tutorial.difficulty}
                                style={styles.picker}
                                onValueChange={(itemValue) => setTutorial({ ...tutorial, difficulty: itemValue })}
                            >
                                <Picker.Item label="Debutant" value="Beginner" />
                                <Picker.Item label="Intermediaire" value="Intermediate" />
                                <Picker.Item label="Advancé" value="Advanced" />
                            </Picker>
                        </View>
                    </View>
                </View>

                {/* Sections */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Sections</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => setShowSectionForm(true)}
                        >
                            <Ionicons name="add" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {tutorial.sections.map((section, index) => (
                        <View key={section.id} style={styles.listItem}>
                            <Text style={styles.listItemTitle}>{`${index + 1}. ${section.title}`}</Text>
                            <View style={styles.listItemMeta}>
                                <Text style={styles.listItemType}>{section.type}</Text>
                                {section.duration && <Text style={styles.listItemDuration}>{section.duration}</Text>}
                            </View>
                        </View>
                    ))}

                    {showSectionForm && (
                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Titre de la section"
                                value={newSection.title}
                                onChangeText={(text) => setNewSection({ ...newSection, title: text })}
                            />

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Type</Text>
                                <Picker
                                    selectedValue={newSection.type}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setNewSection({ ...newSection, type: itemValue })}
                                >
                                    <Picker.Item label="Video" value="video" />
                                    <Picker.Item label="PDF" value="pdf" />
                                    <Picker.Item label="Quiz" value="quiz" />
                                    <Picker.Item label="Article" value="article" />
                                </Picker>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Duré (e.g., 9:56)"
                                value={newSection.duration}
                                onChangeText={(text) => setNewSection({ ...newSection, duration: text })}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="URL"
                                value={newSection.contentUrl}
                                onChangeText={(text) => setNewSection({ ...newSection, contentUrl: text })}
                            />

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => setShowSectionForm(false)}
                                >
                                    <Text style={styles.buttonText}>Annuler</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={addSection}
                                >
                                    <Text style={styles.buttonText}>Ajouter</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                {/* Resources */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Ressources</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => setShowResourceForm(true)}
                        >
                            <Ionicons name="add" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {tutorial.resources.map((resource, index) => (
                        <View key={index} style={styles.listItem}>
                            <Text style={styles.listItemTitle}>{resource.title}</Text>
                            <Text style={styles.listItemUrl}>{resource.url}</Text>
                        </View>
                    ))}

                    {showResourceForm && (
                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Titre"
                                value={newResource.title}
                                onChangeText={(text) => setNewResource({ ...newResource, title: text })}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="URL"
                                value={newResource.url}
                                onChangeText={(text) => setNewResource({ ...newResource, url: text })}
                            />

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => setShowResourceForm(false)}
                                >
                                    <Text style={styles.buttonText}>Annuler</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={addResource}
                                >
                                    <Text style={styles.buttonText}>Ajouter</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={submitTutorial}
                >
                    <Text style={styles.submitButtonText}>Creer un Tutoriel</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f7',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 40,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 16,
    },
    thumbnailContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    thumbnailPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnailText: {
        marginTop: 10,
        color: '#888',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#06803A',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        color: '#666',
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
    },
    listItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listItemTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    listItemMeta: {
        flexDirection: 'row',
    },
    listItemType: {
        fontSize: 14,
        color: '#888',
        marginRight: 15,
    },
    listItemDuration: {
        fontSize: 14,
        color: '#888',
    },
    listItemUrl: {
        fontSize: 14,
        color: '#06803A',
    },
    formContainer: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#06803A',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#06803A',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default CreateTutorialScreen;