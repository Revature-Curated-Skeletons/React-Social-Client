import axios from 'axios';
import { store } from '../../app/store'

const reverbClient = axios.create( {
  baseURL: 'http://Reverbapplication-env.eba-e5qubfd5.us-west-1.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
} );

const reverbClientWithAuth = axios.create( {
  baseURL: 'http://Reverbapplication-env.eba-e5qubfd5.us-west-1.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ""
  },
  withCredentials: true,
} );

reverbClientWithAuth.interceptors.request.use( function ( config: any )
{
  const token = "" + store.getState().auth[0].token;
  config.headers["Authorization"] = token;
  return config;
} );

export { reverbClient, reverbClientWithAuth };
