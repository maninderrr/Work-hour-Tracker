import { BrowserRouter as Router } from "react-router-dom";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Login from './Login';

// Mock axios.post method
jest.mock('axios');

describe('Login', () => {
  test('renders Login component', () => {
    render(<Router><Login /></Router>);
    const loginTitle = screen.getByText('Login');
    expect(loginTitle).toBeInTheDocument();
  });

  test('calls axios.post method when submitted', async () => {
    // Mock axios response
    const response = {
      data: {
        token: 'abc123',
      },
    };
    axios.post.mockResolvedValue(response);

    render(<Router><Login /></Router>);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('LOGIN');

    fireEvent.change(emailInput, { target: { value: 'jaspreetbhinder@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'workhard' } });

    fireEvent.click(loginButton);

    // Expect axios.post method to be called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8089/login', {
      email: 'jaspreetbhinder@gmail.com',
      password: 'workhard',
    });

    // Expect the navigation to the dashboard after successful login
    //await screen.findByText('dashboard');
  });

  test('displays error message when login fails', async () => {
    // Mock axios error
    const error = new Error('Invalid credentials');
    axios.post.mockRejectedValue(error);

    render(<Router><Login /></Router>);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('LOGIN');

    fireEvent.change(emailInput, { target: { value: 'jaspreetbhinder@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'workhard' } });

    fireEvent.click(loginButton);

    // Expect axios.post method to be called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8089/login', {
      email: 'jaspreetbhinder@gmail.com',
      password: 'workhard',
    });

    // Expect the error message to be displayed
    await screen.findByText('Invalid credentials');
  });
});

