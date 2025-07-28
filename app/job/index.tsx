import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

type Job = {
    id: string;
    employer: {
        name: string;
        logo: string;
    };
    title: string;
    type: string; // "Full-time", "Part-time", etc.
    location: string;
    salary: string;
    skills: string[];
    posted: string; // "2d ago", "1w ago", etc.
};

const JobsScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJobType, setSelectedJobType] = useState<string | null>(null);

    // Sample job data
    const jobs: Job[] = [
        {
            id: '1',
            employer: {
                name: 'TechCorp',
                logo: 'https://logo.clearbit.com/techcorp.com'
            },
            title: 'Senior React Native Developer',
            type: 'Full-time',
            location: 'Remote',
            salary: '$120,000 - $150,000',
            skills: ['React Native', 'TypeScript', 'Redux'],
            posted: '2d ago'
        },
        {
            id: '2',
            employer: {
                name: 'DesignHub',
                logo: 'https://logo.clearbit.com/designhub.com'
            },
            title: 'UI/UX Designer',
            type: 'Contract',
            location: 'New York, NY',
            salary: '$80 - $100/hr',
            skills: ['Figma', 'Sketch', 'User Research'],
            posted: '1w ago'
        },
        {
            id: '3',
            employer: {
                name: 'DataSystems',
                logo: 'https://logo.clearbit.com/datasystems.com'
            },
            title: 'Data Scientist',
            type: 'Full-time',
            location: 'San Francisco, CA',
            salary: '$140,000 - $170,000',
            skills: ['Python', 'Machine Learning', 'SQL'],
            posted: '3d ago'
        },
        {
            id: '4',
            employer: {
                name: 'CloudNine',
                logo: 'https://logo.clearbit.com/cloudnine.com'
            },
            title: 'DevOps Engineer',
            type: 'Full-time',
            location: 'Remote',
            salary: '$130,000 - $160,000',
            skills: ['AWS', 'Docker', 'Kubernetes'],
            posted: '1d ago'
        },
        {
            id: '5',
            employer: {
                name: 'MobileFirst',
                logo: 'https://logo.clearbit.com/mobilefirst.com'
            },
            title: 'Flutter Developer',
            type: 'Part-time',
            location: 'Chicago, IL',
            salary: '$70 - $90/hr',
            skills: ['Flutter', 'Dart', 'Firebase'],
            posted: '5d ago'
        }
    ];

    // Filter jobs based on search and selected job type
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesJobType = selectedJobType ? job.type === selectedJobType : true;
        return matchesSearch && matchesJobType;
    });

    // Extract all unique job types
    const jobTypes = Array.from(new Set(jobs.map(job => job.type)));

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search jobs, companies, or skills..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                        <MaterialIcons name="clear" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Job Type Filter */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.jobTypesContainer}
            >
                <TouchableOpacity
                    style={[styles.jobType, !selectedJobType && styles.activeJobType]}
                    onPress={() => setSelectedJobType(null)}
                >
                    <Text style={[styles.jobTypeText, !selectedJobType && styles.activeJobTypeText]}>All</Text>
                </TouchableOpacity>
                {jobTypes.map(type => (
                    <TouchableOpacity
                        key={type}
                        style={[styles.jobType, selectedJobType === type && styles.activeJobType]}
                        onPress={() => setSelectedJobType(type === selectedJobType ? null : type)}
                    >
                        <Text style={[styles.jobTypeText, selectedJobType === type && styles.activeJobTypeText]}>{type}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Jobs List */}
            <ScrollView contentContainerStyle={styles.jobsContainer}>
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <Link href={`/job/jobDetail`} key={job.id} asChild>
                            <TouchableOpacity style={styles.jobCard}>
                                <View style={styles.jobHeader}>
                                    <Image
                                        source={{ uri: job.employer.logo }}
                                        style={styles.companyLogo}
                                        defaultSource={require('../../assets/images/logo.png')} // Add a default image
                                    />
                                    <View style={styles.jobMeta}>
                                        <Text style={styles.companyName}>{job.employer.name}</Text>
                                        <Text style={styles.jobLocation}>{job.location}</Text>
                                    </View>
                                    <Text style={styles.postedTime}>{job.posted}</Text>
                                </View>

                                <Text style={styles.jobTitle}>{job.title}</Text>

                                <View style={styles.salaryContainer}>
                                    <MaterialIcons name="attach-money" size={18} color="#4CAF50" />
                                    <Text style={styles.salaryText}>{job.salary}</Text>
                                </View>

                                <View style={styles.skillsContainer}>
                                    {job.skills.map(skill => (
                                        <View key={`${job.id}-${skill}`} style={styles.skillTag}>
                                            <Text style={styles.skillText}>{skill}</Text>
                                        </View>
                                    ))}
                                </View>

                                <View style={styles.jobTypeTag}>
                                    <Text style={styles.jobTypeText}>{job.type}</Text>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <MaterialIcons name="work-outline" size={50} color="#ccc" />
                        <Text style={styles.emptyStateText}>No jobs found</Text>
                        <Text style={styles.emptyStateSubtext}>Try adjusting your search or filters</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginTop: 40,
        marginBottom: 16,
        height: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
    },
    clearButton: {
        padding: 4,
    },
    jobTypesContainer: {
        paddingVertical: 8,
        marginBottom: 16,
        paddingRight: 16,
    },
    jobType: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 32,
        backgroundColor: '#f0f0f0ff',
        borderRadius: 16,
        marginRight: 8,
    },
    activeJobType: {
       backgroundColor: '#F59B21',
    },
    jobTypeText: {
        color: '#666',
        fontSize: 14,
    },
    activeJobTypeText: {
        color: '#fff',
    },
    jobsContainer: {
        paddingBottom: 32,
    },
    jobCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    jobHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    companyLogo: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 12,
    },
    jobMeta: {
        flex: 1,
    },
    companyName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    jobLocation: {
        fontSize: 14,
        color: '#666',
    },
    postedTime: {
        fontSize: 12,
        color: '#999',
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    salaryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    salaryText: {
        fontSize: 16,
        color: '#4CAF50',
        marginLeft: 4,
        fontWeight: '600',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    skillTag: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 8,
    },
    skillText: {
        fontSize: 12,
        color: '#333',
    },
    jobTypeTag: {
        alignSelf: 'flex-start',
        backgroundColor: '#e6f7ff',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyStateText: {
        fontSize: 18,
        color: '#666',
        marginTop: 16,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 4,
    },
});

export default JobsScreen;