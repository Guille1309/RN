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
            deshabilitado: true,
            errorEmail: '',
            errorPass: '',
            errorUsuario: ''
        }
    }

    datosInput(campo, valor) {
        this.setState({ [campo]: valor }, () => {
            if (!valor) {
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
                console.log("registro exitoso");

            })

    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.titulo}>Registrate</Text>

                <TextInput style={styles.input}
                    keyboardType='email-adress'
                    placeholder='email'
                    onChangeText={text => this.datosInput('email', text)}
                    value={this.state.email}
                />

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.datosInput('password', text)}
                    value={this.state.password}
                />

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Nombre de usuario'
                    onChangeText={text => this.datosInput('user', text)}
                    value={this.state.user}
                />
                <TouchableOpacity onPress={() => { this.register(this.state.email, this.state.password, this.state.user) }} style={styles.boton} disabled={this.state.deshabilitado}>
                    <Text style={styles.textoBoton}>Register</Text>
                </TouchableOpacity>
                <Text>
                    {this.state.email && this.state.password && this.state.user ? null: "Complete todos los campos, por favor."}
                </Text>
                <Text>
                    {this.state.error? this.state.error : null}
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