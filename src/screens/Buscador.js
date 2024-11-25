import { Component } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native-web";
import { auth, db } from '../firebase/config';
import Header from "../components/Header";
import Filtro from "../components/Filtro";

class Buscador extends Component {
    constructor() {
        super();
        this.state = {
            valorInput: '',
            resultados: [],
            cargando: true,
            backup: [],
        }
    }
    controladorCambios(text) {
        this.setState(
            { valorInput: text },
        );
    }
    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
                let resultados = [];
                docs.forEach(doc =>{
                    resultados.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    resultados: resultados,
                    cargando: false,
                    backup: resultados,
                })
            })
    }
    filtrar(user){
        let usuariosFiltrados = this.state.backup.filter(resultado => resultado.data.userName.toLowerCase().includes(user.toLowerCase()));
        this.setState({
            resultados: usuariosFiltrados,
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Header/>
                <Filtro filtrar={(user)=> this.filtrar(user)}/>
               {(this.state.resultados.length === 0) ? <Text>El user name no existe</Text> : this.state.resultados.map((user, id) =>  <Text key={user.id}>{user.data.userName}</Text>)} 
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
    }
});

export default Buscador;