import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Profile from './ProfileComponent';
import { BrowserRouter } from 'react-router-dom';

describe('The Profile page', () => {

  it('should show Profile Page', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Profile Page")).toBeInTheDocument();
  })
});