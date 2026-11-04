import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../src/constants/theme';

// Screen 1: Welcome / Onboarding
export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.circleBig} />
        <View style={styles.circleSmall} />
        <Ionicons name="sparkles" size={96} color="#fff" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Pinkie Accessories</Text>
        <Text style={styles.subtitle}>
          Temukan tas, dompet, perhiasan, dan aksesoris rambut yang manis. Pilih, simpan ke keranjang, dan cek total belanjamu.
        </Text>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}
          onPress={() => alert('Halaman Home belum dibuat')}
        >
          <Text style={styles.buttonText}>Mulai Belanja</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.primary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: {
    flex: 1.2,
    margin: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circleBig: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -60,
    right: -60,
  },
  circleSmall: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.secondary,
    opacity: 0.35,
    bottom: -30,
    left: -30,
  },
  content: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  subtitle: { marginTop: 10, fontSize: 15, lineHeight: 22, color: colors.textMuted },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: { color: colors.primary, fontSize: 16, fontWeight: '700' },
});