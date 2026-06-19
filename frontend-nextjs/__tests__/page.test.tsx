import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../src/app/app/page';
import '@testing-library/jest-dom';

// Mock wagmi and components
jest.mock('wagmi', () => ({
  useAccount: jest.fn()
}));

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: () => <button>Connect Wallet</button>
}));

jest.mock('../src/hooks/useShare', () => ({
  useShareCount: jest.fn(),
  useShare: jest.fn(),
  useUserTotalContribution: jest.fn(),
  formatUSDT: (val: bigint) => val.toString(),
  getShareStatus: () => 'active',
  getShareProgress: () => 50,
  useContribution: jest.fn(() => ({ data: 100n }))
}));

import { useAccount } from 'wagmi';
import { useShareCount, useShare, useUserTotalContribution } from '../src/hooks/useShare';

describe('Dashboard', () => {
  it('shows connection required when not connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });
    (useShareCount as jest.Mock).mockReturnValue({ data: 0n });
    
    render(<Dashboard />);
    expect(screen.getByText('Connection Required')).toBeInTheDocument();
  });

  it('shows empty state when no shares exist', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true, address: '0x123' });
    (useShareCount as jest.Mock).mockReturnValue({ data: 0n });
    
    render(<Dashboard />);
    expect(screen.getByText('No SHARE found on the platform.')).toBeInTheDocument();
    expect(screen.getByText('+ New SHARE')).toBeInTheDocument();
  });

  it('renders a share card if the user is a member', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true, address: '0x123' });
    (useShareCount as jest.Mock).mockReturnValue({ data: 1n });
    
    (useShare as jest.Mock).mockImplementation((id) => {
      return {
        data: {
          name: 'Test Project',
          targetAmount: 1000n,
          totalReceived: 500n,
          members: ['0x123', '0x456'],
          currentValidations: 0n,
          threshold: 2n
        }
      };
    });
    
    (useUserTotalContribution as jest.Mock).mockReturnValue({
      data: [{ result: 500n }]
    });

    render(<Dashboard />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('My Total Investment')).toBeInTheDocument();
  });

  it('hides the share card if the user is not a member', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true, address: '0x999' }); // Not a member
    (useShareCount as jest.Mock).mockReturnValue({ data: 1n });
    
    (useShare as jest.Mock).mockImplementation((id) => {
      return {
        data: {
          name: 'Hidden Project',
          targetAmount: 1000n,
          totalReceived: 500n,
          members: ['0x123', '0x456'], // 0x999 is missing!
        }
      };
    });

    (useUserTotalContribution as jest.Mock).mockReturnValue({ data: null });

    render(<Dashboard />);
    expect(screen.queryByText('Hidden Project')).not.toBeInTheDocument();
  });
});
