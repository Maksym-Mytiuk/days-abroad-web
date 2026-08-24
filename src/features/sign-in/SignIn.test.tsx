import { beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

// The db singleton initializes Firebase on import, which needs real credentials.
// This test only asserts on rendered markup, so stub it out.
vi.mock('@/common/services/db/User', () => ({
  default: { signin: vi.fn() },
}));

import SignIn from '@/features/sign-in';

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
