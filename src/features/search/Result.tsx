import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import SearchResult from './SearchResult';
import { Profile } from '../profile/profile';



export default function Result({ user }: any) {
  
  const initialResult: SearchResult = {
    id: "e3mkyWLcXnY0KpKwK8WBtHxJvn72",
    email: "dev@dev.com"
  }

  const [ result, setResult ] = useState<SearchResult>()
  const [ profile, setProfile ] = useState<Profile>()
  const [ profileId, setProfileId ] = useState()

  const profileURL: string = "/profile/" + initialResult.id
  
  useEffect(() => { 
    const getProfileId = async () => {
      if (!profile) {
        const resp = await reverbClientWithAuth.get(`/api/profile/getByAuthor/${user.id}`);
        setProfile(resp.data)
        console.log("getProfileId: ")
        console.log(resp)
      }
    };
    getProfileId();
  }, []);


  return (
    <>
      <img src={profile?.profile_img} height='48' width='48'/>
      <NavLink to={"/profile/" + profile?.id} key={profile?.id}>{user.email} {profile?.first_name}</NavLink><br key={initialResult.id + "1"}/>
    </>
  )
}
