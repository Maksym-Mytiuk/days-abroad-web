import { beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SignIn from '../../pages/SignIn';

beforeEach(() => {
  render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );
});

describe('SignUp Component', () => {
  it('should render without crashing', () => {
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('should have buttons signin via github and google', () => {
    expect(screen.getByTestId('github-signin')).toHaveTextContent('Continue with Github');
    expect(screen.getByTestId('google-signin')).toHaveTextContent('Continue with Google');
  });
});
