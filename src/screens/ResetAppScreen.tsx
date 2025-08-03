import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { resetearMedicamentos } from "../database/resetearMedicamentos"; // ajusta la ruta según tu estructura

export default function ResetAppScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    Alert.alert(
      "¿Reiniciar la app?",
      "Se borrarán todos los medicamentos y se restaurarán los datos predeterminados.",
      [
        {
          text: "Cancelar",
          onPress: () => navigation.goBack(), // volver a la pestaña anterior
          style: "cancel",
        },
        {
          text: "Sí, reiniciar",
          style: "destructive",
          onPress: async () => {
            //await resetearMedicamentos();
            //navigation.goBack(); // volver tras reiniciar
            //navigation.navigate("Milista"); // por ejemplo
          },
        },
      ],
      { cancelable: false }
    );
  }, []);

  return null; // no renderiza nada visible
}