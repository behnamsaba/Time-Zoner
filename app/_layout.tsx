import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
    const navigation = useNavigation();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={({ navigation }) => ({
                    drawerType: 'front',
                    drawerStyle: {
                        backgroundColor: 'pink',
                    },
                    headerStyle: {
                        backgroundColor: '#f4511e',
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
                            onPress={() => navigation.toggleDrawer()}
                            style={{ marginLeft: 16 }}>
                            <Ionicons
                                name='menu'
                                size={32}
                                color='white'
                            />
                        </TouchableOpacity>
                    ),
                })}>
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
                                    color='#FF9874'
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
                    name='DateCalculation'
                    options={{
                        drawerLabel: 'Date Difference',
                        title: 'Date Difference',
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
