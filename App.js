import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaImoveis from './src/componentes/ListaImoveis';
import Detalhe from './src/Pages/Detalhe'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Imoveis" component={ListaImoveis} />
        <Stack.Screen name="Detalhe" component={Detalhe}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;