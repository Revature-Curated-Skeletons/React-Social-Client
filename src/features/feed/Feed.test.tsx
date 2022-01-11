import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Feed, { util } from './Feed';
import { BrowserRouter } from 'react-router-dom';

describe('Feed testing', () => {

  it('should show Create Post', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Feed />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("+ Create Post")).toBeInTheDocument();
  })

  it('should call post and refresh when buttons are pushed', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Feed />
        </BrowserRouter>
      </Provider>
    );
    const leavePost = jest.spyOn(util, 'leavePost');
    const button = getByTestId("postButton");
    fireEvent.click(button);
    expect(leavePost).toBeCalled();

    const updateAll = jest.spyOn(util, 'updateAll');
    const button2 = getByTestId("refreshButton");
    fireEvent.click(button2);
    expect(updateAll).toBeCalled();

  })
});