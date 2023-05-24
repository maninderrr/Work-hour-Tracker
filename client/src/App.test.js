import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

describe('App component', () => {
  it('renders the login form by default', () => {
    const { getByText } = render(<Router><App /></Router>);
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('switches to the register form when the link is clicked', () => {
    const { getByText } = render(<Router><App /></Router>);
    fireEvent.click(getByText('Dont Have an account? Register here'));
    expect(getByText('Register')).toBeInTheDocument();
  });

  it('switches back to the login form when the link is clicked again', () => {
    const { getByText } = render(<Router><App /></Router>);
    fireEvent.click(getByText('Dont Have an account? Register here'));
    fireEvent.click(getByText('Already Have an account? Login here'));
    expect(getByText('Login')).toBeInTheDocument();
  });
});
