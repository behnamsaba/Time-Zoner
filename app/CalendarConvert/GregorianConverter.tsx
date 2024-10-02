// app/CalendarConvert/GregorianConverter.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { calculateCalendar } from '@/utils/calculateCalendar';
import CalculatedCalendar from '@/components/CalculatedCalender';

interface CalendarInputProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: Array<{ label: string; value: string }>;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  label,
  value,
  onValueChange,
  items,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <Picker
      selectedValue={value}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  </View>
);

const GregorianConverter: React.FC = () => {
  const [calendarData, setCalendarData] = useState({
    year: '2023',
    month: '01',
    day: '01',
  });
  const [calendarType, setCalendarType] = useState('Gregorian');
  const [conversionResults, setConversionResults] = useState<any>(null);

  const yearItems = Array.from({ length: 201 }, (_, i) => ({
    label: String(1900 + i),
    value: String(1900 + i),
  }));

  const monthItems = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const dayItems = Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1).padStart(2, '0'),
  }));

  const calendarTypes = [
    'Gregorian',
    'Julian',
    'Islamic',
    'Hebrew',
    'Persian',
    'Chinese',
  ];

  const handleSubmit = () => {
    const { year, month, day } = calendarData;

    const results = calculateCalendar({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      calendarType,
    });

    setConversionResults(results);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>
            Convert Gregorian Calendar to Different Calendars
          </Text>

          <View style={styles.calendarInputGroup}>
            <View style={styles.calendarInputRow}>
              <CalendarInput
                label="Year"
                value={calendarData.year}
                onValueChange={(value) =>
                  setCalendarData({ ...calendarData, year: value })
                }
                items={yearItems}
              />
              <CalendarInput
                label="Month"
                value={calendarData.month}
                onValueChange={(value) =>
                  setCalendarData({ ...calendarData, month: value })
                }
                items={monthItems}
              />
              <CalendarInput
                label="Day"
                value={calendarData.day}
                onValueChange={(value) =>
                  setCalendarData({ ...calendarData, day: value })
                }
                items={dayItems}
              />
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Calendar Type</Text>
            <Picker
              selectedValue={calendarType}
              onValueChange={(itemValue) => setCalendarType(itemValue)}
              style={styles.picker}
            >
              {calendarTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Convert Calendar</Text>
          </Pressable>
          {conversionResults && (
            <CalculatedCalendar results={conversionResults} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  } as ViewStyle,
  container: {
    flex: 1,
  } as ViewStyle,
  scrollContent: {
    padding: 16,
  } as ViewStyle,
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  } as TextStyle,
  calendarInputGroup: {
    marginBottom: 16,
  } as ViewStyle,
  calendarInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  } as ViewStyle,
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  } as TextStyle,
  pickerContainer: {
    marginBottom: 16,
  } as ViewStyle,
  pickerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  } as TextStyle,
  picker: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#FFF',
  } as ViewStyle,
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 24,
  } as ViewStyle,
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  } as TextStyle,
});

export default GregorianConverter;
