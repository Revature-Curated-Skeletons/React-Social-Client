import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {getProfileAsync, selectProfile} from "./profileSlice";
import { reverbClientUploadFileWithAuth } from "../../remote/reverb-api/reverbClient";

export default function Upload_Picture(props:any) {
  const [cjsFile, setcjsFile] = React.useState("");
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const submitForm = async (event:any) => {
    event.preventDefault();
    const dataArray = new FormData();
    if (props.targetPicture=="profile"){
      console.log("true")
      dataArray.append('picCate',"profile");
    }
    else{dataArray.append('picCate',"header");}
    dataArray.append('profileId',profile.id);//need to fix
    dataArray.append('file', cjsFile);
    try{
      let resp= await reverbClientUploadFileWithAuth.post("/storage/uploadFile",dataArray);
      //let data= resp.data;
      dispatch(getProfileAsync(profile));
      console.log("Upload finished");
    }
    catch{
      console.log("upload failed")
    }
  };
  const handleChangeFile = (event:any)=> {
    const file = event.target.files[0];
    setcjsFile(file);
  }
  return (
    <div>
      <form onSubmit={submitForm}>
          <input type="file" onChange={(e) => handleChangeFile(e)} />
          <input type="submit" value="upload"/>
      </form>
    </div>
  );
}