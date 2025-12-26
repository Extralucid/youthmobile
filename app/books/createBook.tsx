import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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

const AddBookScreen = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        coverImage: '',
        price: '',
        rating: '',
        category: '',
        description: '',
        pages: '',
        publisher: '',
        publishedDate: new Date(),
        isbn: '',
        language: 'English'
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const pickCoverImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 3], // Standard book aspect ratio
            quality: 1,
        });

        if (!result.canceled) {
            setBook({ ...book, coverImage: result.assets[0].uri });
        }
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || book.publishedDate;
        setShowDatePicker(Platform.OS === 'ios');
        setBook({ ...book, publishedDate: currentDate });
    };

    const submitBook = () => {
        if (!book.title || !book.author || !book.coverImage || !book.isbn) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }

        const formattedBook = {
            ...book,
            price: parseFloat(book.price),
            rating: parseFloat(book.rating),
            pages: parseInt(book.pages),
            publishedDate: book.publishedDate.toISOString().split('T')[0]
        };

        console.log('Submitting book:', formattedBook);
        Alert.alert('Success', 'Book added successfully!');
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
                    <Text style={styles.title}>Ajouter un document</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconButton} >
                            <Ionicons name="menu" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Cover Image */}
                <TouchableOpacity
                    style={styles.coverImageContainer}
                    onPress={pickCoverImage}
                >
                    {book.coverImage ? (
                        <Image source={{ uri: book.coverImage }} style={styles.coverImage} />
                    ) : (
                        <View style={styles.coverImagePlaceholder}>
                            <Ionicons name="add-circle" size={30} color="#888" />
                            <Text style={styles.coverImageText}> Image de couverture</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Basic Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Information de base</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Titre"
                        value={book.title}
                        onChangeText={(text) => setBook({ ...book, title: text })}
                    />
                    <Text style={styles.label}></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Auteur"
                        value={book.author}
                        onChangeText={(text) => setBook({ ...book, author: text })}
                    />
                    <Text style={styles.label}></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ISBN"
                        value={book.isbn}
                        onChangeText={(text) => setBook({ ...book, isbn: text })}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}></Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder="Description"
                        multiline
                        numberOfLines={4}
                        value={book.description}
                        onChangeText={(text) => setBook({ ...book, description: text })}
                    />
                </View>

                {/* Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Details du document</Text>

                    <View style={styles.row}>
                        <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                            <Text style={styles.label}>Prix ($)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="12.99"
                                value={book.price}
                                onChangeText={(text) => setBook({ ...book, price: text })}
                                keyboardType="decimal-pad"
                            />
                        </View>

                        <View style={[styles.inputContainer, { flex: 1 }]}>
                            <Text style={styles.label}>Vote</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="4.5"
                                value={book.rating}
                                onChangeText={(text) => setBook({ ...book, rating: text })}
                                keyboardType="decimal-pad"
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                            <Text style={styles.label}>Pages</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="336"
                                value={book.pages}
                                onChangeText={(text) => setBook({ ...book, pages: text })}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={[styles.inputContainer, { flex: 1 }]}>
                            <Text style={styles.label}>Langues</Text>
                            <Picker
                                selectedValue={book.language}
                                style={styles.picker}
                                onValueChange={(itemValue) => setBook({ ...book, language: itemValue })}
                            >
                                <Picker.Item label="English" value="English" />
                                <Picker.Item label="Spanish" value="Spanish" />
                                <Picker.Item label="French" value="French" />
                                <Picker.Item label="German" value="German" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Categories</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Thriller"
                            value={book.category}
                            onChangeText={(text) => setBook({ ...book, category: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Publisher</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Celadon Books"
                            value={book.publisher}
                            onChangeText={(text) => setBook({ ...book, publisher: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}> Date de Publication</Text>
                        <TouchableOpacity
                            style={styles.datePickerButton}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar" size={20} color="#06803A" />
                            <Text style={styles.datePickerText}>
                                {book.publishedDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={book.publishedDate}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                            />
                        )}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={submitBook}
                >
                    <Text style={styles.submitButtonText}>Ajouter un document</Text>
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
    coverImageContainer: {
        width: '40%',
        aspectRatio: 2 / 3,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    coverImage: {
        width: '100%',
        height: '100%',
    },
    coverImagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverImageText: {
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
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
    row: {
        flexDirection: 'row',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    datePickerText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
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

export default AddBookScreen;