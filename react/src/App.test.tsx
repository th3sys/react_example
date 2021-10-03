import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders grid', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/State/i)).toBeInTheDocument();
  expect(getByText(/Price/i)).toBeInTheDocument();
  expect(getByText(/Demand/i)).toBeInTheDocument();
  expect(getByText(/Generation/i)).toBeInTheDocument();
});
