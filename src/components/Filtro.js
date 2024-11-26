import { Component } from 'react'
import { StyleSheet } from 'react-native';
import { View, TextInput } from 'react-native-web';
import Entypo from '@expo/vector-icons/Entypo';

class Filtro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valorInput: '',
        }
    }

    controladorCambios(text) {
        this.setState(
            { valorInput: text },
            () => this.props.filtrar(this.state.valorInput)
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Nombre de usuario...'
                    onChangeText={(text) => this.controladorCambios(text)}
                    value={this.state.valorInput}
                />
                <Entypo name='magnifying-glass' size={24} color='#6A1B9A' style={styles.icono} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    input: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#EDE7F6',
        borderRadius: 10,
        borderColor: '#7B1FA2',
        borderWidth: 1,
        marginBottom: 15,
        fontSize: 16,
        color: '#4A148C',
        flex: 1
    },
    icono: {
        marginHorizontal: 10,
    },
    boton: {
        backgroundColor: '#8E24AA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '90%',
        marginBottom: 15,
    },
    textoBoton: {
        color: '#fff',
        textAlign: 'center'
    }
})

export default Filtro;