import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: any) {
    const React = require('react');
    return React.createElement('img', { ...props, alt: props.alt || '' });
  },
}));

// Mock next/legacy/image
jest.mock('next/legacy/image', () => ({
  __esModule: true,
  default: function MockLegacyImage(props: any) {
    const React = require('react');
    return React.createElement('img', { ...props, alt: props.alt || '' });
  },
}));

// Mock framer-motion to bypass animation delays in tests
jest.mock('framer-motion', () => {
  const React = require('react');
  const Dummy = (type: string) => {
    return React.forwardRef(({ children, ...props }: any, ref: any) => {
      // Filter out framer-motion specific props to prevent DOM warnings
      const cleanedProps = { ...props };
      delete cleanedProps.animate;
      delete cleanedProps.initial;
      delete cleanedProps.whileHover;
      delete cleanedProps.whileTap;
      delete cleanedProps.whileInView;
      delete cleanedProps.viewport;
      delete cleanedProps.transition;
      delete cleanedProps.exit;
      delete cleanedProps.variants;
      
      return React.createElement(type, { ...cleanedProps, ref }, children);
    });
  };

  return {
    motion: {
      div: Dummy('div'),
      section: Dummy('section'),
      h1: Dummy('h1'),
      p: Dummy('p'),
      span: Dummy('span'),
      button: Dummy('button'),
      article: Dummy('article'),
    },
    AnimatePresence: ({ children }: any) => children,
  };
});


// Mock Nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'mock-id' }),
  }),
}));

// Automatic Proxy mocks for icon libraries to bypass ESM compilation issues
jest.mock('lucide-react', () => {
  const React = require('react');
  return new Proxy({ __esModule: true }, {
    get: (target, prop) => {
      if (prop === '__esModule') return true;
      return (props: any) => React.createElement('svg', { ...props, 'data-testid': `lucide-${String(prop).toLowerCase()}` });
    }
  });
});

jest.mock('react-icons/fa', () => {
  const React = require('react');
  return new Proxy({ __esModule: true }, {
    get: (target, prop) => {
      if (prop === '__esModule') return true;
      return (props: any) => React.createElement('svg', { ...props, 'data-testid': `fa-${String(prop).toLowerCase()}` });
    }
  });
});

jest.mock('react-icons/fa6', () => {
  const React = require('react');
  return new Proxy({ __esModule: true }, {
    get: (target, prop) => {
      if (prop === '__esModule') return true;
      return (props: any) => React.createElement('svg', { ...props, 'data-testid': `fa6-${String(prop).toLowerCase()}` });
    }
  });
});

jest.mock('react-icons/si', () => {
  const React = require('react');
  return new Proxy({ __esModule: true }, {
    get: (target, prop) => {
      if (prop === '__esModule') return true;
      return (props: any) => React.createElement('svg', { ...props, 'data-testid': `si-${String(prop).toLowerCase()}` });
    }
  });
});

jest.mock('react-icons/md', () => {
  const React = require('react');
  return new Proxy({ __esModule: true }, {
    get: (target, prop) => {
      if (prop === '__esModule') return true;
      return (props: any) => React.createElement('svg', { ...props, 'data-testid': `md-${String(prop).toLowerCase()}` });
    }
  });
});

jest.mock('sonner', () => ({
  toast: {
    promise: jest.fn().mockImplementation(async (promise, options) => {
      try {
        const res = await promise;
        if (options.success) {
          const successRes = options.success(res);
          return successRes instanceof Promise ? await successRes : successRes;
        }
        return res;
      } catch (err) {
        if (options.error && typeof options.error === 'function') {
          options.error(err);
        }
        throw err;
      }
    }),
    success: jest.fn(),
    error: jest.fn(),
  }
}));
