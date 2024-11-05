// app/CalendarConvert/PersianArabicConverter.tsx

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
  convertPersianToArabic,
  convertArabicToPersian,
} from '@/utils/persianArabicFunction';
import {
  PersianDate,
  ArabicDate,
  persianMonthItems,
  arabicMonthItems,
} from '@/utils/calender-types';
import CalendarInput from '@/components/CalenderInput';

const PersianArabicConverter = () => {
  const [conversionType, setConversionType] = useState<'PersianToArabic' | 'ArabicToPersian'>('PersianToArabic');
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

  const arabicYearItems = Array.from({ length: 101 }, (_, i) => ({
    label: String(1350 + i),
    value: String(1350 + i),
  }));

  const dayItems = Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1).padStart(2, '0'),
  }));

  const handleConversion = () => {
    setLoading(true);
    setOutputDate(null);

    try {
      if (conversionType === 'PersianToArabic') {
        const persianDate: PersianDate = {
          year: parseInt(inputDate.year, 10),
          month: parseInt(inputDate.month, 10),
          day: parseInt(inputDate.day, 10),
        };
        const arabicDate = convertPersianToArabic(persianDate);
        if (arabicDate) {
          const formattedArabicDate = `${arabicDate.year}-${String(arabicDate.month).padStart(2, '0')}-${String(arabicDate.day).padStart(2, '0')}`;
          setOutputDate({
            Arabic: formattedArabicDate,
          });
        } else {
          Alert.alert('Conversion Error', 'Failed to convert Persian to Arabic date.');
        }
      } else {
        const arabicDate: ArabicDate = {
          year: parseInt(inputDate.year, 10),
          month: parseInt(inputDate.month, 10),
          day: parseInt(inputDate.day, 10),
        };
        const persianDate = convertArabicToPersian(arabicDate);
        if (persianDate) {
          const formattedPersianDate = `${persianDate.year}/${String(persianDate.month).padStart(2, '0')}/${String(persianDate.day).padStart(2, '0')}`;
          setOutputDate({
            Persian: formattedPersianDate,
          });
        } else {
          Alert.alert('Conversion Error', 'Failed to convert Arabic to Persian date.');
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
            {conversionType === 'PersianToArabic'
              ? 'Convert Persian Date to Arabic Date'
              : 'Convert Arabic Date to Persian Date'}
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
              <Picker.Item label="Persian to Arabic" value="PersianToArabic" />
              <Picker.Item label="Arabic to Persian" value="ArabicToPersian" />
            </Picker>
          </View>

          {/* Date Inputs */}
          <View style={styles.calendarInputGroup}>
            <View style={styles.calendarInputRow}>
              {/* Year Picker */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {conversionType === 'PersianToArabic' ? 'Persian Year' : 'Arabic Year'}
                </Text>
                <Picker
                  selectedValue={inputDate.year}
                  onValueChange={(value) =>
                    setInputDate({ ...inputDate, year: value })
                  }
                  style={styles.picker}
                  dropdownIconColor="#333"
                >
                  {conversionType === 'PersianToArabic'
                    ? persianYearItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))
                    : arabicYearItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                </Picker>
              </View>

              {/* Month Picker */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {conversionType === 'PersianToArabic' ? 'Persian Month' : 'Arabic Month'}
                </Text>
                <Picker
                  selectedValue={inputDate.month}
                  onValueChange={(value) =>
                    setInputDate({ ...inputDate, month: value })
                  }
                  style={styles.picker}
                  dropdownIconColor="#333"
                >
                  {conversionType === 'PersianToArabic'
                    ? persianMonthItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))
                    : arabicMonthItems.map((item) => (
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

export default PersianArabicConverter;
