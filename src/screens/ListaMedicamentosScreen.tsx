import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { iMedicamento, iMedicamentoId } from "../types/medicamento";
import {
  obtenerMedicamentos,
  actualizarMarcadoMedicamento,
} from "../database/medicamento-service";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MedicamentoStackParamList } from "../navigation/MedicamentoStackNavigator";

type NavigationProp = NativeStackNavigationProp<
  MedicamentoStackParamList,
  "ListaMedicamentos"
>;

export default function ListaMedicamentosScreen() {
  const [medicamentos, setMedicamentos] = useState<iMedicamentoId[]>([]);
  
  const navigation = useNavigation<NavigationProp>();

  const cargarMedicamentos = async () => {
    obtenerMedicamentos().then(setMedicamentos).catch(console.error);
  };

  const editarMedicamento = (item: iMedicamento) => {
    // Puedes abrir un modal, navegar o llenar un formulario con el medicamento
    console.log("Editar medicamento:", item);
  };

  useEffect(() => {
    //obtenerMedicamentos().then(setMedicamentos).catch(console.error);
    cargarMedicamentos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Aquí vuelves a cargar los medicamentos desde la DB
      cargarMedicamentos();

      // Opcional: cleanup si lo necesitas
      return () => {};
    }, [])
  );

  const actualizarMedicamento = async (id: number, estadoActual: boolean) => {
    const nuevoEstado = !estadoActual;
    try {
      await actualizarMarcadoMedicamento(id, nuevoEstado);
      // Refrescar la lista o actualizar el estado local
      cargarMedicamentos(); // o actualiza solo ese ítem
    } catch (error) {
      console.error("Error al actualizar medicamento:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingBottom: 80, // para dejar espacio al botón flotante
          backgroundColor: "#fff",
        }}
      >
        <SwipeListView
          data={medicamentos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 16 }}
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

              <TouchableOpacity
                onPress={() =>
                  actualizarMedicamento(Number(item.id), item.activo)
                }
              >
                <FontAwesome
                  name="heart"
                  size={30}
                  color={Boolean(item.activo) === true ? "#4CAF50" : "#CCC"} // verde si está activo, gris si no
                />
              </TouchableOpacity>
            </View>
          )}
          renderHiddenItem={({ item }, rowMap) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: 20,
                backgroundColor: "#2196F3",
                borderRadius: 8,
                marginVertical: 4,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  const thisRow = rowMap[item.id];
                  if (thisRow) {
                    thisRow.closeRow(); // ✅ Cierra solo esta fila
                  }
                  navigation.navigate("MedicamentoFormScreen", {
                    medicamento: item,
                  });
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Editar
                </Text>
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-75}
        />

        {/* FAB flotante para agregar nuevo medicamento */}
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            backgroundColor: "#4CAF50",
            padding: 15,
            borderRadius: 30,
            elevation: 5,
          }}
          onPress={() => navigation.navigate("MedicamentoFormScreen")}
        >
          <Text style={{ color: "#fff", fontSize: 30 }}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  even: {
    backgroundColor: "#f9f9f9",
  },
  odd: {
    backgroundColor: "#ffffff",
  },
  nombre: {
    flex: 2,
    fontSize: 16,
    fontWeight: "500",
  },
  dosis: {
    flex: 1,
    fontSize: 15,
    textAlign: "right",
    color: "#444",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 18,
  },
});
