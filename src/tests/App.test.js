import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock the child components
jest.mock('../components/Navbar', () => {
  return jest.fn(() => <div data-testid="mock-navbar">Mock Navbar</div>);
});

jest.mock('../pages/HomePage', () => {
  return jest.fn(() => <div data-testid="mock-homepage">Mock HomePage</div>);
});

jest.mock('../pages/AboutPage', () => {
  return jest.fn(() => <div data-testid="mock-aboutpage">Mock AboutPage</div>);
});

jest.mock('../pages/EditorPage', () => {
  return jest.fn(() => <div data-testid="mock-editorpage">Mock EditorPage</div>);
});

describe('App Component', () => {
  it('renders Navbar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
  });

  it('renders HomePage on root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('mock-homepage')).toBeInTheDocument();
  });

  it('renders AboutPage on /about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('mock-aboutpage')).toBeInTheDocument();
  });

  it('renders EditorPage on /editor/:roomId route', () => {
    render(
      <MemoryRouter initialEntries={['/editor/test-room']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('mock-editorpage')).toBeInTheDocument();
  });

  it('renders Toaster component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(document.querySelector('.react-hot-toast')).toBeInTheDocument();
  });
});
