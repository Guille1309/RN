import { Component } from "react"
import { View, TextInput, StyleSheet } from "react-native-web";


class Filtro extends Component{
    constructor(){
        super();
        this.state={
            valorInput: '',
        }
    }
    controladorCambios(text){
        this.setState(
            { valorInput: text },
            () => this.props.filtrar(this.state.valorInput)
        );
      
    }
    render(){
        return(
            <View>
                <TextInput
                    keyboardType="default"
                    placeholder="Inserte su búsqueda por nombre"
                    onChangeText={(text) => this.controladorCambios(text)}
                    value={this.state.valorInput}
                />

            </View>
        )
    }
}

export default Filtro;