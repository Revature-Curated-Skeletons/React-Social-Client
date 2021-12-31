import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import EditProfile, { util } from './EditProfile';
import { BrowserRouter } from 'react-router-dom';

describe('EditProfile testing', () => {

  it('should show First Name', async ()=>{

    const { getByText } = render(
      <Provider store={store}>
          <BrowserRouter>
            <EditProfile/>
          </BrowserRouter>
      </Provider>
    );
    expect(getByText("First Name")).toBeInTheDocument();
  })

  it('should call cancel and update when buttons are pushed', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
          <BrowserRouter>
            <EditProfile/>
          </BrowserRouter>
      </Provider>
    );
    const update = jest.spyOn(util, 'update');
    const button = getByTestId("updateButton");
    fireEvent.click(button);
    expect(update).toBeCalled();

    const cancel = jest.spyOn(util, 'cancel');
    const button2 = getByTestId("cancelButton");
    fireEvent.click(button2);
    expect(cancel).toBeCalled();
      
  })

});