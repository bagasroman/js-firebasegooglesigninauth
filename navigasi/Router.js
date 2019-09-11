import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

import LoginScreen from '../src/LoginScreen';
import LoadingScreen from '../src/LoadingScreen';
import HomeScreen from '../src/HomeScreen';

import firebase from 'react-native-firebase';



const Stack = createStackNavigator({
	Login : LoginScreen,
	Home: HomeScreen,
	
}, {
	headerMode: 'null'
});

export default createAppContainer(Stack);

