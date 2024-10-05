import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Editor from '../components/Editor';

// Mock the socket
const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
};

// Mock the MonacoEditor
jest.mock('@monaco-editor/react', () => {
  return jest.fn(({ onChange }) => (
    <div data-testid="monaco-editor">
      <textarea onChange={(e) => onChange(e.target.value)} />
    </div>
  ));
});

describe('Editor Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Editor component', () => {
    render(<Editor roomId="test-room" socket={mockSocket} />);
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('emits code change event', () => {
    render(<Editor roomId="test-room" socket={mockSocket} />);
    const editor = screen.getByTestId('monaco-editor');
    fireEvent.change(editor.querySelector('textarea'), { target: { value: 'const test = 1;' } });
    expect(mockSocket.emit).toHaveBeenCalledWith('code-change', expect.any(Object));
  });

  it('updates language when changed', () => {
    render(<Editor roomId="test-room" socket={mockSocket} />);
    const languageSelector = screen.getByRole('combobox');
    fireEvent.change(languageSelector, { target: { value: '71' } }); // Python
    expect(mockSocket.emit).toHaveBeenCalledWith('language-change', expect.any(Object));
  });

  it('sets up socket listeners on mount', () => {
    render(<Editor roomId="test-room" socket={mockSocket} />);
    expect(mockSocket.on).toHaveBeenCalledWith('code-change', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('language-change', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('error', expect.any(Function));
  });

  it('cleans up socket listeners on unmount', () => {
    const { unmount } = render(<Editor roomId="test-room" socket={mockSocket} />);
    unmount();
    expect(mockSocket.off).toHaveBeenCalledWith('code-change', expect.any(Function));
    expect(mockSocket.off).toHaveBeenCalledWith('language-change', expect.any(Function));
    expect(mockSocket.off).toHaveBeenCalledWith('error', expect.any(Function));
  });
});
