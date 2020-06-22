import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import Home from './pages/Home'
import Bill from './pages/Bill'
import Configuration from './pages/Configuration'

import Other from './pages/Other'

import FirstScreen from './pages/Access/FirstScreen'
import Login from './pages/Access/Login'
import Register from './pages/Access/Register'

const Routes = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator()

    function HomeTabs(){
      return(
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Início') {
                iconName = focused ? 'ios-home' : 'ios-home';
              } else if (route.name === 'Contas') {
                iconName = focused ? 'ios-cash' : 'ios-cash';
              } else if (route.name === 'Configurações') {
                iconName = focused ? 'ios-settings' : 'ios-settings';
              } 
              
              // You can return any component that you like here!
              return <Ionicons name={String(iconName)} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#72B76B',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Início" component={Home} />
          <Tab.Screen name="Contas" component={Bill} />
          <Tab.Screen name="Configurações" component={Configuration} />
        </Tab.Navigator>
      )
    }

    return (
      <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="FirstScreen" component={FirstScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />

            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen name="Other" component={Other} />
          </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default Routes