// app/CalendarConvert/HebrewChineseConverter.tsx

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
  convertHebrewToChinese,
  convertChineseToHebrew
} from '@/utils/HebrewChineseFunction';
import { HebrewDate,ChineseDate,ChineseMonth } from '@/utils/calender-types';
import {
  hebrewMonthItems,
  chineseMonthItems,
} from '@/utils/calender-types';

const HebrewChineseConverter: React.FC = () => {
  const [conversionType, setConversionType] = useState<'HebrewToChinese' | 'ChineseToHebrew'>('HebrewToChinese');
  const [inputDate, setInputDate] = useState<{
    year: string;
    month: typeof hebrewMonthItems[number]['value'] | typeof chineseMonthItems[number]['value'];
    day: string;
    cycle: string;
    leap: string;
  }>({
    year: '5784',
    month: hebrewMonthItems[0].value,
    day: '01',
    cycle: '78',
    leap: '0',
  });
  const [outputDate, setOutputDate] = useState<{ [key: string]: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const hebrewYearItems = Array.from({ length: 100 }, (_, i) => ({
    label: String(5700 + i),
    value: String(5700 + i),
  }));

  const chineseCycleItems = [
    { label: '75', value: '75' },
    { label: '76', value: '76' },
    { label: '77', value: '77' },
    { label: '78', value: '78' },
  ];

  const chineseYearItems = Array.from({ length: 60 }, (_, i) => ({
    label: String(1 + i),
    value: String(1 + i),
  }));

  const dayItems = Array.from({ length: 30 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1).padStart(2, '0'),
  }));

  const leapItems = [
    { label: 'No', value: '0' },
    { label: 'Yes', value: '1' },
  ];

  const handleConversion = () => {
    setLoading(true);
    setOutputDate(null);

    try {
      if (conversionType === 'HebrewToChinese') {
        const hebrewDate: HebrewDate = {
          year: parseInt(inputDate.year),
          month: inputDate.month as HebrewDate['month'],
          day: parseInt(inputDate.day),
        };
        const chineseDate = convertHebrewToChinese(hebrewDate);
        if (chineseDate) {
          const formattedChineseDate = `Cycle ${chineseDate.cycle}, Year ${chineseDate.year}, ${chineseDate.month}${chineseDate.leap ? ' (Leap Month)' : ''}, Day ${chineseDate.day}`;
          setOutputDate({
            Chinese: formattedChineseDate,
          });
        } else {
          Alert.alert('Conversion Error', 'Failed to convert Hebrew to Chinese date.');
        }
      } else {
        const chineseDate: ChineseDate = {
          cycle: parseInt(inputDate.cycle),
          year: parseInt(inputDate.year),
          month: inputDate.month as ChineseMonth,
          leap: inputDate.leap === '1',
          day: parseInt(inputDate.day),
        };
        const hebrewDate = convertChineseToHebrew(chineseDate);
        if (hebrewDate) {
          const formattedHebrewDate = `${hebrewDate.day} ${hebrewDate.month} ${hebrewDate.year}`;
          setOutputDate({
            Hebrew: formattedHebrewDate,
          });
        } else {
          Alert.alert('Conversion Error', 'Failed to convert Chinese to Hebrew date.');
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
            {conversionType === 'HebrewToChinese'
              ? 'Convert Hebrew Date to Chinese Date'
              : 'Convert Chinese Date to Hebrew Date'}
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
              <Picker.Item label="Hebrew to Chinese" value="HebrewToChinese" />
              <Picker.Item label="Chinese to Hebrew" value="ChineseToHebrew" />
            </Picker>
          </View>

          {/* Date Inputs */}
          <View style={styles.calendarInputGroup}>
            <View style={styles.calendarInputRow}>
              {/* Year Picker */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {conversionType === 'HebrewToChinese' ? 'Hebrew Year' : 'Chinese Year'}
                </Text>
                <Picker
                  selectedValue={inputDate.year}
                  onValueChange={(value) =>
                    setInputDate({ ...inputDate, year: value })
                  }
                  style={styles.picker}
                  dropdownIconColor="#333"
                >
                  {conversionType === 'HebrewToChinese'
                    ? hebrewYearItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))
                    : chineseYearItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                </Picker>
              </View>

              {/* Cycle Picker (only for Chinese to Hebrew) */}
              {conversionType === 'ChineseToHebrew' && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Cycle</Text>
                  <Picker
                    selectedValue={inputDate.cycle}
                    onValueChange={(value) =>
                      setInputDate({ ...inputDate, cycle: value })
                    }
                    style={styles.picker}
                    dropdownIconColor="#333"
                  >
                    {chineseCycleItems.map((item) => (
                      <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                  </Picker>
                </View>
              )}

              {/* Month Picker */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {conversionType === 'HebrewToChinese' ? 'Hebrew Month' : 'Chinese Month'}
                </Text>
                <Picker
                  selectedValue={inputDate.month}
                  onValueChange={(value) =>
                    setInputDate({ ...inputDate, month: value })
                  }
                  style={styles.picker}
                  dropdownIconColor="#333"
                >
                  {conversionType === 'HebrewToChinese'
                    ? hebrewMonthItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))
                    : chineseMonthItems.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                </Picker>
              </View>

              {/* Leap Picker (only for Chinese to Hebrew) */}
              {conversionType === 'ChineseToHebrew' && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Leap Month</Text>
                  <Picker
                    selectedValue={inputDate.leap}
                    onValueChange={(value) =>
                      setInputDate({ ...inputDate, leap: value })
                    }
                    style={styles.picker}
                    dropdownIconColor="#333"
                  >
                    {leapItems.map((item) => (
                      <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                  </Picker>
                </View>
              )}

              {/* Day Picker */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Day</Text>
                <Picker
                  selectedValue={inputDate.day}
                  onValueChange={(value) =>
                    setInputDate({ ...inputDate, day: value })
                  }
                  style={styles.picker}
                  dropdownIconColor="#333"
                >
                  {dayItems.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                  ))}
                </Picker>
              </View>
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
    minWidth: '45%', // Adjusted for better layout on smaller screens
    marginBottom: 16,
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

export default HebrewChineseConverter;
