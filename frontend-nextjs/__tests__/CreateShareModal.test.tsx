import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreateShareModal } from '../src/components/CreateShareModal';
import '@testing-library/jest-dom';

// Mock the hook
jest.mock('../src/hooks/useShare', () => ({
  useCreateShare: () => ({
    createShare: jest.fn(),
    isPending: false,
    isConfirming: false,
    isSuccess: false,
  })
}));

describe('CreateShareModal', () => {
  it('renders the form correctly', () => {
    render(<CreateShareModal onClose={jest.fn()} />);
    
    expect(screen.getByText('Create a SHARE')).toBeInTheDocument();
    expect(screen.getByLabelText(/SHARE Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target Amount/i)).toBeInTheDocument();
  });

  it('validates member addresses to ensure they are properly formatted', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<CreateShareModal onClose={jest.fn()} />);
    
    const nameInput = screen.getByLabelText(/SHARE Name/i);
    const targetInput = screen.getByLabelText(/Target Amount/i);
    const membersInput = screen.getByLabelText(/Member Addresses/i);
    const destInput = screen.getByLabelText(/Destination/i);
    const thresholdInput = screen.getByLabelText(/Validation Threshold/i);
    const submitBtn = screen.getByText('Create SHARE');

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(targetInput, { target: { value: '100' } });
    fireEvent.change(membersInput, { target: { value: '0x123' } }); // Invalid address
    fireEvent.change(destInput, { target: { value: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd' } });
    fireEvent.change(thresholdInput, { target: { value: '1' } });

    fireEvent.click(submitBtn);

    expect(alertMock).toHaveBeenCalledWith('One or more member addresses are invalid. Make sure they start with 0x and are 42 characters long.');
    
    alertMock.mockRestore();
  });

  it('rejects deadlines in the past', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<CreateShareModal onClose={jest.fn()} />);
    
    const nameInput = screen.getByLabelText(/SHARE Name/i);
    const membersInput = screen.getByLabelText(/Member Addresses/i);
    const destInput = screen.getByLabelText(/Destination/i);
    const deadlineInput = screen.getByLabelText(/Expiration Date/i);
    const submitBtn = screen.getByText('Create SHARE');

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(membersInput, { target: { value: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd,0x1111111111111111111111111111111111111111' } });
    fireEvent.change(destInput, { target: { value: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd' } });
    
    // Set deadline to past
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    fireEvent.change(deadlineInput, { target: { value: pastDate.toISOString().slice(0, 16) } });

    fireEvent.click(submitBtn);

    expect(alertMock).toHaveBeenCalledWith('The expiration date must be in the future.');
    
    alertMock.mockRestore();
  });
});
