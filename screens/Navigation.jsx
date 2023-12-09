import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login"
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

        <Stack.Screen name="SignUp" component={SignUpScreen} 
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
            } />

        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

