# Analytics Integration Plan

## Overview
This document outlines the plan for integrating analytics tracking into the Haowise website to monitor user behavior, track conversions, and gather insights for continuous improvement.

## Chosen Analytics Platform
We will use Google Analytics 4 (GA4) as our primary analytics platform because:
- It's free and widely supported
- Provides detailed user behavior insights
- Integrates well with other Google services
- Offers cross-platform tracking capabilities
- Supports event-based tracking

## Implementation Approach

### 1. Google Analytics Setup
- Create GA4 property for Haowise website
- Configure data streams for web
- Set up conversion events
- Configure user properties and custom dimensions

### 2. Next.js Integration
We will use `react-ga4` library to integrate Google Analytics with our Next.js application.

#### Installation
```bash
npm install react-ga4
```

#### Initialization
```javascript
// lib/analytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (action, params) => {
  ReactGA.event(action, params);
};
```

#### Integration with Next.js Router
```javascript
// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initGA, logPageView } from '../lib/analytics';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    initGA();
    logPageView();
    
    const handleRouteChange = (url) => {
      logPageView();
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return <Component {...pageProps} />;
}
```

### 3. Event Tracking Plan

#### Page Views
- Track all page views automatically through router integration

#### Custom Events
1. **Contact Form Submission**
   - Event name: `contact_form_submit`
   - Parameters: `form_type` (contact), `language`

2. **CTA Button Clicks**
   - Event name: `cta_click`
   - Parameters: `button_text`, `page_location`, `language`

3. **Language Switch**
   - Event name: `language_switch`
   - Parameters: `from_language`, `to_language`

4. **Navigation Clicks**
   - Event name: `navigation_click`
   - Parameters: `menu_item`, `page_location`

### 4. Enhanced Measurement
Enable enhanced measurement features in GA4:
- Scrolling tracking
- Outbound click tracking
- Site search tracking
- Video engagement tracking

## Testing Plan

### 1. Unit Tests
Create tests for analytics functions:

```javascript
// lib/analytics.test.js
import { initGA, logPageView, logEvent } from './analytics';
import ReactGA from 'react-ga4';

jest.mock('react-ga4');

describe('Analytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initGA initializes ReactGA with correct ID', () => {
    process.env.NEXT_PUBLIC_GA_ID = 'G-XXXXXXXXXX';
    initGA();
    expect(ReactGA.initialize).toHaveBeenCalledWith('G-XXXXXXXXXX');
  });

  test('logPageView sends pageview hit', () => {
    logPageView();
    expect(ReactGA.send).toHaveBeenCalledWith({ hitType: 'pageview', page: window.location.pathname });
  });

  test('logEvent sends event with correct parameters', () => {
    const action = 'test_action';
    const params = { param1: 'value1' };
    logEvent(action, params);
    expect(ReactGA.event).toHaveBeenCalledWith(action, params);
  });
});
```

### 2. Integration Tests
Test that analytics events are fired correctly when users interact with the website:

```javascript
// pages/index.test.js
import { render, fireEvent } from '@testing-library/react';
import Home from './index';
import * as analytics from '../lib/analytics';

jest.mock('../lib/analytics');

describe('Home Page', () => {
  test('fires contact CTA click event', () => {
    const { getByText } = render(<Home />);
    const contactButton = getByText('立即咨询');
    fireEvent.click(contactButton);
    expect(analytics.logEvent).toHaveBeenCalledWith('cta_click', {
      button_text: '立即咨询',
      page_location: '/',
      language: 'zh'
    });
  });
});
```

### 3. End-to-End Tests
Use Cypress to test the full analytics integration:

```javascript
// cypress/integration/analytics.spec.js
describe('Analytics', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('sends pageview event on visit', () => {
    cy.window().then((win) => {
      expect(win.dataLayer).to.have.length.greaterThan(0);
      expect(win.dataLayer[0]).to.deep.include({
        event: 'page_view',
        page_location: 'http://localhost:3000/'
      });
    });
  });

  it('sends CTA click event', () => {
    cy.get('[data-testid="contact-cta"]').click();
    cy.window().then((win) => {
      const events = win.dataLayer.filter(item => item.event === 'cta_click');
      expect(events).to.have.length(1);
      expect(events[0]).to.deep.include({
        button_text: '立即咨询'
      });
    });
  });
});
```

## Privacy and Compliance

### GDPR Compliance
- Implement cookie consent banner
- Allow users to opt-out of analytics tracking
- Anonymize IP addresses
- Provide clear privacy policy

### Data Retention
- Configure appropriate data retention settings in GA4
- Regularly review and audit data collection practices

## Monitoring and Reporting

### Dashboards
Create custom dashboards in GA4 to monitor:
- User acquisition and behavior
- Conversion rates
- Content performance
- Technical performance

### Alerts
Set up alerts for:
- Significant traffic drops
- High error rates
- Performance degradation

## Rollout Plan

1. **Development Testing**
   - Implement analytics in development environment
   - Verify event tracking with GA4 DebugView

2. **Staging Testing**
   - Deploy to staging environment
   - Conduct end-to-end testing
   - Verify data collection accuracy

3. **Production Rollout**
   - Deploy to production with GA4 property
   - Monitor data flow and quality
   - Set up regular reporting

4. **Ongoing Maintenance**
   - Regular review of tracking implementation
   - Update tracking as website features evolve
   - Optimize based on insights gained