import { Component } from "react";
import { auth } from "../firebase/config";

class Register extends Component{
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

export default Register;