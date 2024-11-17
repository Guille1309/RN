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

const styles = StyleSheet.create({
    
})

export default Register;