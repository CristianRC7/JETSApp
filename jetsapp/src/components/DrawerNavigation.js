import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import QrSection from '../screens/QrSection'
import { HomeIcon, UserIcon, QrCodeIcon } from 'lucide-react-native';

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
        drawerItemStyle: {
          marginVertical: 5,
        },
      }}
    >
      <Drawer.Screen 
        name="Inicio" 
        component={Home} 
        options={{
          drawerIcon: ({ color }) => <HomeIcon color={color} />,
        }} 
      />
      <Drawer.Screen 
        name="Mi Qr" 
        component={QrSection} 
        options={{
          drawerIcon: ({ color }) => <QrCodeIcon color={color} />,
        }} 
      />
      <Drawer.Screen 
        name="Perfil" 
        component={Profile} 
        options={{
          drawerIcon: ({ color }) => <UserIcon color={color} />,
        }} 
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;