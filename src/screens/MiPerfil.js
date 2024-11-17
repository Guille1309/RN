import { Component } from "react";
import {auth} from '../firebase/config';
import { ActivityIndicator, FlatList, Text, View } from "react-native-web";
import Post from "../components/Post";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

class MiPerfil extends Component{
    constructor(props){
        super(props);
        this.state = {
            nombre: auth.currentUser.nombreUsuario,
            email: auth.currentUser.email,
            cantPosts: 0,
            posts: [],
            cargando: true
        }
    }

    componentDidMount(){

    }

    logout(){
        auth.signOut()
        props.navigation.navigate('Login')
    }


    render(){
        return(
            <View>
                <Text>{this.state.nombre}</Text>
                <Text>{this.state.email}</Text>
                <Text>Cantidad de posts: {this.state.cantPosts}</Text>
                <Text>Mis posts</Text>
                {this.state.cargando ? <ActivityIndicator/> : <FlatList data={this.state.posts} keyExtractor={item => item.id.toString()} renderItem={({item}) => <Post datos={item}/>}/>}
                <MaterialCommunityIcons name="logout" size={24} color="black" />
                <Text>Cerrar sesión</Text>
            </View>
            
        )
    }
}

export default MiPerfil;