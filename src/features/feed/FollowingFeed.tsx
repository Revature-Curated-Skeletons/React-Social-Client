import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SubmitPost from '../post/SubmitPost';
import { getFollowPostsAsync, getPostsAsync, postPostAsync, selectPosts } from '../post/postSlice';
import PostComponent from '../post/PostComponent';
import SubmitComment from '../comment/SubmitComment';
import { createComment } from '../comment/comment.api';
import { initialPost } from '../post/post';
import { initialComment } from '../comment/comment';
import RefreshIcon from '../../assets/images/refreshicon.svg';
import SearchBar from '../search/SearchBar';

export let util = {
  updateAll: () => { },
  leavePost: () => { },
  leaveComment: (npostId: number) => { },
  dispatchComment: () => { },
  dispatchPost: () => { }
};

const FollowingFeed = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);

  const [modalShowPost, setModalShowPost] = useState(false);
  const [modalShowComment, setModalShowComment] = useState(false);

  const [postId, setPostId] = useState(0);

  const [shouldUpdateLikes, setShouldUpdateLikes] = useState([false]);

  util.updateAll = () => {
    dispatch(getFollowPostsAsync({}));
    setShouldUpdateLikes([!shouldUpdateLikes[0]]); // :^);
    // console.log("Updated feed");
  }

  const [comment, setComment] = useState(initialComment);
  const [post, setPost] = useState(initialPost);

  util.leavePost = () => {
    setPost(initialPost);
    setModalShowPost(true);
  }

  util.leaveComment = (npostId: number) => {
    setComment(initialComment);
    setPostId(npostId);
    setModalShowComment(true);
  }

  util.dispatchComment = () => {
    createComment(postId, comment).then(() => util.updateAll());
  }

  util.dispatchPost = () => {
    dispatch(postPostAsync(post));
  }

  return (
    <div id="feedBody">
      <SearchBar />
      <div id="postColumn">
        <div id="feedButtons"> 
          <Button data-testid="postButton" id="postBtn" className='feed-btns' variant="primary" onClick={() => util.leavePost()}>
            + Create Post
          </Button>
          <Button data-testid="refreshButton" id="refreshBtn" className='feed-btns' variant="primary" onClick={() => util.updateAll()}>
            <img id="refresh-icon" src={RefreshIcon} /> Refresh
          </Button>
        </div>
        <SubmitPost
          setPost={setPost}
          post={post}
          dispatchPost={util.dispatchPost}
          show={modalShowPost}
          onHide={() => setModalShowPost(false)}
        />
        <SubmitComment
          setComment={setComment}
          comment={comment}
          show={modalShowComment}
          dispatchComment={util.dispatchComment}
          onHide={() => setModalShowComment(false)}
          postId={postId}
        />
        
      </div>
      {posts.map((post) => (<PostComponent shouldUpdateLikes={shouldUpdateLikes}
          post={post} leaveComment={util.leaveComment} key={post.id} />)).reverse()}
    </div>
  );
}

export default FollowingFeed;
