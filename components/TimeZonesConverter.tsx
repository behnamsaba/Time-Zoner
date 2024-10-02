// CalculatedCalendar.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface TimeZonesConverterProps {
    results: {
        [key: string]: string;
    };
}

const TimeZonesConverter: React.FC<TimeZonesConverterProps> = ({ results }) => {
    const gradientColors = [
        ['#FF9A8B', '#FF6A88'],
        ['#FFECD2', '#FCB69F'],
        ['#A1C4FD', '#C2E9FB'],
        ['#84FAB0', '#8FD3F4'],
        ['#FDA085', '#F6D365'],
        ['#BFE9FF', '#FF6E7F'],
        ['#D4FC79', '#96E6A1'],
        ['#E2B0FF', '#9F44D3'],
        ['#F5F7FA', '#C3CFE2'],
        ['#FDFCFB', '#E2D1C3'],
        ['#FFF1EB', '#ACE0F9'],
        ['#FFE29F', '#FFA99F'],
        ['#C1FCD3', '#F7797D'],
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Conversion Results</Text>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {Object.entries(results).map(([calendar, date], index) => (
                    <LinearGradient
                        key={calendar}
                        colors={gradientColors[index % gradientColors.length]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.resultItem}
                    >
                        <Text style={styles.calendarName}>{calendar}</Text>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>{date}</Text>
                        </View>
                    </LinearGradient>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        backgroundColor: '#006994',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    } as ViewStyle,
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#ffff',
        textAlign: 'center',
    } as TextStyle,
    scrollContent: {
        paddingBottom: 8,
    } as ViewStyle,
    resultItem: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 8,
    } as ViewStyle,
    calendarName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#006994',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    } as TextStyle,
    dateContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 8,
        padding: 8,
    } as ViewStyle,
    date: {
        fontSize: 16,
        color: '#006994',
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    } as TextStyle,
});

export default TimeZonesConverter;