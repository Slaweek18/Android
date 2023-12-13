import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryScreen from './HistoryScreen';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

export default HomeHistory = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
        <Tab.Screen name='History' component={HistoryScreen}></Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})