import type { Preview } from '@storybook/nextjs';
import type { ReactRenderer } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import '../src/app/global.css';

// Import English messages for Storybook
import messages from '../messages/en.json';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: '#ffffff',
        },

        dark: {
          name: 'dark',
          value: '#1a1a1a',
        }
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  },

  decorators: [
    (Story) => React.createElement(
      NextIntlClientProvider,
      { locale: 'en', messages },
      React.createElement(Story, null)
    ),
  ],
};

export default preview;
