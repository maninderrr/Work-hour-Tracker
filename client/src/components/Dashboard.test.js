import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('Dashboard')).toBeInTheDocument();
  });

  test('updates the date range when previous week button is clicked', async () => {
    const { getByTestId, getByText } = render(<Dashboard />);
    const startDateText = getByTestId('start-date').textContent;
    const previousWeekButton = getByText('Previous Week');
    fireEvent.click(previousWeekButton);
    await waitFor(() => expect(getByTestId('start-date').textContent).not.toBe(startDateText));
  });

  test('displays a success toast when data is successfully updated', async () => {
    const { getByTestId, getByText } = render(<Dashboard />);
    const projectButton = getByTestId('project-1');
    fireEvent.click(projectButton);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    await waitFor(() => expect(getByTestId('toast')).toHaveTextContent('Successfully updated: Project 1'));
  });

  test('displays an error toast when data fails to update', async () => {
    const { getByTestId, getByText } = render(<Dashboard />);
    const projectButton = getByTestId('project-2');
    fireEvent.click(projectButton);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    await waitFor(() => expect(getByTestId('toast')).toHaveTextContent('ERROR updating: Project 2'));
  });
});
