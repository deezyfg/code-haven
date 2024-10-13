import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';  // Update this path

// Minimal mock
jest.mock('../pages/HomePage', () => () => <div>HomePage</div>);  // Update this path

// Add mocks for other pages to prevent import errors
jest.mock('../pages/AboutPage', () => () => <div>AboutPage</div>);
jest.mock('../pages/EditorPage', () => () => <div>EditorPage</div>);

describe('App', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText('HomePage')).toBeInTheDocument();
  });
});
