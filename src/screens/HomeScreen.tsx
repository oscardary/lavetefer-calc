import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
//import { RootStackParamList } from "../navigation/AppNavigator";

import { iMedicamento } from "../types/medicamento";
import { obtenerMedicamentosMarcados } from "../database/medicamento-service";

export default function HomeScreen() {
  const [medicamentos, setMedicamentos] = useState<iMedicamento[]>([]);
  const [peso, setPeso] = useState<number | null>(null);

  /*useEffect(() => {
    async function fetchData() {
      const data = await obtenerMedicamentosMarcados();
      setMedicamentos(data);
    }
    fetchData();
  }, []);*/

  useFocusEffect(
    useCallback(() => {
      obtenerMedicamentosMarcados()
        .then(data => {
          //console.log('Marcados:', data);
          setMedicamentos(data);
        })
        .catch(console.error);
    }, [])
  );
  

  const convertirPosologiaAMgPorKg = (
    valor: number,
    unidad: string
  ): number => {
    switch (unidad) {
      case "mg/kg":
        return valor;
      case "mcg/kg":
        return valor / 1000;
      case "g/kg":
        return valor * 1000;
      default:
        throw new Error(`Unidad de posología no soportada: ${unidad}`);
    }
  };

  const convertirConcentracionAMgPorMl = (
    valor: number,
    unidad: string
  ): number => {
    switch (unidad) {
      case "mg/ml":
        return valor;
      case "mcg/ml":
        return valor / 1000;
      case "g/ml":
        return valor * 1000;
      default:
        throw new Error(`Unidad de concentración no soportada: ${unidad}`);
    }
  };

  const calcularDosis = (medicamento: iMedicamento): string => {
    if (peso === null || isNaN(peso)) return "?";

    try {
      const posologiaMg = convertirPosologiaAMgPorKg(
        medicamento.posologiaValor,
        medicamento.posologiaUnidad
      );
      const concentracionMgMl = convertirConcentracionAMgPorMl(
        medicamento.concentracionValor,
        medicamento.concentracionUnidad
      );

      const cantidadMg = peso * posologiaMg;
      const volumenML = cantidadMg / concentracionMgMl;

      return `${volumenML.toFixed(2)} ml`;
    } catch (error: any) {
      console.error("❌ Error en cálculo:", error.message);
      return "Error";
    }
  };

  //Navegación entre pantallas
  //type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
  //const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={style.safeArea}>
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
            <View
              style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {item.nombre}
              </Text>
              <Text style={{ fontSize: 14 }}>
                Posología: {item.posologiaValor} {item.posologiaUnidad}
                {"\n"}
                Concentración: {item.concentracionValor}{" "}
                {item.concentracionUnidad}
                {"\n"}
                Dosis para {peso ?? "?"} kg: {calcularDosis(item)}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
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
