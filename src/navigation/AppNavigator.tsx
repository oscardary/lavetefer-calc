import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddMedicamentoScreen from '../screens/AddMedicamentoScreen';

export type RootStackParamList = {
    Home: undefined;
    AddMedicamento: undefined;
  };

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Inicio' component={HomeScreen} options={{ title: "Calcular Medicamentos" }}/>
            <Stack.Screen name='AddMedicamento' component={AddMedicamentoScreen} options={{ title: "Agregar Medicamentos" }}/>
        </Stack.Navigator>
    );
};