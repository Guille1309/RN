import { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native-web";
import { auth } from "../firebase/config";
import { StyleSheet } from "react-native";

class NuevoPost extends Component{
    constructor(){
        super();
        this.state = {
            email: auth.currentUser.email,
            post: ''
        }
    }

    post(post){
        db.collection('posts').add({
            owner: this.state.email,
            post: post,
            createdAt: Date.now(),
            likes: []
        })
    }

    render(){
        return(
            <View>
                <Text>Nuevo post</Text>

                <TextInput
                    keyboardType='default'
                    placeholder='Tu post...'
                    onChangeText={text => this.setState({post : text})}
                    value={this.state.post}
                />

                <TouchableOpacity onPress={ () => {this.post(this.state.post)}}>
                    <Text>Postear</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})

export default NuevoPost;