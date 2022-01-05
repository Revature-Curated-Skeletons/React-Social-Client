import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Register, { util } from './Register';
import { BrowserRouter } from 'react-router-dom';

describe('The Register page', () => {

  it('should show Email', async ()=>{

    const comp = <Register></Register>;
    const { getByText, getByTestId } = render(
      <Provider store={store}>
          <BrowserRouter>
            {comp}
          </BrowserRouter>
      </Provider>
    );
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Password")).toBeInTheDocument();

    const registerFunc = jest.spyOn(util, 'registerAccount');

    const button = getByTestId("submitButton");
    fireEvent.click(button);
    expect(registerFunc).toBeCalled();
  })
});