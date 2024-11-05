// app/CalendarConvert/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function CalendarConvertLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="GregorianConverter"
        options={{ title: 'Gregorian Converts' }}
      />
      <Stack.Screen
        name="PersianHebrewConverter"
        options={{ title: 'Persian ↔ Hebrew' }}
      />
      <Stack.Screen
        name="HebrewChineseConverter"
        options={{ title: 'Hebrew ↔ Chinese' }}
      />
      <Stack.Screen
        name="PersianArabicConverter"
        options={{ title: 'Persian ↔ Islamic' }}
      />
    </Stack>
  );
}