// CalculatedTimeDifference.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CalculatedTimeDifferenceProps {
    diff: {
        years: number;
        months: number;
        weeks: number;
        days: number;
    };
}

const CalculatedTimeDifference = ({ diff }: CalculatedTimeDifferenceProps) => (
    <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Years: {diff.years}</Text>
        <Text style={styles.resultText}>Months: {diff.months}</Text>
        <Text style={styles.resultText}>Weeks: {diff.weeks}</Text>
        <Text style={styles.resultText}>Days: {diff.days}</Text>
    </View>
);

const styles = StyleSheet.create({
    resultContainer: {
        padding: 20,
        margin: 12,
        backgroundColor: '#e0ffff',
        alignItems: 'center',
    },
    resultText: {
        fontSize: 16,
        color: '#333',
    },
});

export default CalculatedTimeDifference;
