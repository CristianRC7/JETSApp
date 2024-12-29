import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { HomeIcon, UserIcon, QrCodeIcon, ScrollText, ScanLine } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Screens
import Home from '../screens/Home';
import QrSection from '../screens/QrSection';
import Certificates from '../screens/Certificates';
import Profile from '../screens/Profile';

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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = await AsyncStorage.getItem('isAdmin');
        setIsAdmin(adminStatus === '1');
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, []);

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
      {isAdmin && (
        <Drawer.Screen 
          name="Escaner QR" 
          component={QrSection}
          options={{
            drawerIcon: ({ color }) => <ScanLine color={color} />,
          }}
        />
      )}
      <Drawer.Screen 
        name="Mis Certificados" 
        component={Certificates}
        options={{
          drawerIcon: ({ color }) => <ScrollText color={color} />,
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