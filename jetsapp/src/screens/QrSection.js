import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

const QrSection = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataKeys = ['userId', 'username', 'fullName'];
        const results = await AsyncStorage.multiGet(userDataKeys);
        
        const data = {};
        results.forEach(([key, value]) => {
          if (value) {
            data[key] = value;
          }
        });

        if (Object.keys(data).length > 0) {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    };

    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi QR JETS</Text>
      
      {userData && (
        <View style={styles.qrContainer}>
          <QRCode
            value={JSON.stringify({
              id: userData.userId,
              usuario: userData.username,
              nombre_completo: userData.fullName
            })}
            size={200}
            color="#000"
            backgroundColor="#fff"
          />
          <Text style={styles.userName}>{userData.fullName}</Text>
          <Text style={styles.userDetail}>@{userData.username}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    textAlign: 'center',
  },
  userDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default QrSection;