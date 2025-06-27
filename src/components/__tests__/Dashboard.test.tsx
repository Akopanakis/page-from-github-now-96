import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { LanguageProvider } from '@/contexts/LanguageContext';

describe('Dashboard', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LanguageProvider>{children}</LanguageProvider>
  );

  test('renders without crashing', () => {
    render(<Dashboard />, { wrapper });
    expect(screen.getByText('Ταμπλό Αναλυτικών')).toBeInTheDocument();
  });
});
