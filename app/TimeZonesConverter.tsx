// app/CalendarConvert/TimeZonesConverter.tsx

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import ConversionResults from '@/components/ConversionResults';
import { useStore } from '@/store';
import { SelectedTimeZone } from '@/components/types';
import { DateTime } from 'luxon';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const TimeZonesConverter = () => {
  const [sourceHour, setSourceHour] = useState<string>('00');
  const [sourceMinute, setSourceMinute] = useState<string>('00');
  const [sourceAmPm, setSourceAmPm] = useState<string>('AM');
  const [sourceTimezone, setSourceTimezone] = useState<string>('');
  const [targetTimezone, setTargetTimezone] = useState<string>('');
  const [targetHour, setTargetHour] = useState<string>('00');
  const [targetMinute, setTargetMinute] = useState<string>('00');
  const [loading, setLoading] = useState(false);

  const { timeZones, loadTimeZones, is24Hour } = useStore();
  const router = useRouter();

  useEffect(() => {
    loadTimeZones();
  }, [loadTimeZones]);

  useEffect(() => {
    if (timeZones.length > 0) {
      setSourceTimezone(timeZones[0].iana);
      setTargetTimezone(timeZones[0].iana);
    }
  }, [timeZones]);

  const hourItems = is24Hour
    ? Array.from({ length: 24 }, (_, i) => ({
        label: String(i).padStart(2, '0'),
        value: String(i).padStart(2, '0'),
      }))
    : Array.from({ length: 12 }, (_, i) => ({
        label: String(i === 0 ? 12 : i).padStart(2, '0'),
        value: String(i === 0 ? 12 : i).padStart(2, '0'),
      }));

  const minuteItems = Array.from({ length: 60 }, (_, i) => ({
    label: String(i).padStart(2, '0'),
    value: String(i).padStart(2, '0'),
  }));

  const handleConvert = () => {
    if (!sourceTimezone || !targetTimezone) {
      Alert.alert('Selection Required', 'Please select both source and target timezones.');
      return;
    }

    setLoading(true);

    try {
      let sourceHourInt = parseInt(sourceHour, 10);
      if (!is24Hour) {
        if (sourceAmPm === 'PM' && sourceHourInt !== 12) {
          sourceHourInt += 12;
        } else if (sourceAmPm === 'AM' && sourceHourInt === 12) {
          sourceHourInt = 0;
        }
      }

      const sourceDateTime = DateTime.fromObject(
        {
          hour: sourceHourInt,
          minute: parseInt(sourceMinute, 10),
        },
        { zone: sourceTimezone }
      );

      const targetDateTime = sourceDateTime.setZone(targetTimezone);
      setTargetHour(targetDateTime.toFormat(is24Hour ? 'HH' : 'hh'));
      setTargetMinute(targetDateTime.toFormat('mm'));
    } catch (error) {
      Alert.alert('Conversion Error', 'An error occurred while converting the time.');
      console.error('Time conversion error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPicker = (
    label: string,
    value: string,
    onValueChange: (value: string) => void,
    items: Array<{ label: string; value: string }>,
    isTimezone?: boolean
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={isTimezone ? styles.pickerContainerSmall : styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={isTimezone ? styles.pickerSmall : styles.picker}
          dropdownIconColor="#333"
          mode="dropdown"
        >
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const handleAddMoreTimeZone = () => {
    router.push('/Settings');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.formContainer}>

            {/* Source Time Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Source Time</Text>
              <View style={styles.inputRow}>
                {renderPicker('Hour', sourceHour, setSourceHour, hourItems)}
                {renderPicker('Minute', sourceMinute, setSourceMinute, minuteItems)}
                {!is24Hour && renderPicker('AM/PM', sourceAmPm, setSourceAmPm, [
                  { label: 'AM', value: 'AM' },
                  { label: 'PM', value: 'PM' },
                ])}
              </View>
              {renderPicker(
                'Timezone',
                sourceTimezone,
                setSourceTimezone,
                timeZones.map((tz: SelectedTimeZone) => ({
                  label: tz.label,
                  value: tz.iana,
                })),
                true // isTimezone flag to apply smaller style
              )}

              {/* Add More Time Zone Link */}
              <TouchableOpacity onPress={handleAddMoreTimeZone} style={styles.addLink}>
                <Text style={styles.addLinkText}>Add More Time Zone</Text>
              </TouchableOpacity>
            </View>

            {/* Target Time Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Target Time</Text>
              {renderPicker(
                'Timezone',
                targetTimezone,
                setTargetTimezone,
                timeZones.map((tz: SelectedTimeZone) => ({
                  label: tz.label,
                  value: tz.iana,
                })),
                true // isTimezone flag to apply smaller style
              )}
            </View>

            {/* Convert Button */}
            <View style={styles.buttonContainer}>
              <FormButton title="Convert Time" onPress={handleConvert} color="#007AFF" />
            </View>

            {/* Loading Indicator */}
            {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />}

            {/* Conversion Results */}
            {!loading && targetTimezone && (
              <ConversionResults
                results={{
                  TargetTime: `${targetHour}:${targetMinute}${!is24Hour ? ` ${sourceAmPm}` : ''} ${
                    timeZones.find((tz) => tz.iana === targetTimezone)?.label
                  }`,
                }}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const FormButton: React.FC<{ title: string; onPress: () => void; color: string }> = ({ title, onPress, color }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: color }]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.buttonText}>{title}</Text>
    {title === 'Convert Time' && <Ionicons name="time-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  fieldContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 15,
    minWidth: '28%',
  },
  label: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 6,
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 5,
    backgroundColor: '#F8F9FA',
    overflow: 'hidden',
  },
  pickerContainerSmall: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 5,
    backgroundColor: '#F8F9FA',
    overflow: 'hidden',
    height: Platform.OS === 'ios' ? 150 : 50,
  },
  picker: {
    height: Platform.OS === 'ios' ? 200 : 50,
    width: '100%',
    color: '#2C3E50',
    fontSize: 16,
  },
  pickerSmall: {
    height: Platform.OS === 'ios' ? 150 : 50,
    width: '100%',
    color: '#2C3E50',
    fontSize: 16,
  },
  addLink: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  addLinkText: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#007AFF',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  loading: {
    marginTop: 20,
  },
});

export default TimeZonesConverter;
