// src/store.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { SelectedTimeZone } from './components/types';
import { Alert } from 'react-native';

const TIME_ZONES_STORAGE_KEY = process.env.EXPO_PUBLIC_TIME_ZONES_STORAGE_KEY || 'development_key';
const TIME_FORMAT_STORAGE_KEY = process.env.EXPO_PUBLIC_TIME_FORMAT_STORAGE_KEY || 'development_key';

console.log('TIME_ZONES_STORAGE_KEY:', TIME_ZONES_STORAGE_KEY);
console.log('TIME_FORMAT_STORAGE_KEY:', TIME_FORMAT_STORAGE_KEY);

type StoreState = {
  timeZones: SelectedTimeZone[];
  is24Hour: boolean;
  loadTimeFormat: () => Promise<void>;
  loadTimeZones: () => Promise<void>;
  toggleTimeFormat: () => Promise<void>;
  addTimeZone: (newZone: SelectedTimeZone) => void;
  deleteTimeZone: (iana: string) => void;
};

export const useStore = create<StoreState>((set) => ({
  timeZones: [],
  is24Hour: false,

  loadTimeFormat: async () => {
    try {
      const format = await AsyncStorage.getItem(TIME_FORMAT_STORAGE_KEY);
      set({ is24Hour: format === '24' });
    } catch (error) {
      console.error('Failed to load time format setting:', error);
    }
  },

  toggleTimeFormat: async () => {
    set((state) => {
      const newFormat = !state.is24Hour;
      AsyncStorage.setItem(TIME_FORMAT_STORAGE_KEY, newFormat ? '24' : '12').catch((error) =>
        console.error('Failed to save time format setting:', error)
      );
      return { is24Hour: newFormat };
    });
  },

  loadTimeZones: async () => {
    try {
      const storedZones = await AsyncStorage.getItem(TIME_ZONES_STORAGE_KEY);
      if (storedZones) {
        const parsedZones = JSON.parse(storedZones);
        if (Array.isArray(parsedZones)) {
          set({ timeZones: parsedZones });
        } else {
          set({ timeZones: [] });
        }
      }
    } catch (error) {
      console.error('Failed to load time zones:', error);
      set({ timeZones: [] });
    }
  },

  addTimeZone: (newZone) =>
    set((state) => {
      const currentZones = Array.isArray(state.timeZones) ? state.timeZones : [];
      if (currentZones.find((zone) => zone.iana === newZone.iana)) {
        Alert.alert('Duplicate Time Zone', 'This time zone is already added.');
        return state;
      }
      const updatedZones = [...currentZones, newZone];
      AsyncStorage.setItem(TIME_ZONES_STORAGE_KEY, JSON.stringify(updatedZones)).catch((error) =>
        console.error('Failed to save time zones:', error)
      );
      return { timeZones: updatedZones };
    }),

  deleteTimeZone: (iana) =>
    set((state) => {
      const currentZones = Array.isArray(state.timeZones) ? state.timeZones : [];
      const updatedZones = currentZones.filter((zone) => zone.iana !== iana);
      AsyncStorage.setItem(TIME_ZONES_STORAGE_KEY, JSON.stringify(updatedZones)).catch((error) =>
        console.error('Failed to save time zones:', error)
      );
      return { timeZones: updatedZones };
    }),
}));
