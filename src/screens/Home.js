import { ActivityIndicator, FlatList, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Component } from 'react';
import { db } from '../firebase/config';
import Post from '../components/Post';
import Header from '../components/Header';

class Home extends Component {
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
            <View style={styles.homeContainer}>
                <Header />
                {this.state.cargando ? <ActivityIndicator /> : <FlatList style={styles.postList} data={this.state.posts} keyExtractor={item => item.id.toString()} renderItem={({ item }) => <Post datos={item} isHome={true} />} />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: '#F3E5F5',
        padding: 20,
        alignItems: 'center',
    },
    postList: {
        width: '100%',
    },
})

export default Home;