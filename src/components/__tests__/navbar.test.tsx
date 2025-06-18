import { render, screen } from '@testing-library/react';
import { Navbar } from '../navbar';
import '@testing-library/jest-dom';

jest.mock('@clerk/nextjs', () => ({
  UserButton: () => <div data-testid="user-button" />,
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar', () => {
  it('renders the PushGrade logo', () => {
    render(<Navbar />);
    expect(screen.getByText('PushGrade')).toBeInTheDocument();
  });

  it('renders all main navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Interviews')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders the user button', () => {
    render(<Navbar />);
    expect(screen.getByTestId('user-button')).toBeInTheDocument();
  });
}); 