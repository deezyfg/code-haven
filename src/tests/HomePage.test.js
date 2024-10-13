import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../pages/HomePage';

// Minimal mocks
jest.mock('react-hot-toast', () => ({}));
jest.mock('uuid', () => ({ v4: () => 'mocked-uuid' }));

describe('HomePage', () => {
  test('renders main title', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText('Welcome to Code Haven')).toBeInTheDocument();
  });
});
