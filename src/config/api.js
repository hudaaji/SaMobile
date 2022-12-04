import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

let xheaders = null

if (AsyncStorage.getItem('authUser')) {
  xheaders = {
    'Authorization': `Bearer ${AsyncStorage.getItem('authUser')}`
  }
}

export const axioz = axios.create({
    baseURL: 'http://154.26.132.106:8080/api/v1',
    // baseURL: 'http://127.0.0.1:8080/api/v1/',
    headers: xheaders
})

export const path = 'http://154.26.132.106:8080/api/v1'