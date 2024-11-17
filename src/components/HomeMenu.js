import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import MiPerfil from '../screens/MiPerfil';

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={
                {tabBarIcon: ()=> <Entypo name="home" size={24} color="black" />}
            }/>
            <Tab.Screen name='Posts' component={Posts} options={
                {tabBarIcon: ()=> <Entypo name="camera" size={24} color="black" />}
            }/>
            <Tab.Screen name='Profile' component={MiPerfil} options={
                {tabBarIcon: ()=> <Entypo name="person" size={24} color="black" />}
            }/>
        </Tab.Navigator>
    )
}

export default HomeMenu;