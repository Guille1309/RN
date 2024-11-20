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

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('HomeMenu')
            }else{
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
            }})

    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.titulo}>Registrate</Text>

                <TextInput style={styles.input}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.datosInput('email', text)}
                    value={this.state.email}
                />
                <Text style = {styles.campoVacio}>
                    {this.state.email ? null : "Complete el email."}
                </Text>

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.datosInput('password', text)}
                    value={this.state.password}
                />
                <Text style = {styles.campoVacio}>
                    {this.state.password ? null : "Complete la contraseña."}
                </Text>

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Nombre de usuario'
                    onChangeText={text => this.datosInput('user', text)}
                    value={this.state.user}
                />
                <Text style = {styles.campoVacio}>
                    {this.state.user ? null : "Complete el usuario."}
                </Text>
                <Text>
                    {this.state.error ? this.state.error : null}
                </Text>
                <TouchableOpacity onPress={() => { this.register(this.state.email, this.state.password, this.state.user) }} style={this.state.deshabilitado ? styles.botonD : styles.botonH} disabled={this.state.deshabilitado}>
                    <Text style={styles.textoBoton}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')} style={styles.botonH}>
                    <Text style={styles.textoBoton}>Ir a login</Text>
                </TouchableOpacity>



            </View>
        )
    }
}

const styles = StyleSheet.create({
    campoVacio:{
        color:'red'
    },
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
    botonH: {
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
    botonD: {
        backgroundColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        marginVertical: 10
    },
    textoBoton: {
        color: '#fff',
        textAlign: 'center'
    }
})

export default Register;