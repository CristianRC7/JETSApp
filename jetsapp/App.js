import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Splash Screen
import SplashScreen from './SplashScreen';
//Screens
import Login from './src/screens/Login';
import Events from './src/screens/Events';
import Exhibitors from './src/screens/Exhibitors';
import Inscription from './src/screens/Inscription';
import Form from './src/screens/Form';
import Support from './src/screens/Support';
//Components
import DrawerNavigation from './src/components/DrawerNavigation';
import Survey from './src/components/Survey';
import AddEventUser from './src/components/AddEventUser';

const Stack = createStackNavigator();

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem('loginStatus');
        if (loginStatus === 'true') {
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
              headerTitle: 'Eventos',
              headerStyle: {
                backgroundColor: '#cf152d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 18,
              },
            }}
          />
          <Stack.Screen 
            name="Exhibitors" 
            component={Exhibitors} 
            options={{
              headerShown: true,
              headerTitle: 'Conferencistas',
              headerStyle: {
                backgroundColor: '#cf152d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 18,
              },
            }}
          />
          <Stack.Screen 
            name="Inscription" 
            component={Inscription} 
            options={{
              headerShown: true,
              headerTitle: 'Puntos de Inscripción',
              headerStyle: {
                backgroundColor: '#cf152d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 18,
              },
            }}
          />
            <Stack.Screen 
            name="Form" 
            component={Form} 
            options={{
              headerShown: true,
              headerTitle: 'Formularios',
              headerStyle: {
                backgroundColor: '#cf152d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 18,
              },
            }}
          />
          <Stack.Screen 
            name="Support" 
            component={Support} 
            options={{
              headerShown: true,
              headerTitle: 'Soporte',
              headerStyle: {
                backgroundColor: '#cf152d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 18,
              },
            }}
          />
          <Stack.Screen 
            name="Survey" 
            component={Survey}
            options={{
              headerShown: true,
              headerTitle: 'Calificar Evento',
              headerStyle: {
                backgroundColor: '#cf152d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 18,
              },
              headerBackTitleVisible: false,
              headerBackTitle: '',
            }}
          />
          <Stack.Screen 
            name="AddEventUser" 
            component={AddEventUser}
            options={{
              headerShown: true,
              headerTitle: 'Registrar usuario en evento',
              headerStyle: {
                backgroundColor: '#cf152d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 18,
              },
              headerBackTitleVisible: false,
              headerBackTitle: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}