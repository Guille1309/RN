import { Component } from "react";
import { Text, TouchableOpacity } from "react-native-web";
import { auth } from "../firebase/config";
import { StyleSheet } from "react-native";

class Login extends Component{
    constructor(){
        super();
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            console.log(user)
        })
    }

    render(){
        return
    }
}

const styles = StyleSheet.create({
    
})

export default Login;