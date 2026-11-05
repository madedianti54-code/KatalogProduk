import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, shadow } from '../constants/theme';
import { formatRupiah } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductCard({ item, onPress, compact = false }) {
  const { addToCart } = useCart();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        compact && styles.compact,
        pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
      ]}
    >
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={compact ? 38 : 46} color={colors.primary} />
      </View>
      <View style={styles.body}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.row}>
          <Ionicons name="star" size={13} color={colors.star} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatRupiah(item.price)}</Text>
          <Pressable hitSlop={8} style={styles.addBtn} onPress={() => addToCart(item.id)}>
            <Ionicons name="add" size={20} color={colors.primary} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadow,
  },
  compact: { width: 200, marginRight: spacing.md, marginBottom: spacing.sm },
  cover: { height: 120, alignItems: 'center', justifyContent: 'center' },
  body: { padding: spacing.md },
  category: { fontSize: 11, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  title: { marginTop: 2, fontSize: 15, fontWeight: '700', color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  rating: { fontSize: 12, color: colors.textMuted },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  price: { fontSize: 15, fontWeight: '800', color: colors.primary },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});