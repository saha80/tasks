import { defineConfig } from 'cypress';
import registerCodeCoverageTasks from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: './cypress/**/*.cy.{ts,tsx}',
    setupNodeEvents: (on, config) => {
      registerCodeCoverageTasks(on, config);
      return config;
    },
  },
  component: {
    specPattern: './cypress/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  env: {
    codeCoverage: {
      url: 'http://localhost:5173/',
      exclude: 'cypress/**/*.*',
    },
  },
  video: false,
});
