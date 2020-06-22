import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import Home from './pages/Home'
import Search from './pages/Search'
import SubSearch from './pages/Search/SubSearch'
import Orders from './pages/Orders'
import Profile from './pages/Profile'

import Place from './pages/SubPages/Place'
import Detail from './pages/SubPages/Place/Detail'
import Cart from './pages/SubPages/Cart'
import Products from './pages/SubPages/Products'
import Endereco from './pages/SubPages/Endereco'
import AddEndereco from './pages/SubPages/Endereco/AddEndereco'
import Pay from './pages/SubPages/Pay'

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
              } else if (route.name === 'Buscar') {
                iconName = focused ? 'ios-search' : 'ios-search';
              } else if (route.name === 'Pedidos') {
                iconName = focused ? 'ios-document' : 'ios-document';
              } else if (route.name === 'Perfil') {
                iconName = focused ? 'ios-person' : 'ios-person';
              }
              
  
              // You can return any component that you like here!
              return <Ionicons name={String(iconName)} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#34CB79',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Início" component={Home} />
          <Tab.Screen name="Buscar" component={Search} />
          <Tab.Screen name="Pedidos" component={Orders} />
          <Tab.Screen name="Perfil" component={Profile} />
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
            <Stack.Screen name="Place" component={Place} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Endereco" component={Endereco} />
            <Stack.Screen name="AddEndereco" component={AddEndereco} />
            <Stack.Screen name="Pay" component={Pay} />
            <Stack.Screen name="SubSearch" component={SubSearch} />
          </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default Routes