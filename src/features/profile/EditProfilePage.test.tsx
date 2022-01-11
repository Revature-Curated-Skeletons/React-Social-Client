import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import EditProfilePage from './EditProfilePage';
import { BrowserRouter } from 'react-router-dom';

describe('EditProfilePage testing', () => {

  it('should show Cancel', async ()=>{
    const { getByText } = render(
      <Provider store={store}>
          <BrowserRouter>
            <EditProfilePage/>
          </BrowserRouter>
      </Provider>
    );
    expect(getByText("Cancel")).toBeInTheDocument();
  })

});