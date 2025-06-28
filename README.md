# KostoPro - Professional Seafood Costing Application

A production-ready Vite + React + TypeScript application for professional seafood costing and analysis, featuring Builder.io integration, responsive design, and comprehensive cost management tools.

## 🚀 Features

### Core Functionality

- **Advanced Cost Calculation**: Precise cost calculations with seasonal factors and quality parameters
- **Batch Management**: Comprehensive system for tracking and managing product batches
- **Real-time Analysis**: Interactive charts and analytics for cost breakdown and profitability trends
- **Multi-language Support**: Full Greek (ΕΛ) and English (EN) localization
- **Multi-currency Support**: EUR and USD with proper formatting
- **Dark/Light Theme**: Complete theme switching with system preference detection

### Responsive Design

- **Mobile-First**: Optimized for all screen sizes with responsive grid layouts
- **Interactive Components**: Touch-friendly interface with smooth animations
- **Accessibility**: WCAG compliant with proper ARIA labels and semantic HTML

### Builder.io Integration

- **Demo Components**: Interactive pricing calculator and batch comparison tools
- **Mock API Integration**: Realistic data simulation for testing and demonstration
- **Production-Ready**: Clean, modular code following best practices

## 🏗️ Architecture

### Frontend Stack

- **Vite**: Fast build tool with HMR and optimized production builds
- **React 18**: Latest React features with Concurrent Mode
- **TypeScript**: Full type safety and IntelliSense support
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Radix UI**: Accessible, unstyled UI components
- **Recharts**: Responsive charting library for data visualization

### Backend Stack

- **Express.js**: RESTful API with session management
- **Drizzle ORM**: Type-safe database operations
- **PostgreSQL**: Production database with connection pooling
- **WebSocket**: Real-time updates and notifications

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components
│   │   │   ├── charts/          # Chart components
│   │   │   ├── demo/            # Builder.io demo components
│   │   │   └── ...              # Feature components
│   │   ├── contexts/            # React contexts
│   │   ├── hooks/               # Custom React hooks
│   │   ├── mock/                # Mock data and APIs
│   │   ├── pages/               # Page components
│   │   └── utils/               # Utility functions
│   └── package.json
├── server/                      # Express.js backend
├── shared/                      # Shared types and schemas
└── package.json                 # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- PostgreSQL database (for production)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kostopro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure the following variables:

   ```env
   DATABASE_URL="postgresql://..."
   SESSION_SECRET="your-session-secret"
   NODE_ENV="development"
   ```

4. **Initialize the database**

   ```bash
   npm run db:push
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🌐 Deployment

### Vercel Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel deploy --prod
   ```

### Environment Variables for Production

Set the following environment variables in your Vercel dashboard:

- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secure random string for session encryption
- `NODE_ENV`: Set to "production"

### Build Configuration

The application is configured for static deployment with:

- Optimized asset bundling
- Code splitting for better performance
- Static file caching headers
- SPA routing support

## 📱 Routes

### Main Application

- `/` - Enhanced homepage with responsive KPI cards
- `/original` - Original application interface
- `/login` - User authentication
- `/signup` - User registration
- `/profile` - User profile management

### Builder.io Demos

- `/builder-examples` - Interactive demo components
- `/demo` - Alternative demo route
- `/ui-test` - UI testing route

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (#3b82f6 to #4f46e5)
- **Secondary**: Green for success (#10b981)
- **Accent**: Purple for highlights (#8b5cf6)
- **Error**: Red for errors (#ef4444)

### Typography

- **Headings**: Inter font family, semibold weights
- **Body**: System font stack for optimal loading
- **Monospace**: For code and data display

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Mock Data

The application includes comprehensive mock data for testing:

### Product Data (`mock/product.ts`)

- Sample seafood products with categories
- Pricing, quality grades, and sustainability scores
- Seasonal factors and supplier information

### Batch Data (`mock/batch.ts`)

- Processing batches with profit calculations
- Status tracking and quality metrics
- Historical performance data

### Analysis Data (`mock/analysis.ts`)

- Cost breakdown by category
- Profitability trends over time
- Seasonal analysis and market factors

## 🔧 Development

### Code Quality

- **ESLint**: Configured for React and TypeScript
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict mode enabled
- **Husky**: Pre-commit hooks for quality checks

### Testing

- **Unit Tests**: Jest with React Testing Library
- **E2E Tests**: Playwright for integration testing
- **Component Tests**: Storybook for component development

### Performance

- **Bundle Analysis**: Webpack Bundle Analyzer
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Aggressive caching for static assets

## 📚 API Documentation

### Cost Calculation Endpoints

```typescript
POST / api / calculate;
GET / api / batches;
GET / api / products;
GET / api / analysis;
```

### Authentication Endpoints

```typescript
POST / api / auth / login;
POST / api / auth / signup;
POST / api / auth / logout;
GET / api / auth / profile;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, email support@kostopro.com or open an issue on GitHub.

---

**Built with ❤️ using modern web technologies and best practices**
