# Testing Framework Implementation

## Overview
This document describes the testing framework implementation for the Haowise website to ensure code quality, functionality correctness, and maintainability.

## Testing Strategy

### 1. Unit Testing
Test individual components and functions in isolation.

#### Tools
- Jest: JavaScript testing framework
- React Testing Library: For testing React components
- ts-jest: TypeScript support for Jest

#### Installation
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom ts-jest @types/jest
```

#### Configuration
Create `jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
```

Create `jest.setup.js`:
```javascript
import '@testing-library/jest-dom';
```

### 2. Integration Testing
Test interactions between components and services.

#### Approach
- Test API integrations
- Test context providers
- Test complex component interactions

### 3. End-to-End Testing
Test user flows and real-world scenarios.

#### Tools
- Cypress: End-to-end testing framework

#### Installation
```bash
npm install --save-dev cypress
```

#### Configuration
Create `cypress.json`:
```json
{
  "baseUrl": "http://localhost:3000",
  "viewportWidth": 1280,
  "viewportHeight": 720
}
```

## Test Structure

### Unit Tests
```
src/
  components/
    Header/
      Header.test.tsx
      index.tsx
    Footer/
      Footer.test.tsx
      index.tsx
  pages/
    index.test.tsx
    index.tsx
```

### Integration Tests
```
src/
  __tests__/
    integration/
      navigation.test.tsx
      language-switch.test.tsx
```

### End-to-End Tests
```
cypress/
  integration/
    home-page.spec.js
    navigation.spec.js
    contact-form.spec.js
  fixtures/
    example.json
  support/
    commands.js
    index.js
```

## Sample Test Implementations

### 1. Header Component Unit Test
```typescript
// src/components/Header/Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('renders logo with correct text', () => {
    render(<Header />);
    const logoElement = screen.getByText(/Haowise/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Header />);
    const homeLink = screen.getByText(/首页/i);
    const solutionsLink = screen.getByText(/解决方案/i);
    const productsLink = screen.getByText(/产品/i);
    const aboutLink = screen.getByText(/关于我们/i);
    const contactLink = screen.getByText(/联系我们/i);
    
    expect(homeLink).toBeInTheDocument();
    expect(solutionsLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  test('renders language toggle button', () => {
    render(<Header />);
    const languageToggle = screen.getByRole('button', { name: /切换到中文/i });
    expect(languageToggle).toBeInTheDocument();
  });
});
```

### 2. Contact Form Integration Test
```typescript
// src/__tests__/integration/contact-form.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ContactPage from '../../pages/contact';

describe('Contact Form', () => {
  test('validates required fields', () => {
    render(<ContactPage />);
    
    const submitButton = screen.getByRole('button', { name: /发送消息/i });
    fireEvent.click(submitButton);
    
    const nameError = screen.getByText(/请输入您的姓名/i);
    const emailError = screen.getByText(/请输入您的邮箱/i);
    const messageError = screen.getByText(/请输入您的消息/i);
    
    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(messageError).toBeInTheDocument();
  });

  test('validates email format', () => {
    render(<ContactPage />);
    
    const emailInput = screen.getByLabelText(/邮箱/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /发送消息/i });
    fireEvent.click(submitButton);
    
    const emailError = screen.getByText(/请输入有效的邮箱地址/i);
    expect(emailError).toBeInTheDocument();
  });
});
```

### 3. Home Page E2E Test
```javascript
// cypress/integration/home-page.spec.js
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays hero section with correct content', () => {
    cy.get('h1').should('contain.text', '激发智能未来，赋能企业增长');
    cy.get('[data-testid="hero-cta-primary"]').should('contain.text', '立即咨询');
    cy.get('[data-testid="hero-cta-secondary"]').should('contain.text', '查看方案');
  });

  it('displays key points section', () => {
    cy.get('[data-testid="key-points-section"]').should('be.visible');
    cy.get('[data-testid="key-point"]').should('have.length', 6);
  });

  it('navigates to contact page when clicking primary CTA', () => {
    cy.get('[data-testid="hero-cta-primary"]').click();
    cy.url().should('include', '/contact');
  });

  it('navigates to solutions page when clicking secondary CTA', () => {
    cy.get('[data-testid="hero-cta-secondary"]').click();
    cy.url().should('include', '/solutions');
  });
});
```

### 4. Language Switching E2E Test
```javascript
// cypress/integration/language-switch.spec.js
describe('Language Switching', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('switches from Chinese to English', () => {
    // Verify Chinese content
    cy.get('h1').should('contain.text', '激发智能未来，赋能企业增长');
    
    // Switch to English
    cy.get('[data-testid="language-toggle"]').click();
    
    // Verify English content
    cy.get('h1').should('contain.text', 'Inspire Intelligent Future, Empower Business Growth');
  });

  it('maintains language preference across navigation', () => {
    // Switch to English
    cy.get('[data-testid="language-toggle"]').click();
    
    // Navigate to solutions page
    cy.get('[data-testid="nav-solutions"]').click();
    
    // Verify English content on solutions page
    cy.get('h1').should('contain.text', 'Integrating AI and Automation to Build Enterprise Intelligence Engines');
  });
});
```

## Test Execution Scripts

Add the following scripts to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test:e2e": "start-server-and-test dev http://localhost:3000 cy:run"
  }
}
```

## Continuous Integration

### GitHub Actions Workflow
Create `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run unit tests
        run: npm test
      - name: Run E2E tests
        run: npm run test:e2e
```

## Code Coverage

### Configuration
Configure Jest to collect coverage:

```javascript
// jest.config.js
module.exports = {
  // ... other config
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Reporting
- Generate HTML coverage reports
- Integrate with code quality tools
- Set up coverage thresholds

## Performance Testing

### Tools
- Lighthouse CI for performance audits
- WebPageTest for detailed performance analysis

### Metrics to Monitor
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

## Accessibility Testing

### Tools
- axe-core for automated accessibility testing
- pa11y for command-line accessibility testing

### Integration
```javascript
// jest.setup.js
import { configureAxe } from 'jest-axe';

const axe = configureAxe({
  rules: {
    // Customize rules as needed
  },
});

expect.extend({
  toBeAccessible: async (component) => {
    const results = await axe(component);
    return {
      pass: results.violations.length === 0,
      message: () => 
        results.violations.length > 0 
          ? `Accessibility violations found: ${JSON.stringify(results.violations, null, 2)}`
          : 'No accessibility violations found',
    };
  },
});
```

## Test Maintenance

### Best Practices
1. Keep tests close to the code they test
2. Use descriptive test names
3. Mock external dependencies
4. Test behavior, not implementation
5. Maintain test data separately
6. Regularly review and update tests

### Test Data Management
- Use factories for complex test data
- Maintain separate test environments
- Clean up test data after tests

## Monitoring and Reporting

### Test Results Dashboard
- Integrate with CI/CD pipeline
- Display test results and coverage
- Set up alerts for test failures

### Performance Monitoring
- Track test execution times
- Monitor flaky tests
- Optimize slow tests

This testing framework ensures the Haowise website maintains high quality and reliability throughout its development lifecycle.