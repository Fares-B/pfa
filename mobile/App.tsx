/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import Layout from './src/layout';
import Store from './src/store';

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <Layout />
    </Provider>
  );
};

export default App;
