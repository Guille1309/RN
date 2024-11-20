import { Component } from "react";
import {auth, db} from '../firebase/config';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native-web";
import Post from "../components/Post";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from "react-native";

class MiPerfil extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: undefined,
            email: auth.currentUser.email,
            posts: [],
            cargando: true
        }
    }

    componentDidMount(){
        db.collection('posts').where('owner', '==', this.state.email).onSnapshot(docs => {
            let posts = [];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: posts,
                cargando: false
            })
        })

        db.collection('users').where('owner', '==', this.state.email).onSnapshot(docs => {
            docs.forEach(doc => {
                this.setState({
                    userName: doc.data().userName
                })
            })
        })
    }

    logout(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>{this.state.userName}</Text>
                <Text style={styles.texto}>{this.state.email}</Text>
                <Text style={styles.texto}>Cantidad de posts: {this.state.posts.length}</Text>
                <Text style={styles.titulo}>Mis posts</Text>
                {this.state.cargando ? <ActivityIndicator/> : (this.state.posts.length === 0 ? <Text style={styles.texto}>No tienes posts aún...</Text> : <FlatList style={styles.listaPosts} data={this.state.posts} keyExtractor={item => item.id.toString()} renderItem={({item}) => <Post datos={item} isHome={false}/>}/>)}
                <TouchableOpacity style={styles.containerLogout} onPress={ () => this.logout()}>
                    <MaterialCommunityIcons name="logout" size={24} color="#4A148C" />
                    <Text style={styles.textoLogout}>Cerrar sesión</Text>
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
        marginVertical: 10,
    },
    texto: {
        fontSize: 16,
        color: "#4A148C",
        marginBottom: 5,
    },
    listaPosts: {
        width: "100%",
        marginTop: 10,
    },
    itemPosts: {
        backgroundColor: "#E1BEE7",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    containerLogout: {
        marginTop: 20,
        alignItems: "center",
    },
    textoLogout: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#6A1B9A",
    },
});

export default MiPerfil;