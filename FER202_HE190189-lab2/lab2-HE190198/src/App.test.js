import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mini Movie Manager header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Mini Movie Manager/i);
  expect(headerElement).toBeInTheDocument();
});
