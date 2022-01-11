import { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { joinGroup, leaveGroup } from "./Group.api";
import { selectUser } from "../login/userSlice";
import { selectGroup } from "./groupSlice";


export default function GroupInformation() {
    const history = useHistory();
    const user = useSelector(selectUser);
    const group = useSelector(selectGroup);
    const [toggleJoin, setToggleJoin] = useState(true);

    function goToEditGroup() {
        history.push(`/editGroup/${group.name}`);
    }

    function join() {
        joinGroup(group.name);
        setToggleJoin(false);
    }

    function leave() {
        leaveGroup(group.name);
        setToggleJoin(true);
    }

    //On load, determine if the visited group contains the user in their list of users
    useEffect(() => {
        group.joinedUsers.some(e => e.email === user.email) ? setToggleJoin(false) : setToggleJoin(true);
    }, [])

    return(
        <Card id="ProfilePage">
            <Stack >
                <Card.Img src={group.profilePic} id="ProfileImg" />
                <Card.Img src={group.headerImg} id="HeaderImg" />
            </Stack>
            <Card.Body id="profileBody">
            {(group.owner.id === user.id && group.owner.email === user.email) ? <Button id="EditGroupProfileButton" className="GroupProfileButton" onClick={goToEditGroup}>Edit Profile</Button>
            : (toggleJoin ? <Button id="GroupJoinButton" className="GroupProfileButton" onClick={join}>Join</Button> : <Button id="GroupLeaveButton" className="GroupProfileButton" onClick={leave}>Leave</Button>)}
                <Card.Title id = "ProfileName">{group.name}</Card.Title>
                <Card.Text id="AboutMe">
                    <h5>Description</h5>
                    {group.description}
                </Card.Text>
            </Card.Body>
        </Card> 

    )
}