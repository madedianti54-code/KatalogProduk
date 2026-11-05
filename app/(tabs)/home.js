import React from 'react';
import { View, Text, ScrollView, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../../src/components/ProductCard';
import { products, categories } from '../../src/data/products';
import { colors, radius, spacing } from '../../src/constants/theme';

const categoryIcons = {
  Tas: 'bag-handle-outline',
  Dompet: 'wallet-outline',
  Perhiasan: 'diamond-outline',
  Rambut: 'flower-outline',
};

// Screen 2: Home
export default function HomeScreen() {
  const router = useRouter();
  const bestSeller = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl }}>
        <Text style={styles.hello}>Selamat datang 👋</Text>
        <Text style={styles.title}>Lengkapi gayamu hari ini</Text>

        <Pressable style={styles.search} onPress={() => router.push('/(tabs)/catalog')}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <Text style={styles.searchText}>Cari aksesoris...</Text>
        </Pressable>

        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Promo Pink Week</Text>
            <Text style={styles.bannerText}>Aksesoris manis dengan harga spesial minggu ini.</Text>
          </View>
          <Ionicons name="pricetags" size={48} color={colors.primary} />
        </View>

        <Text style={styles.section}>Kategori</Text>
        <View style={styles.catRow}>
          {categories.slice(1).map((cat) => (
            <Pressable
              key={cat}
              style={styles.cat}
              onPress={() => router.push({ pathname: '/(tabs)/catalog', params: { category: cat } })}
            >
              <View style={styles.catIcon}>
                <Ionicons name={categoryIcons[cat]} size={22} color={colors.primary} />
              </View>
              <Text style={styles.catLabel}>{cat}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.section}>Produk Terlaris</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={bestSeller}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard compact item={item} onPress={() => router.push(`/product/${item.id}`)} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hello: { fontSize: 14, color: colors.textMuted },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 4 },
  search: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchText: { color: colors.textMuted },
  banner: {
    marginTop: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerTitle: { color: colors.primary, fontSize: 18, fontWeight: '800' },
  bannerText: { color: colors.primary, marginTop: 4, opacity: 0.95 },
  section: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
  catRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cat: { alignItems: 'center', width: '23%' },
  catIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catLabel: { marginTop: 6, fontSize: 12, fontWeight: '600', color: colors.text },
});