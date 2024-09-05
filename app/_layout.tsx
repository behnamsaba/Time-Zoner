import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';

export default function Layout() {
    const navigation = useNavigation();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name='index'
                    options={{
                        drawerLabel: 'Home',
                        title: 'Time Zoner',
                        headerRight: () => (
                            <>
                                <Octicons
                                    name='info'
                                    size={24}
                                    color='purple'
                                    onPress={() =>
                                        navigation.dispatch(
                                            DrawerActions.jumpTo('About')
                                        )
                                    }
                                    style={{ marginRight: 20 }}
                                />
                            </>
                        ),
                        
                    }}
                />
                <Drawer.Screen
                    name='TimeDifference'
                    options={{
                        drawerLabel: 'Convert Time Zones',
                        title: 'Convert Time Zones',
                        headerRight: () => (
                            <>
                                <Feather
                                    name='home'
                                    size={30}
                                    color='purple'
                                    onPress={() =>
                                        navigation.dispatch(
                                            DrawerActions.jumpTo('index')
                                        )
                                    }
                                    style={{ marginRight: 10 }}
                                />
                            </>
                        ),
                    }}
                />
                <Drawer.Screen
                    name='CalenderConvert'
                    options={{
                        drawerLabel: 'Convert Calendars',
                        title: 'Convert Calendars',
                        headerRight: () => (
                            <>
                                <Feather
                                    name='home'
                                    size={30}
                                    color='purple'
                                    onPress={() =>
                                        navigation.dispatch(
                                            DrawerActions.jumpTo('index')
                                        )
                                    }
                                    style={{ marginRight: 10 }}
                                />
                            </>
                        ),
                    }}
                />
                <Drawer.Screen
                    name='About'
                    options={{
                        drawerLabel: 'About',
                        title: 'About',
                        headerRight: () => (
                            <>
                                <Feather
                                    name='home'
                                    size={24}
                                    color='purple'
                                    onPress={() =>
                                        navigation.dispatch(
                                            DrawerActions.jumpTo('index')
                                        )
                                    }
                                    style={{ marginRight: 10 }}
                                />
                            </>
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
