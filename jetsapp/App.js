import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './SplashScreen';
import Login from './src/screens/Login';
import Events from './src/screens/Events';
import Support from './src/screens/Support';
import DrawerNavigation from './src/components/DrawerNavigation';

const Stack = createStackNavigator();

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setInitialRoute('DrawerNavigation');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
      
      setTimeout(() => setSplashVisible(false), 4000);
    };

    checkLoginStatus();
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName={initialRoute}
          screenOptions={{ 
            headerShown: false,
            headerTitle: '' 
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
          <Stack.Screen 
            name="Events" 
            component={Events} 
            options={{
              headerShown: true,
              headerTitle: '',
              headerStyle: {
                backgroundColor: '#cf152d',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="Support" 
            component={Support} 
            options={{
              headerShown: true,
              headerTitle: '',
              headerStyle: {
                backgroundColor: '#cf152d',
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}