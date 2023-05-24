import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Register from './Register';

jest.mock('axios');

describe('Register component', () => {
  it('renders form elements', () => {
    render(<Register />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Date Of Joining')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'REGISTER' })).toBeInTheDocument();
  });

  it('submits form with user data', async () => {
    const mockResponse = {
      data: {
        message: 'User registered successfully',
      },
    };
    axios.post.mockResolvedValue(mockResponse);

    render(<Register onFormSwitch={jest.fn()} />);
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const dojInput = screen.getByLabelText('Date Of Joining');
    const registerButton = screen.getByRole('button', { name: 'REGISTER' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(dojInput, { target: { value: '2022-03-05' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8089/register', {
        email: 'johndoe@example.com',
        empName: 'John Doe',
        password: 'password123',
        DOJ: '2022-03-05',
      });
      expect(screen.getByRole('button', { name: 'Already Have an account? Login here' })).toBeInTheDocument();
    });
  });

  it('displays error message on form submission failure', async () => {
    axios.post.mockRejectedValue(new Error('Something went wrong'));

    render(<Register onFormSwitch={jest.fn()} />);
    const registerButton = screen.getByRole('button', { name: 'REGISTER' });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  it('switches to login form on button click', () => {
    const onFormSwitch = jest.fn();
    render(<Register onFormSwitch={onFormSwitch} />);
    const loginButton = screen.getByRole('button', { name: 'Already Have an account? Login here' });

    fireEvent.click(loginButton);

    expect(onFormSwitch).toHaveBeenCalledWith('login');
  });
});
