// app/CalendarConvert/PersianHebrewConverter.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import ConversionResults from '@/components/ConversionResults';
import {
  convertPersianToHebrew,
  convertHebrewToPersian,
  PersianDate,
  HebrewDate,
} from '@/utils/persianHebrewFunction';
import { JewishMonth } from '@/utils/persianHebrewFunction';

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
      dropdownIconColor="#333"
    >
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  </View>
);

const PersianHebrewConverter: React.FC = () => {
  const [conversionType, setConversionType] = useState<'PersianToHebrew' | 'HebrewToPersian'>('PersianToHebrew');
  const [inputDate, setInputDate] = useState({
    year: '1400',
    month: '01',
    day: '01',
  });
  const [outputDate, setOutputDate] = useState<{ [key: string]: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const persianYearItems = Array.from({ length: 201 }, (_, i) => ({
    label: String(1300 + i),
    value: String(1300 + i),
  }));

  const hebrewYearItems = Array.from({ length: 100 }, (_, i) => ({
    label: String(5700 + i),
    value: String(5700 + i),
  }));

  const persianMonthItems = [
    { label: 'Farvardin', value: '01' },
    { label: 'Ordibehesht', value: '02' },
    { label: 'Khordad', value: '03' },
    { label: 'Tir', value: '04' },
    { label: 'Mordad', value: '05' },
    { label: 'Shahrivar', value: '06' },
    { label: 'Mehr', value: '07' },
    { label: 'Aban', value: '08' },
    { label: 'Azar', value: '09' },
    { label: 'Dey', value: '10' },
    { label: 'Bahman', value: '11' },
    { label: 'Esfand', value: '12' },
  ];

  const hebrewMonthItems: Array<{ label: string; value: typeof JewishMonth[keyof typeof JewishMonth] }> = [
    { label: 'Nisan', value: JewishMonth.Nisan },
    { label: 'Iyar', value: JewishMonth.Iyyar },
    { label: 'Sivan', value: JewishMonth.Sivan },
    { label: 'Tammuz', value: JewishMonth.Tammuz },
    { label: 'Av', value: JewishMonth.Av },
    { label: 'Elul', value: JewishMonth.Elul },
    { label: 'Tishrei', value: JewishMonth.Tishri },
    { label: 'Cheshvan', value: JewishMonth.Cheshvan },
    { label: 'Kislev', value: JewishMonth.Kislev },
    { label: 'Tevet', value: JewishMonth.Tevet },
    { label: 'Shevat', value: JewishMonth.Shevat },
    { label: 'Adar I', value: JewishMonth.AdarI },
    { label: 'Adar II', value: JewishMonth.AdarII },
  ];

  const dayItems = Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1).padStart(2, '0'),
  }));

  const handleConversion = () => {
    setLoading(true);
    setOutputDate(null);

    try {
      if (conversionType === 'PersianToHebrew') {
        const persianDate: PersianDate = {
          year: parseInt(inputDate.year),
          month: parseInt(inputDate.month),
          day: parseInt(inputDate.day),
        };
        const hebrewDate = convertPersianToHebrew(persianDate);
        if (hebrewDate) {
          const formattedHebrewDate = `${hebrewDate.day} ${hebrewDate.month} ${hebrewDate.year}`;
          setOutputDate({
            Hebrew: formattedHebrewDate,
          });
        } else {
          Alert.alert('Conversion Error', 'Failed to convert Persian to Hebrew date.');
        }
      } else {
        const hebrewDate: HebrewDate = {
          year: parseInt(inputDate.year),
          month: inputDate.month as typeof JewishMonth[keyof typeof JewishMonth],
          day: parseInt(inputDate.day),
        };
        const persianDate = convertHebrewToPersian(hebrewDate);
        if (persianDate) {
          const formattedPersianDate = `${persianDate.year}/${String(persianDate.month).padStart(2, '0')}/${String(persianDate.day).padStart(2, '0')}`;
          setOutputDate({
            Persian: formattedPersianDate,
          });
        } else {
          Alert.alert('Conversion Error', 'Failed to convert Hebrew to Persian date.');
        }
      }
    } catch (error) {
      console.error('Error during conversion:', error);
      Alert.alert('Conversion Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
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
            {conversionType === 'PersianToHebrew'
              ? 'Convert Persian Date to Hebrew Date'
              : 'Convert Hebrew Date to Persian Date'}
          </Text>

          {/* Conversion Type Picker */}
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Conversion Type</Text>
            <Picker
              selectedValue={conversionType}
              onValueChange={(itemValue) => setConversionType(itemValue)}
              style={styles.picker}
              dropdownIconColor="#333"
            >
              <Picker.Item label="Persian to Hebrew" value="PersianToHebrew" />
              <Picker.Item label="Hebrew to Persian" value="HebrewToPersian" />
            </Picker>
          </View>

          {/* Date Inputs */}
          <View style={styles.calendarInputGroup}>
            <View style={styles.calendarInputRow}>
              {/* Year Picker */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {conversionType === 'PersianToHebrew' ? 'Persian Year' : 'Hebrew Year'}
                </Text>
                <Picker
                  selectedValue={inputDate.year}
                  onValueChange={(value) =>
                    setInputDate({ ...inputDate, year: value })
                  }
                  style={styles.picker}
                  dropdownIconColor="#333"
                >
                  {conversionType === 'PersianToHebrew'
                    ? persianYearItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))
                    : hebrewYearItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                </Picker>
              </View>

              {/* Month Picker */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {conversionType === 'PersianToHebrew' ? 'Persian Month' : 'Hebrew Month'}
                </Text>
                <Picker
                  selectedValue={inputDate.month}
                  onValueChange={(value) =>
                    setInputDate({ ...inputDate, month: value })
                  }
                  style={styles.picker}
                  dropdownIconColor="#333"
                >
                  {conversionType === 'PersianToHebrew'
                    ? persianMonthItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))
                    : hebrewMonthItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                </Picker>
              </View>

              {/* Day Picker */}
              <CalendarInput
                label="Day"
                value={inputDate.day}
                onValueChange={(value) =>
                  setInputDate({ ...inputDate, day: value })
                }
                items={dayItems}
              />
            </View>
          </View>

          {/* Submit Button */}
          <Pressable
            style={styles.button}
            onPress={handleConversion}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Convert Date</Text>
            )}
          </Pressable>

          {/* Display Results */}
          {outputDate && <ConversionResults results={outputDate} />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 24,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  calendarInputGroup: {
    marginBottom: 16,
  },
  calendarInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PersianHebrewConverter;
