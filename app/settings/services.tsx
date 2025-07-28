import McText from '@/components/McText/McText';
import McVectorIcon from '@/components/McVectorIcon/McVectorIcon';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Calculate card width based on screen width
const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const CARD_WIDTH = (width - (CARD_GAP * 4)) / 3; // 3 cards with gaps on both sides

type ServiceCardProps = {
    icon: React.ReactNode;
    title: string;
    href: string;
};

const ServicesScreen = () => {
    const services = [
        {
            title: 'Offres',
            icon: 'FontAwesome',
            name: "briefcase",
            size: 24,
            href: '/offre'
        },
        {
            title: 'Blogs',
            icon: 'FontAwesome5',
            name: "newspaper",
            size: 24,
            href: '/blog'
        },
        {
            title: 'Tutoriels',
            icon: 'FontAwesome',
            name: "graduation-cap",
            size: 24,
            href: '/tutorials'
        },
        {
            title: 'Podcasts',
            icon: 'FontAwesome',
            name: "podcast",
            size: 24,
            href: '/podcast'
        },
        {
            title: 'Chat',
            icon: 'MaterialIcons',
            name: "support-agent",
            size: 24,
            href: '/chat'
        },
        {
            title: 'Livres',
            icon: 'MaterialCommunityIcons',
            name: "bullhorn",
            size: 24,
            href: '/books'
        },
        {
            title: 'Forums',
            icon: 'MaterialIcons',
            name: "design-services",
            size: 24,
            href: '/forum'
        },
        {
            title: 'Entreprises',
            icon: 'MaterialIcons',
            name: "apps",
            size: 24,
            href: '/settings/entreprises'
        },
        {
            title: 'Universités',
            icon: 'MaterialIcons',
            name: "account-balance",
            size: 24,
            href: '/settings/universites'
        }
    ];

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.header}>Nos Services</Text>

            <View style={styles.grid}>
                {services.map((service, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={()=>{router.navigate(service.href)}}
                        style={{
                            height: 102, width: CARD_WIDTH
                        }}>
                        <View
                            style={{
                                width: 80,
                                height: 72,
                                borderRadius: 12,
                                backgroundColor: '#f7dfc9ff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                ...styles.boxItems
                            }}>
                            {/* <McImage source={item.img} /> */}
                            <McVectorIcon
                                type={service.icon}
                                size={service.size}
                                name={service.name}
                                color='#3A4276'
                            />
                        </View>
                        <McText
                            semi
                            size={10}
                            color='#7B7F9E'
                            style={{
                                marginTop: 6,
                                width: 52,
                                textAlign: 'center',
                            }}>
                            {service.title}
                        </McText>
                    </TouchableOpacity>

                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: CARD_GAP,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        paddingBottom: 20,
        marginTop: 40,
        marginLeft: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        paddingHorizontal: 4,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    boxItems: {
        shadowOffset: {
            width: 3,
            height: 0,
        },
        shadowColor: '#746a6aff',
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 4,
    },
   
});

export default ServicesScreen;