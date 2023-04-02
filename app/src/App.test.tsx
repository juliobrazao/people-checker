import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Main component test', () => {
  test('Renders people checker main component', () => {
    render(<App />);
    const linkElement = screen.getByText(/People Checker/i);
    expect(linkElement).toBeInTheDocument();
  });
});
