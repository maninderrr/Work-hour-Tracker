import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

test('renders logo and brand name', () => {
  render(<Navbar />);
  const logo = screen.getByAltText('Work Hour Tracker');
  expect(logo).toBeInTheDocument();

  const brandName = screen.getByText('Work Hour Tracker');
  expect(brandName).toBeInTheDocument();
});

test('opens and closes navbar menu', () => {
  render(<Navbar />);
  const menuIcon = screen.getByTestId('menu-icon');
  const navElements = screen.getByTestId('nav-elements');

  // Navbar menu is initially closed
  expect(navElements).not.toHaveClass('active');

  // Clicking on menu icon should open the menu
  fireEvent.click(menuIcon);
  expect(navElements).toHaveClass('active');

  // Clicking again on menu icon should close the menu
  fireEvent.click(menuIcon);
  expect(navElements).not.toHaveClass('active');
});

test('contains navigation links', () => {
  render(<Navbar />);
  const homeLink = screen.getByText('Home');
  expect(homeLink).toBeInTheDocument();

  const employeesLink = screen.getByText('Employees');
  expect(employeesLink).toBeInTheDocument();

  const signOutLink = screen.getByText('Sign Out');
  expect(signOutLink).toBeInTheDocument();
});

test('navigates to home page with empid parameter', () => {
  const empid = 123;
  window.history.pushState({}, '', `/?id=${empid}`);
  render(<Navbar />);

  const homeLink = screen.getByText('Home');
  fireEvent.click(homeLink);

  expect(window.location.search).toBe(`?id=${empid}`);
});

test('navigates to employees page with empid parameter', () => {
  const empid = 456;
  window.history.pushState({}, '', `/?id=${empid}`);
  render(<Navbar />);

  const employeesLink = screen.getByText('Employees');
  fireEvent.click(employeesLink);

  expect(window.location.search).toBe(`?id=${empid}`);
});

test('navigates to sign out page', () => {
  render(<Navbar />);

  const signOutLink = screen.getByText('Sign Out');
  fireEvent.click(signOutLink);

  expect(window.location.pathname).toBe('/');
});
