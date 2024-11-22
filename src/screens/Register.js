import { Component } from "react";
import { auth, db } from "../firebase/config";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Header from "../components/Header";

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
            deshabilitado: true,
            errorEmail: '',
            errorPass: '',
            errorUsuario: '',
            tocoEmail: false,
            tocoPass: false,
            tocoUser: false

        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('HomeMenu')
            } else {
                this.props.navigation.navigate('Register')
            }
            console.log(user)
        })
    }

    datosInput(campo, valor) {
        this.setState({ [campo]: valor.trim() }, () => {
            if (!valor.trim()) {
                this.setState({
                    deshabilitado: true,
                });
            }
            else if (this.state.email && this.state.password && this.state.user) {
                this.setState({
                    deshabilitado: false
                });
            }
        });
    }

    register(email, pass, userName) {
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
                this.props.navigation.navigate('Login')


            })
            .catch(error => {
                this.setState({ error: 'Fallo en el registro' })
                if (error.code === 'auth/invalid-email') {
                    this.setState({
                        error: 'Ingrese un formato válido de email.'
                    })
                } else if (error.code === 'auth/weak-password') {
                    this.setState({
                        error: 'Ingrese una contraseña de más de 6 caracteres.'
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
                <Header />

                <Text style={styles.titulo}>Registrate</Text>

                <TextInput style={styles.input}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.datosInput('email', text)}
                    onBlur={ () => this.setState({ tocoEmail: true })}
                    value={this.state.email}
                />

                <Text style={styles.campoVacio}>
                    {!this.state.email && this.state.tocoEmail ?"Complete el email." : null }
                </Text>
                

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.datosInput('password', text)}
                    onBlur={ () => this.setState({ tocoPass: true })}
                    value={this.state.password}
                />
                <Text style={styles.campoVacio}>
                    {!this.state.password && this.state.tocoPass ? "Complete la contraseña." : null }
                </Text>

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Nombre de usuario'
                    onChangeText={text => this.datosInput('user', text)}
                    onBlur={ () => this.setState({ tocoUser: true })}
                    value={this.state.user}
                />
                <Text style={styles.campoVacio}>
                    {!this.state.user && this.state.tocoUser ? "Complete el usuario." : null }
                </Text>
                <Text style={styles.campoVacio}>
                    {this.state.error ? this.state.error : null}
                </Text>
                <TouchableOpacity onPress={() => { this.register(this.state.email, this.state.password, this.state.user) }} style={this.state.deshabilitado ? styles.botonD : styles.botonH} disabled={this.state.deshabilitado}>
                    <Text style={styles.textoBoton}>Registrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.botonH}>
                    <Text style={styles.textoBoton}>Ir a login</Text>
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
    botonH: {
        backgroundColor: "#8E24AA",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        width: "90%",
        marginBottom: 15,
    },
    botonD: {
        backgroundColor: "#D1C4E9",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        width: "90%",
        marginBottom: 15,
    },
    textoBoton: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    campoVacio: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        width: "90%",
    },
});

export default Register;