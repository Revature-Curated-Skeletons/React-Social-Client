import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Feed from "../feed/Feed";
import GroupInformation from "./GroupInformation";
import { setGroupAsync } from "./groupSlice";


export default function GroupPage() {

    const [doneLoading, setDoneLoading] = useState(false);
    const { groupName } = useParams();

    const dispatch = useAppDispatch();

    function getGroupInformation(name: string | undefined) {
        if(name) {
            dispatch(setGroupAsync(groupName as string))
                .then(() => setDoneLoading(true))
                .then(() => console.log("done creating groupInfo"));
        }
    }

    useEffect(() => {
        getGroupInformation(groupName);
    });

    return (doneLoading ?
        <>
            <GroupInformation />
            <Feed isGroup={true} />
        </>
        :(<Image id="LoadingImg" src = {"https://app.revature.com/assets/images/ajax-loader-logo.0cd555cc.gif"} 
        style={{height:'192px', width: '300px'}} fluid data-testid="gif"/>))
    
}