import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

describe('logged in navbar', () => {

  it('should show register', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar loggedIn={""} />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Register")).toBeInTheDocument();
  })
  it('should show login', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar loggedIn={""} />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Login")).toBeInTheDocument();
  })

});
describe('logged in navbar', () => {

  // it('should show home', () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <Navbar loggedIn={"a"} />
  //       </BrowserRouter>
  //     </Provider>
  //   );
  //   expect(getByTestId("logolink")).toBeInTheDocument();
  // })
  it('should show profile', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar loggedIn={"a"} />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Profile")).toBeInTheDocument();
  })
})
