// app/CalendarConvert/CalendarConverter.tsx

import React, { useState, useEffect } from 'react';
import
    {
        StyleSheet,
        Text,
        ScrollView,
        KeyboardAvoidingView,
        Platform,
        Pressable,
        View,
        ActivityIndicator,
        Alert,
    } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import ConversionResults from '@/components/ConversionResults';
import { CalendarConverter, CalendarType } from '@/utils/calendar-converters';
import
    {
        CalendarDate,
        PersianDate,
        ArabicDate,
        HebrewDate,
        ChineseDate,
        gregorianMonthItems,
        persianMonthItems,
        arabicMonthItems,
        hebrewMonthItems,
        chineseMonthItems,
    } from '@/utils/calender-types';

const CalendarConverterComponent = () =>
{
    const [ sourceCalendar, setSourceCalendar ] = useState<CalendarType>( CalendarType.Gregorian );
    const [ targetCalendar, setTargetCalendar ] = useState<CalendarType>( CalendarType.Persian );
    const [ inputDate, setInputDate ] = useState<{
        year: string;
        month: string;
        day: string;
        cycle?: string;
        leap?: string;
    }>( {
        year: '',
        month: '',
        day: '',
        cycle: '',
        leap: '',
    } );
    const [ outputDate, setOutputDate ] = useState<{ [ key: string ]: string } | null>( null );
    const [ loading, setLoading ] = useState( false );

    const calendarConverter = new CalendarConverter();

    const [ yearItems, setYearItems ] = useState<Array<{ label: string; value: string }>>( [] );
    const [ monthItems, setMonthItems ] = useState<Array<{ label: string; value: string }>>( [] );
    const [ cycleItems, setCycleItems ] = useState<Array<{ label: string; value: string }>>( [] );
    const [ leapItems, setLeapItems ] = useState<Array<{ label: string; value: string }>>( [] );

    useEffect( () =>
    {
        // Update month items based on source calendar
        switch ( sourceCalendar )
        {
            case CalendarType.Gregorian:
                setMonthItems( gregorianMonthItems );
                setInputDate( ( prev ) => ( { ...prev, month: '01' } ) );
                break;
            case CalendarType.Persian:
                setMonthItems( persianMonthItems );
                setInputDate( ( prev ) => ( { ...prev, month: '01' } ) );
                break;
            case CalendarType.Arabic:
                setMonthItems( arabicMonthItems );
                setInputDate( ( prev ) => ( { ...prev, month: '01' } ) );
                break;
            case CalendarType.Hebrew:
                setMonthItems( hebrewMonthItems.map( item => ( { label: item.label, value: item.value } ) ) );
                setInputDate( ( prev ) => ( { ...prev, month: hebrewMonthItems[ 0 ].value } ) );
                break;
            case CalendarType.Chinese:
                setMonthItems( chineseMonthItems.map( item => ( { label: item.label, value: item.value } ) ) );
                setInputDate( ( prev ) => ( { ...prev, month: chineseMonthItems[ 0 ].value } ) );
                break;
            default:
                setMonthItems( [] );
        }

        // Update year items based on source calendar
        switch ( sourceCalendar )
        {
            case CalendarType.Gregorian:
                const currentYear = new Date().getFullYear();
                const gregorianYears = Array.from( { length: 201 }, ( _, i ) => ( {
                    label: String( currentYear - 100 + i ),
                    value: String( currentYear - 100 + i ),
                } ) );
                setYearItems( gregorianYears );
                setInputDate( ( prev ) => ( { ...prev, year: String( currentYear ) } ) );
                break;
            case CalendarType.Persian:
                const persianYears = Array.from( { length: 101 }, ( _, i ) => ( {
                    label: String( 1300 + i ),
                    value: String( 1450 + i ),
                } ) );
                setYearItems( persianYears );
                setInputDate( ( prev ) => ( { ...prev, year: '1403' } ) );
                break;
            case CalendarType.Arabic:
                const arabicYears = Array.from( { length: 101 }, ( _, i ) => ( {
                    label: String( 1350 + i ),
                    value: String( 1350 + i ),
                } ) );
                setYearItems( arabicYears );
                setInputDate( ( prev ) => ( { ...prev, year: '1446' } ) );
                break;
            case CalendarType.Hebrew:
                const hebrewYears = Array.from( { length: 101 }, ( _, i ) => ( {
                    label: String( 5780 + i ),
                    value: String( 5780 + i ),
                } ) );
                setYearItems( hebrewYears );
                setInputDate( ( prev ) => ( { ...prev, year: '5785' } ) );
                break;
            case CalendarType.Chinese:
                const chineseYears = Array.from( { length: 60 }, ( _, i ) => ( {
                    label: String( 1 + i ),
                    value: String( 1 + i ),
                } ) );
                setYearItems( chineseYears );
                setInputDate( ( prev ) => ( { ...prev, year: '1' } ) );
                break;
            default:
                setYearItems( [] );
        }

        // Update cycle and leap items if source is Chinese
        if ( sourceCalendar === CalendarType.Chinese )
        {
            const chineseCycleOptions = [
                { label: '75', value: '75' },
                { label: '76', value: '76' },
                { label: '77', value: '77' },
                { label: '78', value: '78' },
            ];
            setCycleItems( chineseCycleOptions );
            setInputDate( ( prev ) => ( { ...prev, cycle: '1' } ) );

            const leapOptions = [
                { label: 'No', value: '0' },
                { label: 'Yes', value: '1' },
            ];
            setLeapItems( leapOptions );
            setInputDate( ( prev ) => ( { ...prev, leap: '0' } ) );
        } else
        {
            setCycleItems( [] );
            setLeapItems( [] );
            setInputDate( ( prev ) =>
            {
                const { cycle, leap, ...rest } = prev;
                return rest;
            } );
        }

        // If targetCalendar is same as sourceCalendar, change targetCalendar
        if ( sourceCalendar === targetCalendar )
        {
            const availableCalendars = Object.values( CalendarType ).filter( calendar => calendar !== sourceCalendar );
            setTargetCalendar( availableCalendars[ 0 ] || CalendarType.Gregorian );
        }
    }, [ sourceCalendar ] );

    const dayItems = Array.from( { length: 31 }, ( _, i ) => ( {
        label: String( i + 1 ),
        value: String( i + 1 ).padStart( 2, '0' ),
    } ) );

    const handleConversion = () =>
    {
        setLoading( true );
        setOutputDate( null );

        try
        {
            let sourceDate: CalendarDate;

            switch ( sourceCalendar )
            {
                case CalendarType.Gregorian:
                    sourceDate = new Date(
                        parseInt( inputDate.year, 10 ),
                        parseInt( inputDate.month, 10 ) - 1,
                        parseInt( inputDate.day, 10 )
                    );
                    break;
                case CalendarType.Persian:
                    sourceDate = {
                        year: parseInt( inputDate.year, 10 ),
                        month: parseInt( inputDate.month, 10 ),
                        day: parseInt( inputDate.day, 10 ),
                    };
                    break;
                case CalendarType.Arabic:
                    sourceDate = {
                        year: parseInt( inputDate.year, 10 ),
                        month: parseInt( inputDate.month, 10 ),
                        day: parseInt( inputDate.day, 10 ),
                    };
                    break;
                case CalendarType.Hebrew:
                    sourceDate = {
                        year: parseInt( inputDate.year, 10 ),
                        month: inputDate.month as HebrewDate[ 'month' ],
                        day: parseInt( inputDate.day, 10 ),
                    };
                    break;
                case CalendarType.Chinese:
                    sourceDate = {
                        cycle: parseInt( inputDate.cycle || '1', 10 ),
                        year: parseInt( inputDate.year, 10 ),
                        month: inputDate.month as ChineseDate[ 'month' ],
                        day: parseInt( inputDate.day, 10 ),
                        leap: inputDate.leap === '1',
                    };
                    break;
                default:
                    throw new Error( 'Unsupported source calendar.' );
            }

            const convertedDate = calendarConverter.convert( sourceCalendar, targetCalendar, sourceDate );

            if ( convertedDate )
            {
                let formattedDate = '';

                switch ( targetCalendar )
                {
                    case CalendarType.Gregorian:
                        if ( convertedDate instanceof Date )
                        {
                            formattedDate = `${ convertedDate.getFullYear() }-${ String( convertedDate.getMonth() + 1 ).padStart( 2, '0' ) }-${ String( convertedDate.getDate() ).padStart( 2, '0' ) }`;
                        }
                        break;
                    case CalendarType.Persian:
                        if ( 'year' in convertedDate && 'month' in convertedDate && 'day' in convertedDate )
                        {
                            formattedDate = `${ convertedDate.year }/${ String( convertedDate.month ).padStart( 2, '0' ) }/${ String( convertedDate.day ).padStart( 2, '0' ) }`;
                        }
                        break;
                    case CalendarType.Arabic:
                        if ( 'year' in convertedDate && 'month' in convertedDate && 'day' in convertedDate )
                        {
                            formattedDate = `${ convertedDate.year }-${ String( convertedDate.month ).padStart( 2, '0' ) }-${ String( convertedDate.day ).padStart( 2, '0' ) }`;
                        }
                        break;
                    case CalendarType.Hebrew:
                        if ( 'year' in convertedDate && 'month' in convertedDate && 'day' in convertedDate )
                        {
                            formattedDate = `${ convertedDate.day } ${ convertedDate.month } ${ convertedDate.year }`;
                        }
                        break;
                    case CalendarType.Chinese:
                        if ( 'cycle' in convertedDate && 'year' in convertedDate && 'month' in convertedDate && 'day' in convertedDate )
                        {
                            formattedDate = `Cycle ${ convertedDate.cycle }, Year ${ convertedDate.year }, ${ convertedDate.month }${ convertedDate.leap ? ' (Leap Month)' : '' }, Day ${ convertedDate.day }`;
                        }
                        break;
                    default:
                        formattedDate = 'Unsupported target calendar.';
                }

                setOutputDate( {
                    [ targetCalendar ]: formattedDate,
                } );
            } else
            {
                Alert.alert( 'Conversion Error', 'Failed to convert the date.' );
            }
        } catch ( error )
        {
            console.error( 'Error during conversion:', error );
            Alert.alert( 'Conversion Error', 'An unexpected error occurred.' );
        } finally
        {
            setLoading( false );
        }
    };

    return (
        <SafeAreaView style={ styles.safeArea }>
            <KeyboardAvoidingView
                style={ styles.container }
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
            >
                <ScrollView
                    contentContainerStyle={ styles.scrollContent }
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={ styles.heading }>Calendar Converter</Text>

                    {/* Source Calendar Picker */ }
                    <View style={ styles.pickerContainer }>
                        <Text style={ styles.pickerLabel }>Source Calendar</Text>
                        <Picker
                            selectedValue={ sourceCalendar }
                            onValueChange={ ( itemValue ) => setSourceCalendar( itemValue ) }
                            style={ styles.picker }
                            dropdownIconColor="#333"
                        >
                            { Object.values( CalendarType ).map( ( calendar ) => (
                                <Picker.Item key={ calendar } label={ calendar } value={ calendar } />
                            ) ) }
                        </Picker>
                    </View>

                    {/* Target Calendar Picker */ }
                    <View style={ styles.pickerContainer }>
                        <Text style={ styles.pickerLabel }>Target Calendar</Text>
                        <Picker
                            selectedValue={ targetCalendar }
                            onValueChange={ ( itemValue ) => setTargetCalendar( itemValue ) }
                            style={ styles.picker }
                            dropdownIconColor="#333"
                        >
                            { Object.values( CalendarType )
                                .filter( calendar => calendar !== sourceCalendar ) // Exclude source calendar
                                .map( ( calendar ) => (
                                    <Picker.Item key={ calendar } label={ calendar } value={ calendar } />
                                ) ) }
                        </Picker>
                    </View>

                    {/* Date Inputs */ }
                    <View style={ styles.calendarInputGroup }>
                        <View style={ styles.calendarInputRow }>
                            {/* Year Picker */ }
                            <View style={ styles.inputContainer }>
                                <Text style={ styles.inputLabel }>Year</Text>
                                <Picker
                                    selectedValue={ inputDate.year }
                                    onValueChange={ ( value ) =>
                                        setInputDate( { ...inputDate, year: value } )
                                    }
                                    style={ styles.picker }
                                    dropdownIconColor="#333"
                                >
                                    { yearItems.map( ( item ) => (
                                        <Picker.Item key={ item.value } label={ item.label } value={ item.value } />
                                    ) ) }
                                </Picker>
                            </View>

                            {/* Cycle Picker (only for Chinese source) */ }
                            { sourceCalendar === CalendarType.Chinese && (
                                <View style={ styles.inputContainer }>
                                    <Text style={ styles.inputLabel }>Cycle</Text>
                                    <Picker
                                        selectedValue={ inputDate.cycle }
                                        onValueChange={ ( value ) =>
                                            setInputDate( { ...inputDate, cycle: value } )
                                        }
                                        style={ styles.picker }
                                        dropdownIconColor="#333"
                                    >
                                        { cycleItems.map( ( item ) => (
                                            <Picker.Item key={ item.value } label={ item.label } value={ item.value } />
                                        ) ) }
                                    </Picker>
                                </View>
                            ) }

                            {/* Month Picker */ }
                            <View style={ styles.inputContainer }>
                                <Text style={ styles.inputLabel }>Month</Text>
                                <Picker
                                    selectedValue={ inputDate.month }
                                    onValueChange={ ( value ) =>
                                        setInputDate( { ...inputDate, month: value } )
                                    }
                                    style={ styles.picker }
                                    dropdownIconColor="#333"
                                >
                                    { monthItems.map( ( item ) => (
                                        <Picker.Item key={ item.value } label={ item.label } value={ item.value } />
                                    ) ) }
                                </Picker>
                            </View>

                            {/* Leap Picker (only for Chinese source) */ }
                            { sourceCalendar === CalendarType.Chinese && (
                                <View style={ styles.inputContainer }>
                                    <Text style={ styles.inputLabel }>Leap Month</Text>
                                    <Picker
                                        selectedValue={ inputDate.leap }
                                        onValueChange={ ( value ) =>
                                            setInputDate( { ...inputDate, leap: value } )
                                        }
                                        style={ styles.picker }
                                        dropdownIconColor="#333"
                                    >
                                        { leapItems.map( ( item ) => (
                                            <Picker.Item key={ item.value } label={ item.label } value={ item.value } />
                                        ) ) }
                                    </Picker>
                                </View>
                            ) }

                            {/* Day Picker */ }
                            <View style={ styles.inputContainer }>
                                <Text style={ styles.inputLabel }>Day</Text>
                                <Picker
                                    selectedValue={ inputDate.day }
                                    onValueChange={ ( value ) =>
                                        setInputDate( { ...inputDate, day: value } )
                                    }
                                    style={ styles.picker }
                                    dropdownIconColor="#333"
                                >
                                    { dayItems.map( ( item ) => (
                                        <Picker.Item key={ item.value } label={ item.label } value={ item.value } />
                                    ) ) }
                                </Picker>
                            </View>
                        </View>
                    </View>

                    {/* Submit Button */ }
                    <Pressable
                        style={ styles.button }
                        onPress={ handleConversion }
                        disabled={ loading }
                    >
                        { loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={ styles.buttonText }>Convert Date</Text>
                        ) }
                    </Pressable>

                    {/* Display Results */ }
                    { outputDate && <ConversionResults results={ outputDate } /> }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create( {
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 24,
        textAlign: 'center',
    },
    pickerContainer: {
        marginBottom: 16,
    },
    pickerLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
    },
    calendarInputGroup: {
        marginBottom: 16,
    },
    calendarInputRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 4,
        minWidth: '45%', // Adjusted for better layout on smaller screens
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
} );

export default CalendarConverterComponent;
