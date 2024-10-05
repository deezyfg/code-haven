import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('HomePage Component', () => {
  it('renders HomePage component', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText(/Welcome to RealTime CodeCollab/i)).toBeInTheDocument();
  });

  it('displays features', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText(/Real-time Editing/i)).toBeInTheDocument();
    expect(screen.getByText(/Multiple Languages/i)).toBeInTheDocument();
  });

  it('allows room creation', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    const createRoomButton = screen.getByText(/Create a new room/i);
    fireEvent.click(createRoomButton);
    expect(screen.getByPlaceholderText(/ROOM ID/i)).toHaveValue();
  });

  it('navigates to editor on room join', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    const roomIdInput = screen.getByPlaceholderText(/ROOM ID/i);
    const usernameInput = screen.getByPlaceholderText(/USERNAME/i);
    const joinButton = screen.getByText(/Join Room/i);

    fireEvent.change(roomIdInput, { target: { value: 'test-room' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(joinButton);

    expect(mockNavigate).toHaveBeenCalledWith('/editor/test-room', expect.any(Object));
  });

  it('shows error when joining without room ID or username', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    const joinButton = screen.getByText(/Join Room/i);
    fireEvent.click(joinButton);
    expect(screen.getByText(/ROOM ID & username are required/i)).toBeInTheDocument();
  });
});
