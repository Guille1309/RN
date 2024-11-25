import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function Header() {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>SayIt</Text>
                <FontAwesome name='comment-o' size={40} color='#6A1B9A' style={styles.icono} />
            </View>
            <Text style={styles.slogan}>Una app para expresarse libremente</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3E5F5',
        borderBottomWidth: 1,
        borderBottomColor: '#E1BEE7',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icono: {
        marginLeft: 10,
    },
    logo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6A1B9A',
        letterSpacing: 3,
    },
    slogan: {
        fontSize: 12,
        color: '#6A1B9A',
        marginTop: 5,
        fontStyle: 'italic'
    },
});

export default Header;