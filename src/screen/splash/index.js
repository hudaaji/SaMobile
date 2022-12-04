import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({navigation}) {
  useEffect(() => {
      handleGetToken();
  });

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('authUser');
    if (!dataToken) {
        navigation.replace('Maps');
    } else {
        navigation.replace('Login');
    }
  };
}