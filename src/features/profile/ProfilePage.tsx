import React from "react";
import { Row } from "react-bootstrap";
import ProfileInformation from "./ProfileInformation";
import SearchBar from "../search/SearchBar";

export default function ProfilePage(props: any) {

    return(
        <>
        <SearchBar />
        <Row>
            <ProfileInformation beep={props.beep}/>
        </Row>
        </>
    )
}