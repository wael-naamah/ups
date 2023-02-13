/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {TailwindProvider} from 'tailwind-rn';
import CustomersScreen from './src/screens/CustomersScreen';
import utilities from './tailwind.json';

function App(): JSX.Element {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <CustomersScreen />
    </TailwindProvider>
  );
}

export default App;
