import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";

import { iMedicamento } from "../types/medicamento";
import { obtenerMedicamentos } from "../database/medicamento-service";

export default function ListaMedicamentosScreen() {
  const [medicamentos, setMedicamentos] = useState<iMedicamento[]>([]);

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={medicamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={[styles.nombre, styles.headerText]}>Nombre</Text>
              <Text style={[styles.dosis, styles.headerText]}>Dosis</Text>
            </View>
          }
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
  item: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  even: {
    backgroundColor: "#f5f5f5",
  },
  odd: {
    backgroundColor: "#ffffff",
  },
  nombre: {
    flex: 1,
    fontSize: 16,
  },
  dosis: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 6,
    marginBottom: 8,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
