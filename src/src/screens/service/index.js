import {AsyncStorage} from 'react-native';
import {create} from 'apisauce';

const api = create({
  baseURL: 'http://siapbli.ditreskrimumpoldabali.com/ws/api',
});

api.addAsyncRequestTransform((request) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

api.addResponseTransform((response) => {
  if (!response.ok) {
    throw response;
  }
});

export default api;