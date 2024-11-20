import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import MiPerfil from '../screens/MiPerfil';
import NuevoPost from '../screens/NuevoPost';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={
                {tabBarIcon: ()=> <Entypo name="home" size={24} color="black" />}
            }/>
            <Tab.Screen name='Nuevo post' component={NuevoPost} options={
                {tabBarIcon: ()=> <Entypo name="camera" size={24} color="black" />}
            }/>
            <Tab.Screen name='Mi perfil' component={MiPerfil} options={
                {tabBarIcon: ()=> <Entypo name="user" size={24} color="black" />}
            }/>
        </Tab.Navigator>
    )
}

export default HomeMenu;