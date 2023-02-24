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
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigator/RootNavigator';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://chiquilistlan.stepzen.net/api/intended-dolphin/__graphql',
  headers: {
    Authorization:
      'apikey chiquilistlan::stepzen.io+1000::54ce63bdbadd3976075cb94476cd146d49ae32db99c01952a085a4868955700c',
  },
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </TailwindProvider>
  );
}

export default App;