import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders login page by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const loginElement = screen.getByText('Login');
  expect(loginElement).toBeInTheDocument();
});
test('renders login page by default', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  const loginElement = screen.getByText('Login');
  expect(loginElement).toBeInTheDocument();
});
test('renders resgister page by default', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    //expect(getByText('Register')).toBeInTheDocument();
  });




