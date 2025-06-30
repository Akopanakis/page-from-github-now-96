# KostoPro Enhanced - Professional Seafood Costing Platform

![KostoPro Logo](https://via.placeholder.com/200x80/1e40af/ffffff?text=KostoPro)

A comprehensive, professional-grade seafood costing and analysis platform built with React, TypeScript, and modern web technologies.

## 🌟 Features

### 💼 Professional Navigation

- **Sidebar Navigation**: Collapsible professional sidebar with categorized sections
- **Breadcrumb Navigation**: Clear navigation path showing current location
- **Quick Actions Toolbar**: One-click access to frequently used functions
- **Responsive Design**: Mobile-first approach with touch-friendly interactions

### 📊 Executive Dashboard

- **KPI Monitoring**: Real-time key performance indicators
- **Financial Ratios**: Comprehensive analysis of profitability, efficiency, and activity ratios
- **Market Trends**: Economic trends analysis with seasonal factors
- **Alert System**: Intelligent notifications for critical metrics

### 💰 Advanced Economic Features

- **Financial Ratios**: 8+ key financial metrics with benchmarking
- **Market Intelligence**: Global seafood price indices and market indicators
- **Economic Trends**: Seasonal analysis, demand/supply forecasting
- **Sustainability Metrics**: Environmental impact and sustainability premiums

### 🎯 Core Costing Features

- **Product Management**: Comprehensive product information tracking
- **Processing Phases**: Multi-stage processing with loss calculations
- **Cost Management**: Direct/indirect costs with real-time calculations
- **Transport Logistics**: Multi-leg transport cost optimization
- **VAT & Pricing**: Advanced pricing strategies with margin analysis

### 📈 Analysis & Reporting

- **Performance Analytics**: Efficiency scoring and benchmarking
- **Break-even Analysis**: Pricing optimization recommendations
- **Scenario Analysis**: What-if analysis for different scenarios
- **Export Capabilities**: PDF reports and Excel data export

### 🏢 Enterprise Features

- **Error Boundaries**: Robust error handling and recovery
- **PWA Support**: Offline functionality with service worker
- **Multi-language**: Greek and English language support
- **Professional Theming**: Light/dark mode with consistent design

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + Radix UI components
- **State Management**: React hooks with context API
- **Charts**: Recharts for data visualization
- **PDF Generation**: jsPDF with custom templates
- **Excel Export**: XLSX with multi-sheet support
- **PWA**: Service worker for offline functionality
- **Deployment**: Vercel-optimized build configuration

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd kostopro-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, cards, etc.)
│   ├── charts/          # Chart components
│   ├── Sidebar.tsx      # Professional navigation sidebar
│   ├── ExecutiveDashboard.tsx  # Executive-level KPI dashboard
│   ├── FinancialRatios.tsx     # Financial analysis component
│   ├── EconomicTrends.tsx      # Market trends analysis
│   └── ErrorBoundary.tsx       # Error handling wrapper
├── pages/               # Page components
│   ├── Index.tsx        # Classic application layout
│   └── EnhancedIndex.tsx # Professional layout (default)
├── hooks/               # Custom React hooks
├── contexts/            # React context providers
├── utils/               # Utility functions and calculations
├── types/               # TypeScript type definitions
└── styles/              # CSS and styling files
```

## 🎨 Key Components

### Executive Dashboard

Comprehensive executive-level overview with:

- Revenue and profitability KPIs
- Efficiency and cost control metrics
- Status indicators and trend analysis
- Integrated financial ratios and market trends

### Financial Ratios

Professional financial analysis featuring:

- **Profitability Ratios**: Gross margin, net margin, ROI
- **Efficiency Ratios**: Cost per kg, processing efficiency, asset turnover
- **Activity Ratios**: Inventory turnover, days sales outstanding
- Benchmarking against industry standards

### Economic Trends

Market intelligence system with:

- Global seafood price indices
- Fuel cost impacts and currency effects
- Seasonal demand/supply patterns
- Long-term market forecasts

### Professional Navigation

- Categorized sidebar with premium/free sections
- Breadcrumb navigation for clear location awareness
- Quick actions toolbar for efficient workflow
- Mobile-responsive with touch-friendly interactions

## 🔧 Configuration

### Environment Variables

```env
NODE_ENV=production
VITE_API_URL=your-api-url
VITE_COMPANY_NAME=your-company-name
```

### Deployment (Vercel)

The application is pre-configured for Vercel deployment:

1. **Connect your repository** to Vercel
2. **Set build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**: Automatic deployment on push to main branch

### Build Optimization

- **Code Splitting**: Optimized chunk splitting for faster loading
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and CSS optimization
- **PWA**: Service worker for caching and offline support

## 📱 Mobile Responsiveness

The application is fully responsive with:

- **Mobile-first design** approach
- **Touch-friendly interactions** (44px minimum touch targets)
- **Safe area support** for modern mobile devices
- **Responsive typography** with clamp() functions
- **Optimized layouts** for all screen sizes

## 🎯 Usage Guide

### Basic Workflow

1. **Enter Product Information**: Name, weight, quantity, origin
2. **Configure Processing**: Add processing phases with loss percentages
3. **Add Costs**: Direct and indirect costs with categorization
4. **Set Transport**: Multi-leg transport with distance and costs
5. **Calculate**: Generate comprehensive cost analysis
6. **Analyze**: Review financial ratios and market trends
7. **Export**: Generate PDF reports or Excel data

### Premium Features

- Executive dashboard with advanced KPIs
- Financial ratios and benchmarking
- Market trends and economic analysis
- Inventory tracking and batch management
- Advanced scenario analysis
- Professional PDF reports

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Component Structure**: Functional components with hooks

## 📊 Performance

- **Build Size**: ~700KB main bundle (gzipped: ~194KB)
- **Loading Time**: < 3s on 3G connection
- **Lighthouse Score**: 90+ Performance, Accessibility, Best Practices
- **Bundle Analysis**: Optimized chunk splitting for efficient loading

## 🔒 Security

- **Input Validation**: Comprehensive data validation with Zod
- **Error Boundaries**: Graceful error handling and recovery
- **Content Security Policy**: Secure headers configuration
- **No Sensitive Data**: All calculations performed client-side

## 🌐 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **PWA Support**: Service worker for offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@kostopro.com
- 💬 Documentation: [docs.kostopro.com](https://docs.kostopro.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🎉 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- UI components by [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide React](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)

---

**KostoPro Enhanced** - Professional seafood costing made simple and powerful.
