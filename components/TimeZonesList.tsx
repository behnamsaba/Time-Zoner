// src/components/TimeZonesList.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store';
import TimeZoneForm from './TimeZoneForm';
import type { SelectedTimeZone } from './types';

const TimeZonesList = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Accessing states and functions from the store
  const { timeZones, loadTimeZones, addTimeZone, deleteTimeZone } = useStore();

  useEffect(() => {
    loadTimeZones();
  }, []);

  const handleAddTimeZone = (newZone: SelectedTimeZone) => {
    addTimeZone(newZone);
    setIsModalVisible(false);
  };

  const handleDeleteTimeZone = (iana: string) => {
    Alert.alert(
      'Delete Time Zone',
      'Are you sure you want to delete this time zone?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTimeZone(iana) },
      ]
    );
  };

  /// Fix item type later
  const renderItem = ({ item } : any   ) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.timeZoneLabel}>{item.label}</Text>
        <Text style={styles.timeZoneName}>{item.jsName}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteTimeZone(item.iana)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Time Zones</Text>

      <FlatList
        data={timeZones}
        keyExtractor={(item) => item.iana}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No Time Zones Added</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Time Zone</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TimeZoneForm
              onSubmit={handleAddTimeZone}
              onCancel={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  timeZoneLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  timeZoneName: {
    fontSize: 14,
    color: '#6c757d',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 20,
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
});

export default TimeZonesList;
