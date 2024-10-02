// app/index.tsx
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar Converter</Text>
      <View style={styles.linkContainer}>
        <Link href="/CalendarConvert/GregorianConverter" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Gregorian to Other Calendars</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/CalendarConvert/PersianToHebrewConverter" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Persian to Hebrew</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/CalendarConvert/HebrewToChineseConverter" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Hebrew to Chinese</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  linkContainer: {
    width: '100%',
  },
  linkButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
