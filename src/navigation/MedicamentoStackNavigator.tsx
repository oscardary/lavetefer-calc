import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaMedicamentosScreen from '../screens/ListaMedicamentosScreen';
import MedicamentoFormScreen from '../screens/MedicamentoFormScreen';

export type MedicamentoStackParamList = {
  ListaMedicamentos: undefined;
  MedicamentoFormScreen: undefined;
};

const Stack = createNativeStackNavigator<MedicamentoStackParamList>();

export default function MedicamentoStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaMedicamentos"
        component={ListaMedicamentosScreen}
        options={{ title: 'Medicamentos' }}
      />
      <Stack.Screen
        name="MedicamentoFormScreen"
        component={MedicamentoFormScreen}
        options={{ title: 'Nuevo medicamento' }}
      />
    </Stack.Navigator>
  );
}