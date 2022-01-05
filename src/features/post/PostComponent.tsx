import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Post } from './post';
import { checkIfPostCanBeLiked, getNumLikes, likePost, unlikePost } from "../like/likes.api";
import { Link } from "react-router-dom";
import ReverbIcon from '../../assets/images/reverb_icon_final.png';
import { formatYT } from "../../util/youtubeFunctions";
import { getProfile, getProfileByAuthor, getProfileById } from "../profile/profile.api";
import { initialProfile, Profile } from "../profile/profile";
import { getProfileByIdAsync } from "../profile/profileSlice";
import { async } from "@firebase/util";


const PostComponent =  ({ shouldUpdateLikes, post, leaveComment }: 
    { shouldUpdateLikes: boolean[], post: Post, leaveComment: any }) =>  {

    const initialLikes: number = 0;
    const [canLike, setCanLike] = React.useState(false);
    const [likes, setLikes] = React.useState(initialLikes);
    const [authorProfile, setAuthorProfile] = React.useState(initialProfile);
    const [commentAuthor, setCommentAuthor] = React.useState(initialProfile);

    const updateLikes = () => {
        // console.log("Calling backend to update likes on post " + post.id);
        getNumLikes(post.id)
            .then(
                (data) => { setLikes(data) }
            );
    }

    

    const likePostFunc = () => {
        if (canLike)
        {
            setCanLike(false);
            likePost(post.id).then(async () => {
                //instead of making another DB call, it just updates the likes by 1
                setLikes(likes + 1);
            }).catch((e) => {
                //unsuccessful
                setCanLike(true);
                console.log(e)
            })
        }
        else 
        {
            setCanLike(true);
            unlikePost(post.id).then(async () => {
                setLikes(likes - 1);
            }).catch((e) => {
                //unsuccessful
                setCanLike(false);
                // console.log(e)
            })
        }
        
    }

    const getPostAuthor = () => {
        getProfileByAuthor(post.authorID).then(function (data) {
            setAuthorProfile(data);
        }); 
    }

    function getCommentAuthor(cAuthId: string){
        const getcAuth = () => {
                getProfileByAuthor(cAuthId).then(function(data) {
                setCommentAuthor(data);
            });
        }

        getcAuth();
    
    }


    

    //checks to see if the post can be liked
    //updates the number of likes
    
    useEffect(() => {
        updateLikes();
        getPostAuthor();
        checkIfPostCanBeLiked(post.id).then(canLikeReturn => setCanLike(!canLikeReturn));
    }, [shouldUpdateLikes]); 


    // Fetch the profile of the post's author to be linked
    
    
    

    //console.log("Outside post author!");
    //console.log(authorProfile);

    
    
    

    return (
        <Card id="postCard">
            <Card.Header>
                {/* Link to the poster's profile in Reverb*/}
                <Card.Subtitle id="postAuthor"><Link to={`profile/${authorProfile.id}`}>{"" + authorProfile.first_name} {"" + authorProfile.last_name}</Link></Card.Subtitle>
                {/*Date that the post was made.*/}
                <Card.Text id = "postTime">{"" + new Date(post.date + 'Z').toLocaleString() }</Card.Text>
                {/*To like the post*/}
                <Button data-testid="reverbButton" id="reverbButton" onClick={() => likePostFunc()} variant="warning"
                    style={{ float: 'right', marginTop: "-2rem" }}>{likes}<img id="reverbIcon" src={ReverbIcon} alt="Click to Like!"/></Button>
            </Card.Header>
            <Card.Body id="postBody">
                {/*Sets the contents of a post. First by setting the embed. */}
                {post.contentType == 'VID' && <Card.Img as ='iframe' variant='top' id="postVideo" src={"https://www.youtube.com/embed/" + formatYT(post.contentLink)} frameBorder='0' allowFullScreen/>}
                {post.contentType == 'IMG' && <Card.Img variant='top' id="postImage" src={"" + post.contentLink} />}
                <Card.Text style={{ whiteSpace:'pre', maxHeight: '28vh', overflowY:'auto' }} >
                    {post.postText}
                </Card.Text>
            </Card.Body>
            
            <ListGroup id="commentBody" className="list-group-flush" >
                
                {post.comments.map((comment, idx) => {

                    return (
                    <ListGroupItem key={idx}>
                        {comment.commentText}
                        <footer id="commentFooter" style={{ float: "right", fontSize: "0.8rem", marginTop: "0.8rem" }}>
                             <Link to={`profile/${comment.author?.pfId}`}>{comment.author?.firstname} {comment.author?.lastname}</Link> | {new Date(comment.date + 'Z').toLocaleString()}
                             
                        </footer>
                    </ListGroupItem>
                )
                })}

            </ListGroup>
                
                
            <Card.Body>
                <Button data-testid="submitButton" id="leaveCommentBtn" onClick={() => leaveComment(post.id)}>Leave Comment</Button>
            </Card.Body>
        </Card>
    );
}

export default PostComponent;
