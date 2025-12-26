import { router } from 'expo-router';
import React from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EntrepriseDetailScreen() {
  /* Hard-coded for the demo – replace with route params */
  const data = {
    brand: 'Philipp Plein',
    amount: '$1,245.17',
    date: '13/12/2018',
    status: 'Not received',
    items: [
      { name: 'Lather moto jacket', price: '$8,564.00' },
      { name: 'Lorem ipsum', price: '$358.00' },
      { name: 'Enim ad minim veniam', price: '$1,355.00' },
      { name: 'Dolor in reprehenderit', price: '$2,333.12' },
    ],
  };

  return (
    <View style={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{data.brand}</Text>
        <TouchableOpacity>
          <Text style={styles.icon}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- Selected card ---------- */}
        <View style={styles.card}>
          <Text style={styles.brand}>{data.brand}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>{data.amount}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{data.date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, styles.status]}>{data.status}</Text>
          </View>
        </View>

        {/* ---------- Extra details ---------- */}
        {data.items.map((it, idx) => (
          <View key={idx} style={styles.detailRow}>
            <Text style={styles.detailName}>{it.name}</Text>
            <Text style={styles.detailPrice}>{it.price} ×1 (incl. VAT 10%)</Text>
          </View>
        ))}
      </ScrollView>

      {/* ---------- Footer buttons ---------- */}
      <View style={styles.footer}>
        <Pressable style={[styles.btn, styles.btnLeft]}>
          <Text style={styles.btnTxt}>Annuler</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnRight]}>
          <Text style={styles.btnTxt}>Confirmer</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  icon: { fontSize: 22, color: '#111' },
  headerTitle: { fontSize: 18, fontWeight: '600' },

  scroll: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  brand: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: { fontSize: 14, color: '#555' },
  value: { fontSize: 14, fontWeight: '500' },
  status: { color: '#d9534f' },

  detailRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  detailName: { fontSize: 15, fontWeight: '500', marginBottom: 2 },
  detailPrice: { fontSize: 13, color: '#555' },

  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 45,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
  },
  btnLeft: {
    marginRight: 8,
    backgroundColor: '#e0e0e0',
  },
  btnRight: {
    marginLeft: 8,
    backgroundColor: '#007bff',
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});