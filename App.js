import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeMenu from './src/components/HomeMenu';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import MiPerfil from './src/screens/MiPerfil';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={ Register } options={ {headerShown: false} }/>
        <Stack.Screen name='Login' component={ Login } options={ {headerShown: false} }/>
        <Stack.Screen name='HomeMenu' component={ HomeMenu } options={ {headerShown: false} }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
