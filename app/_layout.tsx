// app/_layout.tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import CustomDrawerContent from './CustomDrawerContent';
import { useRouter } from 'expo-router'
export default function Layout ()
{
  const router = useRouter();
  return (
    <GestureHandlerRootView style={ { flex: 1 } }>
      <Drawer
        drawerContent={ ( props ) => <CustomDrawerContent children={ undefined } { ...props } /> }
        screenOptions={ ( { navigation } ) => ( {
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: 'white',
            width: 250,
          },
          headerStyle: {
            backgroundColor: '#3696eb',
          },
          headerTitleStyle: {
            fontFamily: 'Arial',
            fontSize: 20,
            color: 'white',
          },
          drawerLabelStyle: {
            fontFamily: 'Arial',
            fontSize: 16,
          },
          drawerActiveTintColor: 'purple',
          drawerInactiveTintColor: 'gray',
          headerLeft: () => (
            <TouchableOpacity
              onPress={ () => navigation.dispatch( DrawerActions.toggleDrawer() ) }
              style={ { marginLeft: 16 } }
            >
              <Ionicons name='menu' size={ 32 } color='white' />
            </TouchableOpacity>
          ),
        } ) }
      >
        <Drawer.Screen
          name='index'
          options={ {
            title: 'Time Zoner',
            headerRight: () => (
              <Feather
                name='settings'
                size={ 24 }
                color='#FF9874'
                onPress={ () => router.push( '/Settings' ) }
                style={ { marginRight: 20 } }
              />
            ),
          } }
        />
        <Drawer.Screen
          name='TimeZonesConverter'
          options={ {
            title: 'Time Zones Convert',
            headerRight: () => (
              <Octicons
                name='home'
                size={ 24 }
                color='#FF9874'
                onPress={ () => router.push( '/' ) }
                style={ { marginRight: 20 } }
              />
            ),
          } }
        />
        <Drawer.Screen
          name='DateDifference'
          options={ {
            title: 'Date Difference',
            headerRight: () => (
              <Feather
                name='home'
                size={ 30 }
                color='purple'
                onPress={ () => router.push( '/' ) }
                style={ { marginRight: 10 } }
              />
            ),
          } }
        />
        <Drawer.Screen
          name='CalendarConvert'
          options={ {
            title: 'Convert Calendars',
            headerRight: () => (
              <Feather
                name='home'
                size={ 30 }
                color='purple'
                onPress={ () => router.push( '/' ) }
                style={ { marginRight: 10 } }
              />
            ),
          } }

        />
        <Drawer.Screen
          name='Settings'
          options={ {
            title: 'Settings',
            headerRight: () => (
              <Feather
                name='clock'
                size={ 30 }
                color='purple'
                onPress={ () => router.push( '/TimeZonesConverter' ) }
                style={ { marginRight: 10 } }
              />
            ),
          } }

        />
        <Drawer.Screen
          name='About'
          options={ {
            title: 'About',
            headerRight: () => (
              <Feather
                name='home'
                size={ 24 }
                color='purple'
                onPress={ () => router.push( '/' ) }
                style={ { marginRight: 10 } }
              />
            ),
          } }
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
