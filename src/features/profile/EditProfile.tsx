import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProfileAsync, selectProfile, updateProfileAsync } from './profileSlice';
import Upload_Picture from './UploadPicture';

export let util = { update: (e: any) => { }, cancel: (e: any) => { } };

export default function EditProfile() {
    useEffect(() => {
        dispatch(getProfileAsync(profile));
    }, []);

    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();

    const history = useHistory();



    const [input, setInput] = useState(profile);

    const handleChange = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };


    util.update = (e: any) => {
        e.preventDefault();
        // console.log('editProfile' + JSON.stringify(input));
        dispatch(updateProfileAsync(input));
        history.push('/profile');
    }

    util.cancel = (e: any) => {
        e.preventDefault();
        history.push('/profile');
    }

    return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Card id="EditProfile">
                    <Container>
                        <Row>
                            <Col id="editCol1">
                                <div className="form_input-group">
                                    <label htmlFor="first_name">First Name</label>

                                    <input className="form_input" type="text" name="first_name" placeholder="First name" value={input.first_name}

                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="last_name">Last Name</label>

                                    <input className="form_input" type="textbox" name="last_name" placeholder="Last name" value={input.last_name}
                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="about_me">About Me</label>
                                    <textarea className="form_input" rows={10} name="about_me" placeholder="Your about me" value={input.about_me}
                                        onChange={handleChange}  > </textarea>
                                </div>
                            </Col>
                            <Col id="editCol2">
                                <div className="form_input-group">
                                    <label htmlFor="last_name">Birthday</label>
                                    <input className="form_input" type="textbox" name="birthday" placeholder="Birthday" value={input.birthday}

                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="last_name">Hobbies</label>
                                    <input className="form_input" type="textbox" name="hobby" placeholder="Hobby" value={input.hobby}
                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="last_name">Location</label>
                                    <input className="form_input" type="textbox" name="location" placeholder="Location" value={input.location}
                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                <label htmlFor="profile_img">Select Profile Image</label>
                                    <div className='form_input'>
                                        <Upload_Picture targetPicture="profile"/>
                                    </div>
                                </div>
                                <div className="form_input-group">
                                <label htmlFor="header_img">Select Header Image</label>
                                    <div className='form_input'>
                                        <Upload_Picture targetPicture="header"/>
                                    </div>
                                </div>
                                <br />
                            </Col>
                        </Row>
                        <Row id="editButtonsRow">
                            <Col id="updateProfileBtnCol">
                                <button data-testid="updateButton" id="UpdateProfile" type="submit" onClick={(e) => util.update(e)} >Update</button><br />
                            </Col>
                            <Col id="cancelProfileBtnCol">
                                <button data-testid="cancelButton" id="CancelEdits" type="submit" onClick={(e) => util.cancel(e)} >Cancel</button><br />
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Grid>
        </div>
    )

}


