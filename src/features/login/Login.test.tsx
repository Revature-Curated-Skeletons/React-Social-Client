import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Login, { util } from './Login';
import { BrowserRouter } from 'react-router-dom';

describe('login test', () => {

  it('should show Login', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Email")).toBeInTheDocument();
  })
  it('should show Password', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Password")).toBeInTheDocument();

  })

  // it('should call the loginAccount function', async () => {
  //   const loginFunc = jest.spyOn(util, 'loginAccount');
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <Login />
  //       </BrowserRouter>
  //     </Provider>)

  //   const button = getByTestId("submitButton");
  //   fireEvent.click(button);
  //   expect(loginFunc).toBeCalled();
  // })

});