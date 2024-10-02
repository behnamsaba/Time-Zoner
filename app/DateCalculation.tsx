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
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
        <View style={styles.inputWrapper}>
            <Ionicons name="calendar-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={label}
                keyboardType='numeric'
                maxLength={4}
                placeholderTextColor="#999"
            />
        </View>
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
                    <LinearGradient
                        colors={['#FFDEE9', '#B5FFFC']}
                        style={styles.header}>
                        <Text style={styles.heading}>
                            Calculate Date Difference
                        </Text>
                    </LinearGradient>

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
                        style={({ pressed }) => [
                            styles.button,
                            pressed && styles.buttonPressed
                        ]}
                        onPress={handleSubmit}>
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.buttonGradient}>
                            <Text style={styles.buttonText}>
                                <Ionicons name="calculator-outline" size={20} color="#fff" /> Calculate Difference
                            </Text>
                        </LinearGradient>
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
        backgroundColor: '#F0F4F7',
    } as ViewStyle,
    container: {
        flex: 1,
    } as ViewStyle,
    scrollContent: {
        padding: 20,
    } as ViewStyle,
    header: {
        padding: 20,
        borderRadius: 15,
        marginBottom: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
    } as TextStyle,
    dateInputGroup: {
        marginBottom: 20,
    } as ViewStyle,
    dateLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginBottom: 10,
    } as TextStyle,
    dateInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    } as ViewStyle,
    inputContainer: {
        flex: 1,
        marginHorizontal: 5,
    } as ViewStyle,
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    } as TextStyle,
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 10,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
    } as ViewStyle,
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 45,
        fontSize: 16,
        color: '#333',
    } as TextStyle,
    button: {
        marginTop: 10,
    } as ViewStyle,
    buttonGradient: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        flexDirection: 'row',
        alignItems: 'center',
    } as TextStyle,
    buttonPressed: {
        opacity: 0.8,
    },
});

export default DateCalculations;
