import { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-web";
import AntDesign from '@expo/vector-icons/AntDesign';
import { auth, db } from "../firebase/config";
import firebase from 'firebase';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos: this.props.datos.data,
            id: this.props.datos.id,
            usuario: auth.currentUser.email,
            usuarioLikeo: this.props.datos.data.likes.includes(auth.currentUser.email),
            cantLikes: this.props.datos.data.likes.length
        }
    }

    actualizarLikes(id){
        if(this.state.usuarioLikeo){ // el usuario ya dio like, ahora vamos a sacar el like
            db.collection('posts')
            .doc(id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(this.state.usuario)
                })
                .then(() => {
                    this.setState({
                        usuarioLikeo: false,
                        cantLikes: this.state.cantLikes - 1
                    })
                })
                .catch(e => console.log(e))
        } else{ // el usuario no dio like antes, lo va a dar ahora
            db.collection('posts')
            .doc(id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(this.state.usuario)
                })
                .then(() => {
                    this.setState({
                        usuarioLikeo: true,
                        cantLikes: this.state.cantLikes + 1
                    })
                })
                .catch(e => console.log(e))
        }
    }

    borrarPost(id){
        db.collection('posts')
        .doc(id)
        .delete()
        .then( () => {
            console.log(`Post ${id} eliminado exitosamente! :)`)
        })
        .catch( (e) => {
            console.log(e)
        })
    }

    render(){
        console.log(this.state.datos)
        return(
            <View style={styles.container}>
                {this.state.usuario === this.state.datos.owner ? (
                    <TouchableOpacity onPress={() => this.borrarPost(this.state.id)}>
                        <FontAwesome6 name="trash-can" size={20} color="#4A148C" />
                    </TouchableOpacity>
                ) : null}
                <View style={styles.containerPost}>
                    <Text style={styles.textoUsuario}>{this.state.datos.owner}</Text>
                    <Text style={styles.textoPost}>{this.state.datos.post}</Text>
                </View>
                <TouchableOpacity onPress={ () => {this.actualizarLikes(this.state.id)}}>
                    <AntDesign name={this.state.usuarioLikeo ? "heart" : "hearto"} size={20} color="#4A148C"/>
                </TouchableOpacity>
                <Text style={styles.likes}>{this.state.cantLikes}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3E5F5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerPost: {
        backgroundColor: '#E1BEE7',
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 8,
        flex: 1,
    },
    textoUsuario:{
        fontWeight: 'bold',
        fontSize: 14, 
        color: '#6A1B9A',
        marginBottom: 5
    },
    textoPost: {
        fontSize: 16,
        color: "#4A148C",
    },
    likes: {
        fontSize: 20,
        color: "#6A1B9A",
        fontWeight: "bold",
    },
});

export default Post;