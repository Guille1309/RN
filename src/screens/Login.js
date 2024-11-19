import { Component } from "react";
import { Text, TouchableOpacity } from "react-native-web";
import { auth } from "../firebase/config";
import { StyleSheet } from "react-native";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loggedIn: undefined,
        }
    }
    login(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
            .then((response) => {
                this.setState({
                    loggedIn: true,
                });
                this.props.navigation.navigate('HomeMenu');
            })
            .catch(error => {
                console.log(error);
                if (error.code === 'auth/internal-error') {
                    this.setState({
                        error: 'Credenciales inválidas'
                    })
                } else if (error.message === 'The email address is badly formatted.') {
                    this.setState({
                        error: 'Email mal formateado'
                    })
                } else if (this.state.password.length < 6) {
                    this.setState({
                        error: 'La password debe tener una longitud mínima de 6 caracteres'
                    })
                } else {
                    this.setState({
                        error: error.message
                    })
                }
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Inicia sesión</Text>

                <TextInput style={styles.input}
                    keyboardType='email-adress'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

                <TouchableOpacity onPress={() => { this.login(this.state.email, this.state.password) }} style={styles.boton}>
                    <Text style={styles.textoBoton}>Entrar en la app</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.boton}>
                    <Text style={styles.textoBoton}>Ir a registro</Text>
                </TouchableOpacity>

                <Text>{this.state.error}</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10
    },
    titulo: {
        fontSize: 50,
        fontWeight: 700,
        margin: 10
    },
    texto: {
        margin: 10,
        fontSize: 20
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    boton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginVertical: 10
    },
    textoBoton: {
        color: '#fff',
        textAlign: 'center'
    }
})

export default Login;