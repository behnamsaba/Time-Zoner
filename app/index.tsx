import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function Index() {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/splash.png')} // Ensure this path is correct
                style={styles.splash}
            />
            <Text style={styles.header}>Welcome to Time Zoner</Text>
            <Text style={styles.description}>
                Simplifies the process of converting time zones and dates across
                various calendar systems, including Chinese, Persian, Hebrew,
                and Indian. It's designed for ease of use, allowing you to
                manage events, calculate dates, or explore different calendars
                with just a few taps. Ideal for anyone dealing with global time
                differences or multiple calendar systems.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    splash: {
        width: 300, // You can adjust width and height as needed
        height: 200, // Adjust the height according to your splash image
        marginBottom: 20, // Adds space between the image and header text
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
    },
});
