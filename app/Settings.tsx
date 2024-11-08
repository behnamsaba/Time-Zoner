// src/screens/Settings.tsx

import React, { useEffect } from 'react';
import { 
    Text, 
    View, 
    Switch, 
    StyleSheet 
} from 'react-native';
import TimeZonesList from '@/components/TimeZonesList';
import { useStore } from '../store';

const Settings = () => {
    const { is24Hour, loadTimeFormat, toggleTimeFormat } = useStore();

    // Load time format setting when component mounts
    useEffect(() => {
        loadTimeFormat();
    }, []);

    return (
        <View style={styles.container}>
            {/* Time Format Toggle */}
            <View style={styles.settingItem}>
                <Text style={styles.label}>24-Hour Format</Text>
                <Switch
                    value={is24Hour}
                    onValueChange={toggleTimeFormat}
                />
            </View>

            {/* Manage Time Zones Section */}
            <View style={styles.timeZonesSection}>
                <TimeZonesList />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
    },
    timeZonesSection: {
        marginTop: 30,
        flex: 1,
    },
});

export default Settings;
