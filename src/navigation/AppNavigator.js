
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CatalogoScreen from '../screens/CatalogoScreen';
import DetalhesScreen from '../screens/DetalhesScreen';
import FavoritosScreen from '../screens/FavoritosScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Catalogo"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#121212',
          },
        }}
      >
        <Stack.Screen
          name="Catalogo"
          component={CatalogoScreen}
          options={{ title: 'Catálogo de Jogos' }}
        />

        <Stack.Screen
          name="Detalhes"
          component={DetalhesScreen}
          options={{ title: 'Detalhes do Jogo' }}
        />

        <Stack.Screen
          name="Favoritos"
          component={FavoritosScreen}
          options={{ title: 'Meus Favoritos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
