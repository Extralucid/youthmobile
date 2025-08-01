import {
    Entypo,
    Feather,
    FontAwesome,
    Ionicons,
    MaterialIcons
} from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Linking,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type JobDetail = {
  id: string;
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
  posted: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
};

type RelatedJob = {
  id: string;
  title: string;
  employer: string;
  location: string;
  type: string;
};

const JobDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [saved, setSaved] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedJobs, setRelatedJobs] = useState<RelatedJob[]>([]);

  // Simulate fetching job data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - replace with actual API call
        const mockJob: JobDetail = {
          id: '1',
          employer: {
            name: 'TechCorp',
            logo: 'https://logo.clearbit.com/techcorp.com',
            about: 'A leading technology company specializing in mobile and web solutions with clients worldwide.',
            website: 'https://techcorp.com',
            founded: '2010',
            employees: '500+',
            industry: 'Software Development',
            headquarters: 'San Francisco, CA'
          },
          title: 'Senior React Native Developer',
          type: 'Full-time',
          location: 'Remote',
          salary: '$120,000 - $150,000',
          skills: ['React Native', 'TypeScript', 'Redux', 'Jest', 'GraphQL'],
          posted: '2 days ago',
          description: 'We are looking for an experienced React Native developer to join our mobile team. You will be responsible for architecting and building applications, as well as coordinating with teams responsible for other layers of the product infrastructure.',
          responsibilities: [
            'Build pixel-perfect, smooth UIs across both mobile platforms',
            'Leverage native APIs for deep integrations with both platforms',
            'Diagnose and fix bugs and performance bottlenecks',
            'Maintain code and write automated tests to ensure the product is of the highest quality'
          ],
          requirements: [
            '4+ years of professional experience with React Native',
            'Firm grasp of JavaScript and TypeScript',
            'Experience with state management solutions (Redux, MobX)',
            'Knowledge of native build tools (Xcode, Gradle)',
            'Experience with automated testing suites'
          ],
          benefits: [
            'Competitive salary and equity',
            'Flexible work hours',
            'Health, dental, and vision insurance',
            '401(k) matching',
            'Professional development budget'
          ]
        };

        const mockRelatedJobs: RelatedJob[] = [
          {
            id: '2',
            title: 'React Native Engineer',
            employer: 'MobileFirst',
            location: 'New York, NY',
            type: 'Full-time'
          },
          {
            id: '3',
            title: 'Frontend Developer (React)',
            employer: 'WebSolutions',
            location: 'Remote',
            type: 'Contract'
          },
          {
            id: '4',
            title: 'JavaScript Developer',
            employer: 'CodeCraft',
            location: 'Austin, TX',
            type: 'Full-time'
          }
        ];

        setJob(mockJob);
        setRelatedJobs(mockRelatedJobs);
        
        // Check if job is saved (from AsyncStorage or API)
        const isSaved = false; // Replace with actual check
        setSaved(isSaved);
        
        // Check application status (from AsyncStorage or API)
        const status = null; // Replace with actual check
        setApplicationStatus(status);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSaveJob = () => {
    setSaved(!saved);
    // Here you would also update AsyncStorage or make API call
  };

  const handleShareJob = async () => {
    try {
      await Share.share({
        message: `Check out this job: ${job?.title} at ${job?.employer.name}\n\n${job?.employer.website}`,
        url: job?.employer.website,
        title: job?.title
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleApply = () => {
    // Simulate application submission
    setApplicationStatus('applied');
    // In a real app, this would navigate to an application form
    // Linking.openURL(`mailto:careers@techcorp.com?subject=Application for ${job?.title}`);
  };

//   const handleApply = () => {
//     // In a real app, this would navigate to an application form
//     Linking.openURL(`mailto:careers@techcorp.com?subject=Application for ${job.title}`);
//   };

  const handleVisitWebsite = () => {
    Linking.openURL(job.employer.website);
  };

  const handleViewCompany = () => {
    // In a real app, this would navigate to company profile
    console.log('View company profile');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06803A" />
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load job details</Text>
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with action buttons */}
      <View style={styles.headerActions}>
        <TouchableOpacity onPress={handleSaveJob} style={styles.actionButton}>
          <MaterialIcons 
            name={saved ? "bookmark" : "bookmark-border"} 
            size={24} 
            color={saved ? "#06803A" : "#333"} 
          />
          <Text style={styles.actionButtonText}>{saved ? 'Saved' : 'Save'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleShareJob} style={styles.actionButton}>
          <Feather name="share-2" size={22} color="#333" />
          <Text style={styles.actionButtonText}>Partager</Text>
        </TouchableOpacity>
      </View>

      {/* Job Header */}
      <View style={styles.header}>
        <View style={styles.companyContainer}>
          <Image 
            source={{ uri: job.employer.logo }} 
            style={styles.companyLogo}
            defaultSource={require('../../assets/images/logo.png')}
          />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{job.employer.name}</Text>
            <TouchableOpacity onPress={handleVisitWebsite}>
              <Text style={styles.websiteLink}>Visiter le sitezeb</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.jobTitle}>{job.title}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Feather name="map-pin" size={16} color="#666" />
            <Text style={styles.metaText}>{job.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons name="attach-money" size={16} color="#666" />
            <Text style={styles.metaText}>{job.salary}</Text>
          </View>
          <View style={styles.metaItem}>
            <FontAwesome name="clock-o" size={16} color="#666" />
            <Text style={styles.metaText}>{job.type}</Text>
          </View>
        </View>
      </View>

      {/* Application Status */}
      {applicationStatus && (
        <View style={[
          styles.statusBanner,
          applicationStatus === 'applied' && styles.appliedBanner,
          applicationStatus === 'rejected' && styles.rejectedBanner
        ]}>
          <Text style={styles.statusText}>
            {applicationStatus === 'applied' 
              ? '✓ Application Submitted' 
              : 'Application Rejected'}
          </Text>
          <TouchableOpacity>
            <Text style={styles.statusLink}>
              {applicationStatus === 'applied' ? 'View Status' : 'Try Again'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Job Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description de l'emploi</Text>
        <Text style={styles.sectionContent}>{job.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsabilités</Text>
        {job.responsibilities.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Ionicons name="ellipse" size={8} color="#06803A" style={styles.bullet} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        {job.requirements.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Ionicons name="ellipse" size={8} color="#06803A" style={styles.bullet} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compétences</Text>
        <View style={styles.skillsContainer}>
          {job.skills.map(skill => (
            <View key={skill} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avantages</Text>
        {job.benefits.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Ionicons name="ellipse" size={8} color="#06803A" style={styles.bullet} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Enhanced Company Information */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>About {job.employer.name}</Text>
          <TouchableOpacity onPress={handleViewCompany}>
            <Text style={styles.viewAllLink}>Voir le profil complet</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionContent}>{job.employer.about}</Text>
        
        <View style={styles.companyDetails}>
          <View style={styles.detailItem}>
            <Entypo name="briefcase" size={16} color="#666" />
            <Text style={styles.detailText}>{job.employer.industry}</Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="calendar" size={16} color="#666" />
            <Text style={styles.detailText}>Créé {job.employer.founded}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="people" size={16} color="#666" />
            <Text style={styles.detailText}>{job.employer.employees} employés</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="location-on" size={16} color="#666" />
            <Text style={styles.detailText}>{job.employer.headquarters}</Text>
          </View>
        </View>
      </View>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emplois connexes</Text>
          <View style={styles.relatedJobsContainer}>
            {relatedJobs.map(job => (
              <TouchableOpacity key={job.id} style={styles.relatedJobCard}>
                <Text style={styles.relatedJobTitle}>{job.title}</Text>
                <Text style={styles.relatedJobCompany}>{job.employer}</Text>
                <View style={styles.relatedJobMeta}>
                  <Text style={styles.relatedJobLocation}>{job.location}</Text>
                  <Text style={styles.relatedJobType}>{job.type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Apply Button */}
      {!applicationStatus && (
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Postuler pour ce poste</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#06803A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#333',
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 20,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  websiteLink: {
    color: '#06803A',
    fontSize: 14,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  statusBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  appliedBanner: {
    backgroundColor: '#e6f7e6',
  },
  rejectedBanner: {
    backgroundColor: '#ffe6e6',
  },
  statusText: {
    color: '#333',
    fontWeight: '500',
  },
  statusLink: {
    color: '#06803A',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllLink: {
    color: '#06803A',
    fontSize: 14,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    marginTop: 6,
    marginRight: 8,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#e6fff0ff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skillText: {
    color: '#06803A',
    fontSize: 14,
  },
  companyDetails: {
    marginTop: 12,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  relatedJobsContainer: {
    gap: 12,
    marginTop: 12,
  },
  relatedJobCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
  },
  relatedJobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  relatedJobCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  relatedJobMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  relatedJobLocation: {
    fontSize: 13,
    color: '#666',
  },
  relatedJobType: {
    fontSize: 13,
    color: '#666',
  },
  applyButton: {
    backgroundColor: '#06803A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDetailScreen;