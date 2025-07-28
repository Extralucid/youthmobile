// MyChecksScreen.tsx
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

type Check = {
  id: string;
  brand: string;
  logo?: number;              // local asset
  amount: string;
  date: string;
  status: 'Not received';
};

const ALL_DATA: Check[] = [
  {
    id: '1',
    brand: 'Hermes',
    logo: require('../../assets/images/hermes-logo.png'),
    amount: '$1,500.67',
    date: '12/12/2020',
    status: 'Not received',
  },
  {
    id: '2',
    brand: 'Philipp Plein',
    logo: require('../../assets/images/hermes-logo.png'),
    amount: '$1,245.17',
    date: '22/10/2025',
    status: 'Not received',
  },
  {
    id: '3',
    brand: "L'Ocitane",
    logo: require('../../assets/images/hermes-logo.png'),
    amount: '$545.28',
    date: '12/10/2009',
    status: 'Not received',
  },
  {
    id: '4',
    brand: 'Kenzo',
    logo: require('../../assets/images/hermes-logo.png'),
    amount: '$375.37',
    date: '12/11/2021',
    status: 'Not received',
  },
];





const FILTER_OPTIONS = ['All', 'Not received', 'Received'];

export default function EntreprisesScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeChip, setActiveChip] = useState('All');

  /* ---------- Filtering & Search ---------- */
  const filteredData = useMemo(() => {
    let data = ALL_DATA;

    // 1. Chip filter
    if (activeChip !== 'All') {
      data = data.filter((c) => c.status === activeChip);
    }

    // 2. Text search (case-insensitive, brand only)
    if (searchText.trim()) {
      data = data.filter((c) =>
        c.brand.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return data;
  }, [activeChip, searchText]);

  /* ---------- Render ---------- */
  const renderItem = ({ item }: { item: Check }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.brandRow}>
          <Image source={item.logo} style={styles.logo} />
          <Text style={styles.brandText}>{item.brand}</Text>
        </View>
        <Pressable style={styles.checkbox}>
          <View style={styles.checkboxInner} />
        </Pressable>
      </View>

      <View style={styles.labelsRow}>
        <View style={styles.labelGroup}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>{item.amount}</Text>
        </View>
        <View style={styles.labelGroup}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{item.date}</Text>
        </View>
        <View style={styles.labelGroup}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, styles.status]}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  const renderChip = (label: string) => (
    <Pressable
      key={label}
      onPress={() => setActiveChip(label)}
      style={[
        styles.chip,
        activeChip === label && styles.chipActive,
      ]}
    >
      <Text
        style={[
          styles.chipText,
          activeChip === label && styles.chipTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Text style={styles.title}>My Checks</Text>
        <View style={styles.headerButtons}>
          <Pressable onPress={() => setShowSearch(!showSearch)}>
            <Text style={styles.icon}>🔍</Text>
          </Pressable>
          <Pressable style={{ marginLeft: 12 }}>
            <Text style={styles.icon}>⋯</Text>
          </Pressable>
        </View>
      </View>

      {/* ---------- Search input (animated show/hide) ---------- */}
      {showSearch && (
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by brand..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
        </View>
      )}

      {/* ---------- Chips ---------- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScroll}
        contentContainerStyle={styles.chipsContent}
      >
        {FILTER_OPTIONS.map(renderChip)}
      </ScrollView>

      {/* ---------- List ---------- */}
      <FlatList
        data={filteredData}
        keyExtractor={(c) => c.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.empty}>No checks found</Text>
        }
      />
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
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
  title: { fontSize: 20, fontWeight: '600', color: '#111' },
  headerButtons: { flexDirection: 'row' },
  icon: { fontSize: 20 },

  searchWrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 15,
  },

  chipsScroll: { backgroundColor: '#fff' },
  chipsContent: { paddingHorizontal: 16, paddingVertical: 8, height:35, },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    height: 30,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chipActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  chipText: { fontSize: 13, color: '#555' },
  chipTextActive: { color: '#fff' },

  listContent: { paddingHorizontal: 16, paddingVertical: 12 },
  separator: { height: 12 },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },

  /* Card styles unchanged from previous answer */
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  brandText: { fontSize: 16, fontWeight: '500', color: '#000' },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#aaa',
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelGroup: { flex: 1 },
  label: { fontSize: 12, color: '#666', marginBottom: 2 },
  value: { fontSize: 14, fontWeight: '500', color: '#111' },
  status: { color: '#d9534f' },
});