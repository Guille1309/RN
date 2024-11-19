import { StyleSheet, Text, View } from 'react-native';
import Register from './src/screens/Register';


export default function App() {
  return (
    <Register />
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
