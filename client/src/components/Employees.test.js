import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Employees from './Employees';
import axios from 'axios';

// mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

// describe('Employees', () => {
//   it('should fetch employee data and display it', async () => {
//     const data = [
//       { id: 1, empName: 'John Doe', email: 'john.doe@example.com', manager: 'Jane Smith', DOJ: '2022-01-01' },
//       { id: 2, empName: 'Jane Smith', email: 'jane.smith@example.com', manager: 'John Doe', DOJ: '2022-01-02' },
//     ];
//     axios.get.mockResolvedValueOnce({ data });

//     render(<Employees />);

//     await waitFor(() => {
//       expect(screen.getByText('John Doe')).toBeInTheDocument();
//       expect(screen.getByText('Jane Smith')).toBeInTheDocument();
//     });
//   });

//   it('should show popup and allow adding projects when "Assign Project" button is clicked', async () => {
//     const employeeId = 1;
//     const projectList = [
//       { id: 1, projectName: 'Project A' },
//       { id: 2, projectName: 'Project B' },
//       { id: 3, projectName: 'Project C' },
//     ];
//     const selectedProjectIds = [1, 2];
//     axios.get.mockResolvedValueOnce({ data: [] });
//     axios.get.mockResolvedValueOnce({ data: projectList });
//     axios.get.mockResolvedValueOnce({ data: selectedProjectIds });

//     render(<Employees />);

//     const assignProjectButton = screen.getByText('Assign Project');
//     fireEvent.click(assignProjectButton);

//     await waitFor(() => {
//       expect(screen.getByText('Select projects to add')).toBeInTheDocument();
//       expect(screen.getByText('Project A')).toBeInTheDocument();
//       expect(screen.getByText('Project B')).toBeInTheDocument();
//       expect(screen.getByText('Project C')).toBeInTheDocument();
//       expect(screen.getByDisplayValue('1')).toBeInTheDocument();
//       expect(screen.getByDisplayValue('2')).toBeInTheDocument();
//     });

//     const addProjectButton = screen.getByText('Add Project');
//     fireEvent.click(addProjectButton);

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledWith('http://localhost:8089/mapping/1', [{ projectID: 1 }, { projectID: 2 }]);
//       expect(screen.queryByText('Select projects to add')).not.toBeInTheDocument();
//       expect(screen.getByText('Projects added successfully!')).toBeInTheDocument();
//     });
//   });
// });
