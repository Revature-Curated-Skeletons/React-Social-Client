import { reverbClientWithAuth } from '../../remote/reverb-api/reverbClient'
import User from './User';

export const getUser = async() => {
  const {data: user} = await reverbClientWithAuth.post<User>("/api/user/login");;

  return user;
}
