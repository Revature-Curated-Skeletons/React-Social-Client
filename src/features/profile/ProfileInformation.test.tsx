import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ProfileInformation from './ProfileInformation';
import { BrowserRouter } from 'react-router-dom';

describe('ProfileInformation testing', () => {

  it('should show a loading gif', async () => {

    React.useState = jest.fn()
      .mockReturnValueOnce([false, () => {}])
      .mockReturnValueOnce([false, () => {}])

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileInformation />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId("gif")).toBeInTheDocument();
  })

  it('should show about me and edit', async () => {

    React.useState = jest.fn()
      .mockReturnValueOnce([true, () => {}])
      .mockReturnValueOnce([true, () => {}])

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileInformation />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("About Me")).toBeInTheDocument();
    expect(getByText("Edit Profile")).toBeInTheDocument();
  })
});