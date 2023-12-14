import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryScreen from './HistoryScreen';
import HomeScreen from './HomeScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default HomeHistory = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused 
              ? 'time' 
              : 'time-outline';
          }
          
          return <Ionicons name={iconName} size={34} color={'black'} />;
        },
        tabBarLabel: () => null
    })
  }
      >
        <Tab.Screen name='Home' component={HomeScreen} 
         options = {
              {
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: 25,
                  fontWeight: 'bold',
                },
              }
            }></Tab.Screen>
        <Tab.Screen name='History' component={HistoryScreen}
          options = {
            {
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontSize: 25,
                fontWeight: 'bold',
              },
            }
        }></Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})