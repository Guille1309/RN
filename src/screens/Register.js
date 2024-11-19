import { Component } from "react";
import { auth, db } from "../firebase/config";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: '',
            registered: false,
            error: '',
            usuarios: '',
            cargando: true,
            disponible: false
        }
    }


    register(email, pass, userName) {
        if (!email || !pass || !userName) {
            this.setState({
                error: "Por favor, complete todos los campos",
                disponible: false
            })

        } else {
            this.setState({
                error: ''
            })
            auth.createUserWithEmailAndPassword(email, pass)
                .then(response => {
                    this.setState({ registered: true })
                    db.collection('users').add({
                        owner: email,
                        createdAt: Date.now(),
                        userName: userName,
                    })
                    this.props.navigation.navigate('HomeMenu')
                })
                .catch(error => {
                    this.setState({ error: 'Fallo en el registro' })
                    if (error.code === 'auth/invalid-email') {
                        this.setState({
                            error: error.message
                        })
                    } else if (error.code === 'auth/weak-password') {
                        this.setState({
                            error: error.message
                        })
                    } else {
                        this.setState({
                            error: error.message
                        })
                    }
                    console.log("registro exitoso");
                    
                })
        }

    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.titulo}>Registrate</Text>

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

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Nombre de usuario'
                    onChangeText={text => this.setState({ user: text })}
                    value={this.state.user}
                />
                <TouchableOpacity onPress={() => { this.register(this.state.email, this.state.password, this.state.user) }} style={styles.boton}>
                    <Text style={styles.textoBoton}>Register</Text>
                </TouchableOpacity>

                <Text>
                    {this.state.error}
                </Text>



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

export default Register;