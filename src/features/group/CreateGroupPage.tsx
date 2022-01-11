import { Grid } from "@material-ui/core";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { createGroup } from "./Group.api";
import { NewGroupRequest } from "./dtos/NewGroupRequest"

export function CreateGroupPage() {

    const history = useHistory();
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const handleChangeName = (e: any) => {
        setGroupName(e.target.value.trim());
    };
    
    //TODO: do we want to trim description as well?
    const handleChangeDescription = (e: any) => {
        setGroupDescription(e.target.value);
    };

    const create = (e: any) => {
        e.preventDefault();
        let payload: NewGroupRequest = {name: groupName, description: groupDescription};
        createGroup(payload).then(() => history.push(`/group/${groupName}`));
    }

    const cancel = (e: any) => {
        e.preventDefault();
        history.push('/feed');
    }

    return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Card id="EditProfile">
                    <Container>
                        <Row>
                            <Col id="editCol1">
                                <div className="form_input-group">
                                    <label htmlFor="first_name">Group Name</label>
                                    <input className="form_input" type="text" name="group_name" placeholder="Enter Group Name" onChange={handleChangeName} required />
                                </div>
                                <div className="form_input-group">
                                    <label htmlFor="about_me">Description</label>
                                    <textarea className="form_input" rows={10} name="about_me" placeholder="Group Description" onChange={handleChangeDescription}  > </textarea>
                                </div>
                            </Col>
                        </Row>
                        <Row className="groupEditButtonsRow">
                            <Col id="createGroupBtnCol">
                                <button data-testid="updateButton" id="CreateGroup" className="FormButtons" type="button" onClick={(e) => create(e)} >Create</button><br />
                            </Col>
                            <Col id="cancelGroupBtnCol">
                                <button data-testid="cancelButton" id="CancelCreateGroup" className="FormButtons" type="button" onClick={(e) => cancel(e)} >Cancel</button><br />
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Grid>
        </div>
    )
}