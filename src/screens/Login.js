import { Component } from "react";
import { Text, TouchableOpacity } from "react-native-web";
import { auth } from "../firebase/config";

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

export default Login;