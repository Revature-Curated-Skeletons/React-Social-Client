import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import SearchResult from './SearchResult';
import { Profile } from '../profile/profile';
import { Button } from 'react-bootstrap';



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

  function handleClick() {
    followUser();
  }

  async function followUser() {
    const resp = await reverbClientWithAuth.put(`/api/user/follow-user/${user?.id}`)
    console.log(resp)
  }

  return (
    <>
      <img src={profile?.profile_img} height='48' width='48'/>
      <NavLink to={"/profile/" + profile?.id} key={profile?.id}>{user.email} {profile?.first_name}</NavLink>
      <Button id="follow_button" onClick={handleClick}>FOLLOW</Button>
      <br key={initialResult.id + "1"}/>
    </>
  )
}
