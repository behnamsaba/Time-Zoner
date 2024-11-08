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
        name="CalendarConverterComponent"
        options={{ title: 'Other Calendars Converter' }}
      />
    </Stack>
  );
}