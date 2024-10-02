// app/CustomDrawerContent.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  type ScrollView,
  type ScrollViewProps,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Link, useRouter } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CustomDrawerContent(props: React.JSX.IntrinsicAttributes & ScrollViewProps & { children: React.ReactNode; } & React.RefAttributes<ScrollView>) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const router = useRouter();

  const toggleCalendar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCalendarOpen(!calendarOpen);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Home */}
      <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/')}>
        <Ionicons name="home-outline" size={24} color="#333" style={styles.icon} />
        <Text style={styles.drawerLabel}>Home</Text>
      </TouchableOpacity>

      {/* Time Zones Convert */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => router.push('/TimeZonesConverter')}
      >
        <Feather name="clock" size={24} color="#333" style={styles.icon} />
        <Text style={styles.drawerLabel}>Time Zones Convert</Text>
      </TouchableOpacity>

      {/* Date Difference */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => router.push('/DateCalculation')}
      >
        <Octicons name="diff-added" size={24} color="#333" style={styles.icon} />
        <Text style={styles.drawerLabel}>Date Difference</Text>
      </TouchableOpacity>

      {/* Calendar Convert Category */}
      <TouchableOpacity style={styles.drawerItem} onPress={toggleCalendar}>
        <Feather name="calendar" size={24} color="#333" style={styles.icon} />
        <Text style={styles.categoryTitle}>Calendar Convert</Text>
        <Ionicons
          name={calendarOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#333"
          style={styles.chevron}
        />
      </TouchableOpacity>
      {calendarOpen && (
        <View style={styles.subItemsContainer}>
          {/* Gregorian Converter */}
          <Link href="/CalendarConvert/GregorianConverter" asChild>
            <TouchableOpacity style={styles.subItem}>
              <Ionicons name="calendar-outline" size={20} color="#666" style={styles.subIcon} />
              <Text style={styles.subItemText}>Gregorian Converter</Text>
            </TouchableOpacity>
          </Link>
          {/* Persian to Hebrew Converter */}
          <Link href="/CalendarConvert/PersianToHebrewConverter" asChild>
            <TouchableOpacity style={styles.subItem}>
              <Ionicons name="swap-horizontal-outline" size={20} color="#666" style={styles.subIcon} />
              <Text style={styles.subItemText}>Persian to Hebrew</Text>
            </TouchableOpacity>
          </Link>
          {/* Hebrew to Chinese Converter */}
          <Link href="/CalendarConvert/HebrewToChineseConverter" asChild>
            <TouchableOpacity style={styles.subItem}>
              <Ionicons name="swap-horizontal-outline" size={20} color="#666" style={styles.subIcon} />
              <Text style={styles.subItemText}>Hebrew to Chinese</Text>
            </TouchableOpacity>
          </Link>
          {/* Add more sub-items as needed */}
        </View>
      )}

      {/* About */}
      <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/About')}>
        <Feather name="info" size={24} color="#333" style={styles.icon} />
        <Text style={styles.drawerLabel}>About</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'pink', // Drawer background color
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 5,
  },
  drawerLabel: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  categoryTitle: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  icon: {
    width: 24,
    textAlign: 'center',
  },
  chevron: {
    marginLeft: 'auto',
  },
  subItemsContainer: {
    paddingLeft: 40,
    marginTop: 5,
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  subIcon: {
    width: 20,
    textAlign: 'center',
  },
  subItemText: {
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
});
