import { Component } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native-web";

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valorInput: '',
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
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Inserte su búsqueda"
                    onChangeText={(text) => this.controladorCambios(text)}
                    value={this.state.valorInput}
                />
                
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