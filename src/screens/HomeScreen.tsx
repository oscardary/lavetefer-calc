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
        .then((data) => {
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
          Calculadora de medicamentos
        </Text>

        <TextInput
          placeholder="Peso del animal (kg)"
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginBottom: 16,
            borderRadius: 8,
          }}
          onChangeText={(value) => setPeso(value ? parseFloat(value) : 0)}
        />

        <FlatList
          data={medicamentos}
          keyExtractor={(item) => item.id.toString()}
          
          renderItem={({ item, index }) => (
            <View
              style={[styles.item, index % 2 === 0 ? styles.even : styles.odd]}
            >
              <Text style={styles.nombre}>
                {item.nombre}
                {"\n"}
                <Text style={{ fontSize: 12, color: "#666" }}>
                  {item.posologiaValor} {item.posologiaUnidad} ·{" "}
                  {item.concentracionValor} {item.concentracionUnidad}
                </Text>
              </Text>
              <Text style={styles.dosis}>
                {"Dosis"}
                {"\n"}
                {calcularDosis(item)}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#f0f0f0',
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 8,
    },
    even: {
      backgroundColor: '#f9f9f9',
    },
    odd: {
      backgroundColor: '#ffffff',
    },
    nombre: {
      flex: 2,
      fontSize: 16,
      fontWeight: '500',
    },
    dosis: {
      flex: 1,
      fontSize: 15,
      textAlign: 'center',
      color: '#444',
    },
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 30,
      elevation: 5,
    },
    fabText: {
      color: '#fff',
      fontSize: 18,
    },  
});
