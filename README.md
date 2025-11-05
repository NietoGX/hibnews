# Hibnews

A modern, responsive news application built with Next.js 13, TypeScript, and Tailwind CSS.

## 📖 Overview

Hibnews is a fully-featured news application that demonstrates best practices in modern web development. Built with the latest Next.js App Router, TypeScript for type safety, and a clean feature-based architecture, this project serves as an excellent foundation for content-rich applications.

## ✨ Features

### 🏗️ Core Architecture
- **Next.js 13 App Router** - Modern routing with React Server Components
- **TypeScript** - Full type safety across the entire application
- **Feature-Based Architecture** - Clean, scalable code organization
- **shadcn/ui Components** - Consistent, accessible UI components
- **Tailwind CSS** - Utility-first styling with custom design tokens

### 📰 News Management
- **Dynamic News Articles** - Full CRUD operations for news content
- **Article Categories** - Three predefined categories: Technology, Health, Entertainment
- **Featured Articles** - Enhanced styling for important news
- **Individual Article Pages** - Dynamic routing with `/news/[id]`
- **Rich Media Support** - Next.js Image optimization with Unsplash integration
- **Responsive Design** - Mobile-first approach with adaptive layouts

### 🔧 Technical Features
- **RESTful API** - Clean API endpoints for news data
- **Service Layer** - Separated business logic with services and actions
- **Data Validation** - Zod schema validation for type safety
- **Error Handling** - Comprehensive error management
- **Custom HTTP Client** - Robust API communication with retry logic
- **Static Generation** - Next.js SSG with revalidation support

### 🧪 Testing & Quality
- **Comprehensive Test Suite** - Unit, integration, and component tests
- **Jest & Testing Library** - Modern testing framework
- **Test Coverage** - Automated coverage reporting
- **Mock Implementation** - Proper mocking for API calls
- **Error Scenario Testing** - Edge cases and failure modes
- **Watch Mode** - Development-friendly test workflow

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navigation
│   ├── (home)/           # Route group for home pages
│   │   ├── page.tsx       # Home page with latest news
│   │   └── news/
│   │       ├── [id]/      # Dynamic article pages
│   │       └── not-found.tsx
│   ├── api/news/         # API routes
│   │   ├── latest/route.ts
│   │   └── [id]/route.ts
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx     # Button component
│   │   └── navbar.tsx     # Navigation component
│   └── layouts/
│       └── content-layout.tsx  # Content wrapper
├── features/
│   └── news/
│       ├── types.ts       # News article interfaces and enums
│       ├── components/
│       │   └── news.tsx   # Main news component
│       ├── services/
│       │   └── news-service.ts  # API service layer
│       ├── actions/
│       │   ├── get-latest-news.ts
│       │   ├── get-news-by-id.ts
│       │   └── get-all-news-ids.ts
│       └── __tests__/    # Comprehensive test suite
└── lib/
    ├── utils.ts           # Utility functions (cn helper)
    ├── http-client.ts     # HTTP client for API calls
    └── news-data.ts       # Local news database
```

## 🛠️ Technology Stack

### Core Dependencies
- **Next.js 13.5.11** - React framework with App Router
- **React 18** - UI library with modern features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 3** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI

### Development & Testing
- **Jest** - Testing framework
- **Testing Library** - React component testing
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing with Autoprefixer

### Validation & Data
- **Zod** - Schema validation
- **Lucide React** - Icon library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hibnews
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 📊 API Endpoints

### Get Latest News
```
GET /api/news/latest
```
Returns the latest news articles with metadata.

### Get Article by ID
```
GET /api/news/[id]
```
Returns a specific news article by its ID.

## 🧪 Testing

The project includes a comprehensive test suite covering:

- **Unit Tests** - Services and actions
- **Component Tests** - React components with mocked dependencies
- **Integration Tests** - API endpoints and data flow
- **Error Handling** - Edge cases and failure scenarios

Run tests with:
```bash
npm run test
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🎯 Current Status

✅ **Fully Functional** - Complete news application with all core features
✅ **Test Coverage** - Comprehensive test suite with high coverage
✅ **Type Safety** - Full TypeScript implementation
✅ **Responsive Design** - Mobile-friendly interface
✅ **Modern Architecture** - Clean, scalable codebase
✅ **Performance Optimized** - Next.js optimizations implemented


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Unsplash](https://unsplash.com/) - High-quality images
