import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';

function ResultadosBusqueda (route){
    let resultados  = route.params; 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultados de su búsqueda...</Text>
            <Header/>
            <FlatList style={styles.postList} data={resultados} keyExtractor={item => item.id.toString()} renderItem={({ item }) => <Post datos={item} isHome={true} />} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F3E5F5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6A1B9A", 
        marginVertical: 10,
    },
    resultText: {
        fontSize: 16,
        color: "#4A148C",
        marginVertical: 5,
    },
});

export default ResultadosBusqueda;