import ProfileInformation from "./ProfileInformation";
import SearchBar from "../search/SearchBar";

export default function ProfilePage(props: any) {
  return(
    <>
      <SearchBar />
      <ProfileInformation beep={props.beep}/>
    </>
  )
}
