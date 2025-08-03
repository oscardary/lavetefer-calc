import React, { useEffect, useState } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { resetearMedicamentos } from "./src/database/resetearMedicamentos";
import { getMedicamentosRepository } from "./src/data/repositories/medicamentos/MedicamentosFactory";

export default function App() {
  const [dbLista, setDbLista] = useState(false);

  useEffect(() => {
    async function inicializarBaseDeDatos() {
      const repo = getMedicamentosRepository(); // Usa el repositorio correcto
      await repo.inicializarTablaMedicamentos(); // Crea la tabla

      const existentes = await repo.obtenerTodos();
      if (existentes.length === 0) {
        await resetearMedicamentos(repo);
        console.log("✅ Medicamentos por defecto insertados");
        console.log("❌ REVISAR Medicamentos por defecto");
      } else {
        console.log("ℹ️ Ya existen medicamentos");
      }
      setDbLista(true);
    }

    inicializarBaseDeDatos().catch((error) => {
      console.error("❌ Error al iniciar BD", error);
    });
  }, []);

  if (!dbLista) {
    // Muestra un loading mientras se prepara la base de datos
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <GestureHandlerRootView style={style.container}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
