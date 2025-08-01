import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UniversiteDetailScreen = () => {
  const items = [
    { name: 'Systeme d\'information et reseaux', price: 'xof450 000', quantity: 'an 1', vat: 'Première année' },
    { name: 'Genie Industrielle', price: 'xof450 000', quantity: 'an 1', vat: 'Première année' },
    { name: 'Controle Audit', price: 'xof450 000', quantity: 'an 1', vat: 'Première année' },
    { name: 'Finances Comptabilite', price: 'xof450 000', quantity: 'an 1', vat: 'Première année' },
  ];

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '').replace(',', '')), 0);
  const formattedSubtotal = `$${subtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {/* Company Card */}
        <View style={styles.card}>
          <Text style={styles.companyName}>ESTA</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ville</Text>
            <Text style={styles.detailValue}>Ouaga</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rejoint le</Text>
            <Text style={styles.detailValue}>Mars 13, 2018</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={[styles.detailValue, styles.statusNotReceived]}>En Attente</Text>
          </View>
        </View>

        {/* Items List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos filières</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>{item.price} {item.quantity} ({item.vat})</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          ))}
        </View>

        {/* Subtotal */}
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalLabel}>Diplomes reconnus par le CAMES</Text>
          <Text style={styles.subtotalValue}>Oui</Text>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.secondaryButtonText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Text style={styles.primaryButtonText}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
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
  headerButton: {
    padding: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
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
  statusNotReceived: {
    color: '#F44336',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  itemContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  subtotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subtotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 45,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default UniversiteDetailScreen;