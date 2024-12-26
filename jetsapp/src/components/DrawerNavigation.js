import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator 
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#cf152d',
        },
        headerTintColor: '#fff',
        drawerStyle: {
          backgroundColor: '#cf152d',
        },
        drawerLabelStyle: {
          color: '#fff',
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        headerTitle: '', 
      }}
    >
      <Drawer.Screen name="Inicio" component={Home} />
      <Drawer.Screen name="Perfil" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;