import { Component } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native-web";
import { auth, db } from '../firebase/config';
import Header from "../components/Header";

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valorInput: '',
            email: auth.currentUser.email,
            resultados: [],
            cargando: true
        }
    }
    controladorCambios(text) {
        this.setState(
            { valorInput: text },
            () => {
                if (this.props.filtrar) {
                    this.props.filtrar(this.state.valorInput);
                }
            }
        );
    }
    buscar() {
        db.collection('users').where('email', '==', this.state.valorInput).onSnapshot(docs => {
            let resultados = [];
            docs.forEach(doc => {
                resultados.push(doc.data());
            });
            this.setState({
                resultados: resultados,
                cargando: false
            });
        });

    }
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Inserte su búsqueda"
                    onChangeText={(text) => this.controladorCambios(text)}
                    value={this.state.valorInput}
                />
                <TouchableOpacity style={styles.boton} onPress={() => this.buscar()}>
                    <Text style={styles.textoBoton}>Buscar</Text>
                </TouchableOpacity>

                {this.state.cargando ? <ActivityIndicator /> : <FlatList style={styles.buscarLista} data={this.state.resultados} keyExtractor={item => item.id.toString()} renderItem={({ item }) => <Post datos={item} isHome={true} />} />}

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
});

export default Buscador;