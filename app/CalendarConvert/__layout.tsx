// app/CalendarConvert/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function CalendarConvertLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="GregorianConverter"
        options={{ title: 'Gregorian Converter' }}
      />
      <Stack.Screen
        name="PersianToHebrewConverter"
        options={{ title: 'Persian to Hebrew' }}
      />
      <Stack.Screen
        name="HebrewToChineseConverter"
        options={{ title: 'Hebrew to Chinese' }}
      />
      {/* Add more screens as needed */}
    </Stack>
  );
}
