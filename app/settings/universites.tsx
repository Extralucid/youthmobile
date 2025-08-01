import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const UniversiteScreen = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Tous');
    const [checks, setChecks] = useState([
        {
            id: 1,
            company: 'ESTA',
            logo: require('../../assets/images/hermes-logo.png'), // Replace with actual logo
            amount: 'Ouaga',
            date: 'March 13, 2018',
            category: 'Journalisme',
            status: 'En attente',
            checked: false
        },
        {
            id: 2,
            company: 'ISIG',
            logo: require('../../assets/images/philipp-plein-logo.png'),
            amount: 'Bobo',
            date: 'March 13, 2018',
            category: 'Journalisme',
            status: 'En attente',
            checked: false
        },
        {
            id: 3,
            company: 'USTA',
            logo: require('../../assets/images/loctane-logo.png'),
            amount: 'Ouaga',
            date: 'March 13, 2018',
            category: 'Journalisme',
            status: 'En attente',
            checked: false
        },
        {
            id: 4,
            company: 'UJKZ',
            logo: require('../../assets/images/kenzo-logo.png'),
            amount: 'Ouaga',
            date: 'March 13, 2018',
            status: 'En attente',
            category: 'Journalisme',
            checked: false
        }
    ]);

    const filters = ['Tous', 'Journalisme', 'Electronique', 'Informatique', 'Autres'];

    const toggleCheck = (id: number) => {
        setChecks(checks.map(check =>
            check.id === id ? { ...check, checked: !check.checked } : check
        ));
    };

    const filteredChecks = checks.filter(check => {
        const matchesSearch = check.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'Tous' || check.category === activeFilter;
        return matchesSearch && matchesFilter;
    });


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {showSearch ? (
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search checks..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus={true}
                        />
                        <TouchableOpacity
                            style={styles.closeSearch}
                            onPress={() => {
                                setShowSearch(false);
                                setSearchQuery('');
                            }}
                        >
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <Text style={styles.title}>Les Universités</Text>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => setShowSearch(true)}
                            >
                                <Ionicons name="search" size={24} color="#333" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <Ionicons name="notifications-outline" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>

            {/* Filter Chips */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterContainer}
                contentContainerStyle={styles.filterContent}
            >
                {filters.map(filter => (
                    <TouchableOpacity
                        key={filter}
                        style={[
                            styles.filterChip,
                            activeFilter === filter && styles.activeFilterChip
                        ]}
                        onPress={() => setActiveFilter(filter)}
                    >
                        <Text style={[
                            styles.filterText,
                            activeFilter === filter && styles.activeFilterText
                        ]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Check List */}
            <FlatList
                data={filteredChecks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => (
                    <Link href={`/settings/universiteDetail`} key={item.id} asChild>
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.companyInfo}>
                                <Image source={item.logo} style={styles.logo} />
                                <Text style={styles.companyName}>{item.company}</Text>
                            </View>
                            <TouchableOpacity onPress={() => toggleCheck(item.id)}>
                                <MaterialIcons
                                    name={item.checked ? "check-box" : "check-box-outline-blank"}
                                    size={24}
                                    color={item.checked ? "#4CAF50" : "#ccc"}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.details}>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Ville</Text>
                                <Text style={styles.detailValue}>{item.amount}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Rejoins le</Text>
                                <Text style={styles.detailValue}>{item.date}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Statut</Text>
                                <Text style={[
                                    styles.detailValue,
                                    item.status === 'Received' ? styles.statusReceived : styles.statusNotReceived
                                ]}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 50,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
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
    content: {
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    companyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 12,
        borderRadius: 20,
    },
    companyName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    details: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    statusReceived: {
        color: '#4CAF50',
    },
    statusNotReceived: {
        color: '#F44336',
    },
    // ... previous styles ...
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        paddingVertical: 0,
    },
    closeSearch: {
        marginLeft: 8,
    },
    filterContainer: {
        paddingVertical: 8,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    filterContent: {
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 5,
        height: 30,
        borderRadius: 16,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
    },
    activeFilterChip: {
        backgroundColor: '#4CAF50',
    },
    filterText: {
        color: '#666',
        fontSize: 14,
    },
    activeFilterText: {
        color: 'white',
        fontWeight: '500',
    },
});

export default UniversiteScreen;