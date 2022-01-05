import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import SubmitPost from './SubmitPost';
import { BrowserRouter } from 'react-router-dom';
import { Post } from './post';
import { Profile } from '../profile/profile';
import App from '../../App';

describe('SubmitPost testing', () => {

  it('should show Post to Reverb', async ()=>{

    const initialPost: Post = {
      id: 0,
      title: "title",
      postText: "text",
      embedURL: "",
      date: "",
      profile: {
        id: 0,
        first_name: "",
        last_name: "",
        birthday: "",
        hobby: "",
        location: "",
        profile_img: "",
        header_img: "",
        about_me: ""
      },
      comments: []
    }

    const dummyFunc = jest.fn();

    let submitPostComponent = (<><SubmitPost
      setPost={() => { } }
      post={initialPost}
      dispatchPost={dummyFunc}
      show={true}
      onHide={() => { } } /><SubmitPost /></>);

    const { getByText, getByTestId } = render(
      <Provider store={store}>
          <BrowserRouter>
            {submitPostComponent}
          </BrowserRouter>
      </Provider>
    );
    expect(getByText("New Post")).toBeInTheDocument();

    const button = getByTestId("submitPostButton");
    fireEvent.click(button);
    expect(dummyFunc).toBeCalled();
  })

  // it("should give alert if you try to submit an empty post", () => {
  //   const initialPost: PostModel = {
  //     id: 0,
  //     title: "",
  //     postText: "",
  //     imageURL: "",
  //     date: "",
  //     profile: {
  //       id: 0,
  //       first_name: "",
  //       last_name: "",
  //       birthday: "",
  //       hobby: "",
  //       location: "",
  //       profile_img: "",
  //       header_img: "",
  //       about_me: ""
  //     },
  //     comments: []
  //   }
  //   const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
  //   let submitPostComponent = (<><SubmitPost
  //     setPost={() => { } }
  //     post={initialPost}
  //     dispatchPost={() => {}}
  //     show={true}
  //     onHide={() => { } } /><SubmitPost /></>);
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //         <BrowserRouter>
  //           {submitPostComponent}
  //         </BrowserRouter>
  //     </Provider>
  //   );

  //   const button = getByTestId("submitPostButton");
  //   fireEvent.click(button);
  //   expect(alertMock).toBeCalled();
  // })

});