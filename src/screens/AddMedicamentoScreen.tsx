import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { insertarMedicamento } from "../database/medicamento-service";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

export default function AddMedicamentoScreen() {
  const [nombre, setNombre] = useState("");
  const [dosisKg, setDosisKg] = useState("");
  const [unidad, setUnidad] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const guardarMedicamento = async () => {
    if (!nombre || !dosisKg || !unidad) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    
    try {
      await insertarMedicamento({
        id: '',
        nombre,
        dosisPorKg: parseFloat(dosisKg),
        unidad,
      });
      
      Alert.alert("Éxito", "Medicamento guardado");
      
      // Limpia el formulario
      setNombre("");
      setDosisKg("");
      setUnidad("");
      
      // Navega de vuelta a la pantalla anterior (opcional)
      navigation.goBack();

    } catch (error) {
      console.error("Error al guardar medicamento", error);
      Alert.alert("Error", "No se pudo guardar el medicamento");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Agregar Medicamento
      </Text>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Dosis por Kg"
        value={dosisKg}
        onChangeText={setDosisKg}
        keyboardType="decimal-pad"
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Unidad (mg, ml, etc)"
        value={unidad}
        onChangeText={setUnidad}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
      />

      <Button title="Guardar Medicamento" onPress={guardarMedicamento} />
    </View>
  );
}
