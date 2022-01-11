import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { createGroup, editGroup } from "./Group.api";
import UpdateGroupRequest from "./dtos/UpdateGroupRequest";
import { useSelector } from "react-redux";
import { selectGroup } from "./groupSlice";
import DeleteGroup from "./DeleteGroup";

export function EditGroupPage() {

    const history = useHistory();
    const [newGroupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [groupProfilePic, setGroupProfilePic] = useState("");
    const [groupHeaderImg, setGroupHeaderImg] = useState("");
    const { groupName } = useParams();
    const group = useSelector(selectGroup);
    const [showDelete, setShowDelete] = useState(false);
    console.log(groupName);

    const handleChangeName = (e: any) => {
        setGroupName(e.target.value);
    };
    
    const handleChangeDescription = (e: any) => {
        setGroupDescription(e.target.value);
    };

    const handleChangeProfilePic = (e: any) => {
        setGroupProfilePic(e.target.value);
    };
    
    const handleChangeHeaderImage = (e: any) => {
        setGroupHeaderImg(e.target.value);
    };

    const edit = (e: any) => {
        e.preventDefault();
        // console.log('editProfile' + JSON.stringify(input));
        let payload: UpdateGroupRequest = {name: newGroupName, description: groupDescription, profilePic: groupProfilePic, headerImg: groupHeaderImg};
        editGroup(payload, groupName as string).then(() => history.push(`/group/${newGroupName}`));
    }

    const cancel = (e: any) => {
        e.preventDefault();
        history.push(`/group/${groupName}`);
    }

    const deleteGroup = () => {
        setShowDelete(true);
    }

    useEffect(() => {
        setGroupName(group.name);
        setGroupDescription(group.description);
        setGroupProfilePic(group.profilePic);
        setGroupHeaderImg(group.headerImg);
    }, [])

    return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Card id="EditProfile">
                    <Container>
                        <Row>
                            <Col id="editCol1">
                                <div className="form_input-group">
                                    <label htmlFor="group_name">Group Name</label>
                                    <input className="form_input" type="text" name="group_name" value={newGroupName} onChange={handleChangeName} required />
                                </div>
                                <div className="form_input-group">
                                    <label htmlFor="about_me">Description</label>
                                    <textarea className="form_input" rows={7} name="about_me" value={groupDescription} onChange={handleChangeDescription} > </textarea>
                                </div>
                                <div className="form_input-group">
                                    <label htmlFor="profile_pic">Profile Picture</label>
                                    <input className="form_input" type="text" name="profile_pic" value={groupProfilePic} onChange={handleChangeProfilePic} />
                                </div>
                                <div className="form_input-group">
                                    <label htmlFor="header_img">Header Image</label>
                                    <input className="form_input" type="text" name="header_img" value={groupHeaderImg} onChange={handleChangeHeaderImage} />
                                </div>
                            </Col>
                        </Row>
                        <Row className="groupEditButtonsRow">
                            <Col id="createGroupBtnCol">
                                <button data-testid="updateButton" id="UpdateGroup" className="FormButtons" type="button" onClick={(e) => edit(e)} >Update</button><br />
                            </Col>
                            <Col id="cancelGroupBtnCol">
                                <button data-testid="cancelButton" id="CancelGroup" className="FormButtons" type="button" onClick={(e) => cancel(e)} >Cancel</button><br />
                            </Col>
                            <Col id="deleteGroupBtnCol">
                                <button data-testid="deleteButton" id="DeleteGroup" className="FormButtons" type="button" onClick={() => deleteGroup()} >Delete</button><br />
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Grid>
            <DeleteGroup
                show={showDelete}
                onHide={() => setShowDelete(false)}
                groupName={group.name}
            />
        </div>
    )
}