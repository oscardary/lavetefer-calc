import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import { iMedicamento } from "../types/medicamento";
import { obtenerMedicamentos } from "../database/medicamento-service";
import { resetearMedicamentos } from "../database/resetearMedicamentos";

const medicamentoDemo: iMedicamento[] = [
  { id: "1", nombre: "Medicamento 1", dosisPorKg: 5, unidad: "mg" },
  { id: "2", nombre: "Medicamento 2", dosisPorKg: 0.03, unidad: "ml" },
];

export default function HomeScreen() {
  const [medicamentos, setMedicamentos] = useState<iMedicamento[]>([]);
  const [peso, setPeso] = useState<number | null>(null);
  
  //useEffect(()=>{ //Solo se carga la primera vez
  useFocusEffect(
    useCallback(()=>{ 
      obtenerMedicamentos().then(setMedicamentos).catch(console.error)
  },[]));

  const calcularDosis = (medicamento: iMedicamento): string => {
    if (peso === null) return "?";
    const dosis = peso * medicamento.dosisPorKg;
    return `${dosis.toFixed(2)} ${medicamento.unidad}`;
  };

  //Navegación entre pantallas
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={style.container}>
      <Text style={style.title}>Calculadora de medicamentos</Text>

      <TextInput
        placeholder="Peso del animal (kg)"
        keyboardType="numeric"
        style={style.input}
        onChangeText={(value) => setPeso(value ? parseFloat(value) : 0)}
        />
      <FlatList
        data={medicamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={style.medicamento}>
            {item.nombre} {item.dosisPorKg} {item.unidad}: {calcularDosis(item)}
          </Text>
        )}
      />

      <Button
        title="Ver medicamentos en consola"
        onPress={async () => {
          try {
            const meds = await obtenerMedicamentos();
            console.log("📦 Medicamentos en BD:", meds.length);
          } catch (error) {
            console.error("❌ Error al obtener medicamentos:", error);
          }
        }}
      />

      <Button title="Resetear medicamentos" onPress={resetearMedicamentos} />

      <Button title="Agregar Medicamento" onPress={() => navigation.navigate('AddMedicamento')} />

    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    padding: 10
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
  },
  medicamento: {
    fontSize: 20,
    padding: 10,
  },
});
