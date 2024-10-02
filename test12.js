import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManageAlertsPage from './ManageAlertsPage';
import '@testing-library/jest-dom';

// Mock the debounce function to avoid delays in the test
jest.mock('lodash', () => ({
  debounce: (fn) => fn,
}));

describe('ManageAlertsPage Component', () => {
  test('renders the component with breadcrumbs and heading', () => {
    render(<ManageAlertsPage />);

    // Check if the breadcrumbs are rendered
    expect(screen.getByText('Configurations')).toBeInTheDocument();
    expect(screen.getByText('Manage alerts')).toBeInTheDocument();

    // Check if the heading is present
    expect(screen.getByText('Manage alerts')).toBeInTheDocument();
  });

  test('opens modal when "Create new alert" button is clicked', () => {
    render(<ManageAlertsPage />);

    // Button to open the modal
    const createAlertButton = screen.getByText('Create new alert');
    fireEvent.click(createAlertButton);

    // Modal should appear
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('displays alerts in the alert table', () => {
    render(<ManageAlertsPage />);

    // Check if the first alert is displayed
    expect(screen.getByText('Current Prod WHS alert')).toBeInTheDocument();
    expect(screen.getByText('Prod SLA Limit')).toBeInTheDocument();
  });

  test('triggers delete action when delete button is clicked', () => {
    render(<ManageAlertsPage />);

    // Click the delete button for the first alert
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    // Confirm deletion logic (could mock this if there's an API call)
    // Add expectation logic based on what happens after deletion
  });

  test('search functionality updates alert list', async () => {
    render(<ManageAlertsPage />);

    // Find search input and simulate typing
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Prod SLA Limit' } });

    // Wait for debounce
    await waitFor(() => {
      // Only the "Prod SLA Limit" alert should remain
      expect(screen.getByText('Prod SLA Limit')).toBeInTheDocument();
      expect(screen.queryByText('Current Prod WHS alert')).not.toBeInTheDocument();
    });
  });

  test('sorts alerts when sorting is triggered', () => {
    render(<ManageAlertsPage />);

    // Simulate sorting (e.g., clicking a column header to sort by alert name)
    const sortingButton = screen.getByText('Alert Name'); // Assuming there's a column header for sorting
    fireEvent.click(sortingButton);

    // Add expectations for sorting, e.g., check the order of displayed alerts
  });
});
