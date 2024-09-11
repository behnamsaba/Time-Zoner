// DateCalculationsForm.tsx
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Pressable,
    View,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { calculateDateDifference } from '@/utils/calculateDateDifference';
import CalculatedTimeDifference from '@/components/CalculatedTimeDifference';

interface DateDifference {
    years: number;
    months: number;
    weeks: number;
    days: number;
}

interface DateInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({
    label,
    value,
    onChangeText,
}) => (
    <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={label}
            keyboardType='numeric'
            maxLength={4}
        />
    </View>
);

const DateCalculations: React.FC = () => {
    const [startDate, setStartDate] = useState({
        year: '',
        month: '',
        day: '',
    });
    const [endDate, setEndDate] = useState({ year: '', month: '', day: '' });
    const [targetTime, setTargetTime] = useState<DateDifference | null>(null);

    const handleSubmit = () => {
        const { year: startYear, month: startMonth, day: startDay } = startDate;
        const { year: endYear, month: endMonth, day: endDay } = endDate;

        if (
            !startYear ||
            !startMonth ||
            !startDay ||
            !endYear ||
            !endMonth ||
            !endDay
        ) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        const formattedStartDate = `${startYear}-${startMonth.padStart(
            2,
            '0'
        )}-${startDay.padStart(2, '0')}`;
        const formattedEndDate = `${endYear}-${endMonth.padStart(
            2,
            '0'
        )}-${endDay.padStart(2, '0')}`;

        const diff = calculateDateDifference(
            formattedStartDate,
            formattedEndDate
        );
        setTargetTime(diff);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps='handled'>
                    <Text style={styles.heading}>
                        Calculate Date Difference
                    </Text>

                    <View style={styles.dateInputGroup}>
                        <Text style={styles.dateLabel}>Start Date</Text>
                        <View style={styles.dateInputRow}>
                            <DateInput
                                label='Year'
                                value={startDate.year}
                                onChangeText={(text) =>
                                    setStartDate({ ...startDate, year: text })
                                }
                            />
                            <DateInput
                                label='Month'
                                value={startDate.month}
                                onChangeText={(text) =>
                                    setStartDate({ ...startDate, month: text })
                                }
                            />
                            <DateInput
                                label='Day'
                                value={startDate.day}
                                onChangeText={(text) =>
                                    setStartDate({ ...startDate, day: text })
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.dateInputGroup}>
                        <Text style={styles.dateLabel}>End Date</Text>
                        <View style={styles.dateInputRow}>
                            <DateInput
                                label='Year'
                                value={endDate.year}
                                onChangeText={(text) =>
                                    setEndDate({ ...endDate, year: text })
                                }
                            />
                            <DateInput
                                label='Month'
                                value={endDate.month}
                                onChangeText={(text) =>
                                    setEndDate({ ...endDate, month: text })
                                }
                            />
                            <DateInput
                                label='Day'
                                value={endDate.day}
                                onChangeText={(text) =>
                                    setEndDate({ ...endDate, day: text })
                                }
                            />
                        </View>
                    </View>

                    <Pressable
                        style={styles.button}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonText}>
                            Calculate Difference
                        </Text>
                    </Pressable>

                    {targetTime && (
                        <CalculatedTimeDifference diff={targetTime} />
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Light gray background
    } as ViewStyle,
    container: {
        flex: 1,
    } as ViewStyle,
    scrollContent: {
        padding: 16,
    } as ViewStyle,
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 24,
        textAlign: 'center',
    } as TextStyle,
    dateInputGroup: {
        marginBottom: 16,
    } as ViewStyle,
    dateLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
    } as TextStyle,
    dateInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    } as ViewStyle,
    inputContainer: {
        flex: 1,
        marginHorizontal: 4,
    } as ViewStyle,
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    } as TextStyle,
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#FFF',
    } as TextStyle,
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    } as ViewStyle,
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    } as TextStyle,
});

export default DateCalculations;
