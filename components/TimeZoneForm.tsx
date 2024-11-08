import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Platform } from 'react-native';
import { TimeZoneFormProps, TimeZoneOption, SelectedTimeZone } from './types';
import { zones } from '@/utils/zones';
import { Picker } from '@react-native-picker/picker';

const TimeZoneForm = ({ onSubmit, onCancel } : TimeZoneFormProps) => {
  const [selectedZone, setSelectedZone] = useState<TimeZoneOption>(zones[0]);
  const [label, setLabel] = useState<string>(zones[0].label);

  const handleZoneChange = (iana: string) => {
    const zone = zones.find((z) => z.iana === iana) || zones[0];
    setSelectedZone(zone);
    setLabel(zone.label);
  };

  const handleSubmit = () => {
    const newTimeZone: SelectedTimeZone = {
      ...selectedZone,
      label: label.trim() || selectedZone.label,
    };
    onSubmit(newTimeZone);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Time Zone</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Select Time Zone:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedZone.iana}
            onValueChange={handleZoneChange}
            style={styles.picker}
            dropdownIconColor="#333"
            mode="dropdown"
          >
            {zones.map((zone) => (
              <Picker.Item key={zone.iana} label={zone.fullName} value={zone.iana} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Custom Label:</Text>
        <TextInput
          style={styles.input}
          value={label}
          onChangeText={setLabel}
          placeholder="Enter custom label"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.buttonContainer}>
        <FormButton title="Cancel" onPress={onCancel} color="#6c757d" />
        <FormButton title="Add" onPress={handleSubmit} color="#28a745" />
      </View>
    </View>
  );
};

const FormButton: React.FC<{ title: string; onPress: () => void; color: string }> = ({ title, onPress, color }) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      { backgroundColor: color, opacity: pressed ? 0.8 : 1 },
    ]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  fieldContainer: {
    marginBottom: 20,
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 200 : 50,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    color: '#333',
    backgroundColor: '#f8f9fa',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default TimeZoneForm;
