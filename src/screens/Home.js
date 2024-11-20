import { ActivityIndicator, FlatList } from "react-native";
import { StyleSheet, View } from "react-native";
import { Component } from "react";
import { db } from "../firebase/config";
import Post from "../components/Post";

class Home extends Component{

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            cargando: true
        }
    }
    componentDidMount() {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
            let posts = [];
            docs.forEach(doc => posts.push({
                id: doc.id,
                data: doc.data()
            }))
            this.setState({
                posts: posts,
                cargando: false
            })
        })
    }
    render() {
        return (
            <View>
                {this.state.cargando ? <ActivityIndicator /> : <FlatList data={this.state.posts} keyExtractor={item => item.id.toString()} renderItem={({ item }) => <Post datos={item} isHome={true} />} />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 50,
        fontWeight: 700,
        margin: 10
    },
    subtitulo: {
        fontSize: 30,
        marginHorizontal: 10
    }
})

export default Home;