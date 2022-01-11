import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import SubmitComment from './SubmitComment';
import { BrowserRouter } from 'react-router-dom';
import { Comment } from './comment';

describe('SubmitComment testing', () => {

  it('should show Post to Reverb', async () => {

    const initialComment: Comment = {
      commentId: 0,
      commentText: "text",
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
      }
    }

    const dummyFunc = jest.fn();

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SubmitComment
            setComment={() => { }}
            comment={initialComment}
            show={true}
            dispatchComment={dummyFunc}
            onHide={() => { }}
            postId={0} />
          <SubmitComment />
        </BrowserRouter>
      </Provider>
    );
    
    expect(getByText("New Comment")).toBeInTheDocument();

    const button = getByTestId("submitCommentButton");
    fireEvent.click(button);
    expect(dummyFunc).toBeCalled();
  })

});