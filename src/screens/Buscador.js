import { Component } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native-web";
import { auth, db } from '../firebase/config';
import Header from "../components/Header";

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valorInput: '',
            resultados: [],
            cargando: false,
        }
    }
    controladorCambios(text) {
        this.setState(
            { valorInput: text }
        );
    }
    buscar() {
        db.collection('posts')
            .where('owner', '==', this.state).onSnapshot(docs => {
                let resultados = [];
                docs.forEach(doc =>{
                    resultados.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    resultados: resultados,
                    cargando: false
                })
                console.log(resultados);
                this.props.navigation.navigate('ResultadosBusqueda');
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Inserte su búsqueda por nombre"
                    onChangeText={(text) => this.controladorCambios(text)}
                    value={this.state.valorInput}
                />
                <TouchableOpacity style={styles.boton} onPress={() => this.buscar()}>
                    <Text style={styles.textoBoton}>Buscar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F3E5F5",
        alignItems: "center",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6A1B9A",
        marginBottom: 20,
    },
    input: {
        width: "90%",
        padding: 15,
        backgroundColor: "#EDE7F6",
        borderRadius: 10,
        borderColor: "#7B1FA2",
        borderWidth: 1,
        marginBottom: 15,
        fontSize: 16,
        color: "#4A148C",
    },
    boton: {
        backgroundColor: "#8E24AA",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        width: "90%",
        marginBottom: 15,
    },
    textoBoton: {
        color: '#fff',
        textAlign: 'center'
    }
});

export default Buscador;