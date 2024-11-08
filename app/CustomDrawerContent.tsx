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
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Link, useRouter } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CustomDrawerContent(
  props: React.JSX.IntrinsicAttributes &
    ScrollViewProps & { children: React.ReactNode } & React.RefAttributes<ScrollView>
) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const router = useRouter();

  const toggleCalendar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCalendarOpen(!calendarOpen);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={60} color="#4F8EF7" />
        <Text style={styles.headerText}>Welcome!</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Home */}
      <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/')}>
        <Ionicons name="home-outline" size={24} color="#4F8EF7" style={styles.icon} />
        <Text style={styles.drawerLabel}>Home</Text>
      </TouchableOpacity>

      {/* Time Zones Convert */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => router.push('/TimeZonesConverter')}
      >
        <Feather name="clock" size={24} color="#4F8EF7" style={styles.icon} />
        <Text style={styles.drawerLabel}>Time Zones Convert</Text>
      </TouchableOpacity>

      {/* Date Difference */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => router.push('/DateDifference')}
      >
        <Octicons name="diff-added" size={24} color="#4F8EF7" style={styles.icon} />
        <Text style={styles.drawerLabel}>Date Difference</Text>
      </TouchableOpacity>

      {/* Calendar Convert Category */}
      <TouchableOpacity style={styles.drawerItem} onPress={toggleCalendar}>
        <Feather name="calendar" size={24} color="#4F8EF7" style={styles.icon} />
        <Text style={styles.categoryTitle}>Calendar Convert</Text>
        <Ionicons
          name={calendarOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#4F8EF7"
          style={styles.chevron}
        />
      </TouchableOpacity>
      {calendarOpen && (
        <View style={styles.subItemsContainer}>
          {/* Gregorian Converter */}
          <Link href="/CalendarConvert/GregorianConverter" asChild>
            <TouchableOpacity style={styles.subItem}>
              <Ionicons name="calendar-outline" size={20} color="#6C757D" style={styles.subIcon} />
              <Text style={styles.subItemText}>Gregorian Converter</Text>
            </TouchableOpacity>
          </Link>
          {/* Other Calendars Converter */}
          <Link href="/CalendarConvert/CalendarConverterComponent" asChild>
            <TouchableOpacity style={styles.subItem}>
              <MaterialIcons name="language" size={20} color="#6C757D" style={styles.subIcon} />
              <Text style={styles.subItemText}>Other Calendars</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {/* Divider */}
      <View style={styles.divider} />

      {/* About */}
      <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/About')}>
        <Feather name="info" size={24} color="#4F8EF7" style={styles.icon} />
        <Text style={styles.drawerLabel}>About</Text>
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/Settings')}>
        <Ionicons name="settings-outline" size={24} color="#4F8EF7" style={styles.icon} />
        <Text style={styles.drawerLabel}>Settings</Text>
      </TouchableOpacity>

      {/* Help */}
      <TouchableOpacity style={styles.drawerItem} onPress={() => router.push('/Help')}>
        <Feather name="help-circle" size={24} color="#4F8EF7" style={styles.icon} />
        <Text style={styles.drawerLabel}>Help</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  drawerLabel: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
  },
  categoryTitle: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 2,
  },
  subIcon: {
    width: 20,
    textAlign: 'center',
  },
  subItemText: {
    fontSize: 14,
    color: '#6C757D',
    marginLeft: 12,
  },
});
