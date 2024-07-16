import { render, screen } from '@testing-library/react';
import App from './App';

test('renders submit button', () => {
  render(<App />);
  const linkElement = document.getElementById("submit");
  expect(linkElement).toBeInTheDocument();
});
