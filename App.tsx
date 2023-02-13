/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigator/RootNavigator';

function App(): JSX.Element {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TailwindProvider>
  );
}

export default App;
