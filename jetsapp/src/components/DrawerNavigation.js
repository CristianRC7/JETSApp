import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import QrSection from '../screens/QrSection';
import { HomeIcon, UserIcon, QrCodeIcon } from 'lucide-react-native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/logo-jets.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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

const styles = StyleSheet.create({
  logoContainer: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cf152d',
  },
  logo: {
    width: '90%',
    height: '80%',
  },
});

export default DrawerNavigation;