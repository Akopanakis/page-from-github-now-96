import { render, screen } from '@testing-library/react';
import ResultsSection from '../ResultsSection';
import { LanguageProvider } from '@/contexts/LanguageContext';

describe('ResultsSection', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LanguageProvider>{children}</LanguageProvider>
  );

  const mockResults = {
    totalCost: 1,
    totalCostWithVat: 1.24,
    sellingPrice: 2,
    profitPerKg: 0.5,
    profitMargin: 20,
    netWeight: 1,
    purchaseCost: 0.5,
    laborCost: 0.1,
    packagingCost: 0.05,
    transportCost: 0.1,
    additionalCosts: 0.05,
    vatAmount: 0.24,
    finalProcessedWeight: 1,
    totalWastePercentage: 0,
    costBreakdown: [],
    recommendedSellingPrice: 2.2,
    competitorAnalysis: {
      ourPrice: 2,
      competitor1Diff: 0,
      competitor2Diff: 0,
      marketPosition: 'competitive',
    },
    profitAnalysis: {
      breakEvenPrice: 1,
      marginAtCurrentPrice: 20,
      recommendedMargin: 25,
    },
  };

  const mockForm = { competitor1: 0, competitor2: 0 };

  test('renders without crashing', () => {
    render(
      <ResultsSection
        results={mockResults}
        formData={mockForm}
        isCalculating={false}
        onCalculate={async () => {}}
        onReset={() => {}}
      />,
      { wrapper }
    );
    expect(
      screen.getByText('Κοστολόγηση Προϊόντος')
    ).toBeInTheDocument();
  });
});
