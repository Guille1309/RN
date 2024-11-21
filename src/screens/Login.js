import { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native-web";
import { auth } from "../firebase/config";
import { StyleSheet } from "react-native";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: undefined,
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('HomeMenu')
            }else{
                this.props.navigation.navigate('Login')
            }
            console.log(user)
        })
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
                    keyboardType='email-address'
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
    texto: {
        margin: 10,
        fontSize: 20
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
})

export default Login;