import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import EditorPage from '../pages/EditorPage';

const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
};

jest.mock('../socket', () => ({
  initSocket: jest.fn(() => mockSocket),
}));

jest.mock('../components/Editor', () => {
  return jest.fn(() => <div data-testid="mock-editor">Mock Editor</div>);
});

describe('EditorPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders EditorPage component', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/editor/test-room']}>
          <Route path="/editor/:roomId">
            <EditorPage />
          </Route>
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId('mock-editor')).toBeInTheDocument();
  });

  it('initializes socket connection', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/editor/test-room']}>
          <Route path="/editor/:roomId">
            <EditorPage />
          </Route>
        </MemoryRouter>
      );
    });

    expect(mockSocket.on).toHaveBeenCalledWith('connect_error', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('connect_failed', expect.any(Function));
    expect(mockSocket.emit).toHaveBeenCalledWith('join', expect.any(Object));
  });

  it('handles client join and disconnect', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/editor/test-room']}>
          <Route path="/editor/:roomId">
            <EditorPage />
          </Route>
        </MemoryRouter>
      );
    });

    const joinHandler = mockSocket.on.mock.calls.find(call => call[0] === 'joined')[1];
    act(() => {
      joinHandler({ clients: [{ socketId: '1', username: 'user1' }], username: 'user1', socketId: '1' });
    });

    expect(screen.getByText('user1')).toBeInTheDocument();

    const disconnectHandler = mockSocket.on.mock.calls.find(call => call[0] === 'disconnected')[1];
    act(() => {
      disconnectHandler({ socketId: '1', username: 'user1' });
    });

    expect(screen.queryByText('user1')).not.toBeInTheDocument();
  });
});
