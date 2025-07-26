import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { iMedicamento } from "../types/medicamento";
import { obtenerMedicamentos } from "../database/medicamento-service";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MedicamentoStackParamList } from "../navigation/MedicamentoStackNavigator";

type NavigationProp = NativeStackNavigationProp<
  MedicamentoStackParamList,
  "ListaMedicamentos"
>;

export default function ListaMedicamentosScreen() {
  const [medicamentos, setMedicamentos] = useState<iMedicamento[]>([]);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    obtenerMedicamentos().then(setMedicamentos).catch(console.error);
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: iMedicamento;
    index: number;
  }) => (
    <View style={[styles.item, index % 2 === 0 ? styles.even : styles.odd]}>
      <Text style={styles.nombre}>
        {item.nombre} ({item.activo})
      </Text>
      <Text style={styles.dosis}>
        {item.posologiaValor} {item.posologiaUnidad}
      </Text>
    </View>
  );

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
        <FlatList
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

              <FontAwesome
                name="heart"
                size={20}
                color={Boolean(item.activo) === true ? "#4CAF50" : "#ccc"} // verde si está activo, gris si no
              />
            </View>
          )}
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
          <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
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
