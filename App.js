import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/LoginScreen';
import HomeScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name = "Login"
            component = {
              LoginScreen
            }
            options = {
              {
                headerTitleAlign: 'center',
                headerTitleStyle: {
                color: 'blue',
                fontSize: 20,
                fontWeight: 'bold',
                },
                headerShown:false
              }
            }
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   image: {
     flex: 1,
     justifyContent: 'center',
   },
});
