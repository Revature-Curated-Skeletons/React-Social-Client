import React from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectPosts } from "../post/postSlice";
import { deleteGroup } from "./Group.api";
import { clear } from "../post/postSlice"

export default function DeleteGroup(props: any) {
    const history = useHistory();
    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();

    function removeGroup(groupName: string, hide: any) {
        dispatch(clear())
        deleteGroup(groupName).then(() => {history.push('/feed')});
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="deleteGroupModal"
        >
            <Modal.Header closeButton >
                <Modal.Title>
                    Deleting Group
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Click on confirm to delete the group {props.groupName}
            </Modal.Body>
            <Modal.Footer>
            <Form>
                    <Button variant="primary" id="confirmDelete" type="button" onClick={() => removeGroup(props.groupName, props.onHide)}>Confirm</Button>
                    <Button variant="secondary" id="cancelDelete" type="button" onClick={() => props.onHide()}>Cancel</Button>
                </Form>
            </Modal.Footer>
        </Modal>
    );

}