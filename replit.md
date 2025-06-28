# KostoPro - Seafood Costing & Pricing Application

## Overview

KostoPro is a comprehensive cost calculation and pricing application designed specifically for seafood processing businesses. The application provides tools for calculating production costs, analyzing profitability, managing batches, and generating detailed financial reports. It features a modern web interface built with React and TypeScript, backed by a Node.js/Express server with PostgreSQL database integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **State Management**: React Context API for global state (Auth, Language)
- **Data Fetching**: TanStack React Query for server state management
- **Routing**: React Router for client-side navigation
- **Charts**: Recharts for data visualization
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot module replacement with Vite integration

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Located in shared/schema.ts for type sharing between client/server

## Key Components

### Core Calculation Engine
- Multi-phase cost calculation including purchase, labor, transport, and processing costs
- Advanced profitability analysis with margin optimization
- Batch tracking and cost allocation across production phases
- Dynamic pricing recommendations based on market data

### User Interface Modules
- **Product Basics**: Core product information and pricing inputs
- **Processing Phases**: Multi-stage processing with waste and weight tracking
- **Cost Management**: Labor, packaging, and additional cost tracking
- **Transport Integration**: Google Maps integration for route calculation
- **Analysis & Reporting**: Advanced charts and financial modeling
- **Batch Management**: Production batch tracking and management

### Premium Features
- Advanced statistical models and AI-powered recommendations
- Scenario analysis and revenue forecasting
- Comprehensive export capabilities (PDF, Excel, CSV)
- Enhanced batch management with traceability
- Financial glossary and intelligent insights

### Authentication & User Management
- Context-based authentication system
- Premium subscription management
- Local storage for user preferences and company settings
- Role-based feature access

## Data Flow

1. **User Input**: Form data collected through tabbed interface
2. **Validation**: Client-side validation with Zod schemas
3. **Calculation**: Cost algorithms process input data
4. **Storage**: Results cached in React state and optionally persisted
5. **Visualization**: Charts and reports generated from calculated data
6. **Export**: Multiple export formats available for reports

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Router
- **UI Framework**: Radix UI primitives with shadcn/ui
- **Styling**: Tailwind CSS with PostCSS
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **State**: TanStack React Query for server state

### Database & Backend
- **Database**: Neon PostgreSQL serverless
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Authentication**: Custom implementation with session storage
- **File Processing**: Built-in support for CSV/Excel import

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across stack
- **Hot Reload**: Vite HMR with runtime error overlay
- **Code Quality**: ESLint and TypeScript strict mode

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- Express server with middleware integration
- PostgreSQL database (local or cloud)
- Environment variables for configuration

### Production Build
- Vite production build with optimization
- Express server with static file serving
- Bundled with esbuild for server code
- Environment-specific configuration

### Database Management
- Drizzle migrations for schema updates
- Connection pooling with Neon serverless
- Backup and restore capabilities
- Performance monitoring and optimization

## Changelog

- June 28, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.