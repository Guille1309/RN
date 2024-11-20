import { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native-web";
import { auth, db } from "../firebase/config";
import { StyleSheet } from "react-native";

class NuevoPost extends Component {
    constructor() {
        super();
        this.state = {
            email: auth.currentUser.email,
            post: '',
            error: ''
        }
    }

    post(post) {
        this.setState({error:''})
        if (post.trim()) {
            db.collection('posts').add({
                owner: this.state.email,
                post: post,
                createdAt: Date.now(),
                likes: []
            })
            this.props.navigation.navigate('Home')
        }
        else {
            this.setState({
                error: 'No es posible subir un post vacío'
            })

        }
    }

        render(){
            return (
                <View style={styles.container}>
                    <Text style={styles.titulo}>Nuevo post</Text>

                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholder='Tu post...'
                        onChangeText={text => this.setState({ post: text })}
                        value={this.state.post}
                    />
                    {this.state.error? <Text>{this.state.error}</Text>: null}
                    <TouchableOpacity onPress={() => { this.post(this.state.post) }} style={styles.boton}>
                        <Text style={styles.textoBoton}>Postear</Text>
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
        boton: {
            backgroundColor: "#8E24AA",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: "center",
        },
        textoBoton: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#FFFFFF",
        },
    });
export default NuevoPost;