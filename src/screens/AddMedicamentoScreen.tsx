import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { insertarMedicamento } from "../database/medicamento-service";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Picker } from "@react-native-picker/picker";
import {
  List,
  Dialog,
  Portal,
  Button,
  TextInput as TextInputPaper,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons"; // o Ionicons

import { UNIDADES_CONCENTRACION, UNIDADES_POSOLOGIA } from "../constants/units";

export default function AddMedicamentoScreen() {
  const [nombre, setNombre] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [concentracionValor, setConcentracionValor] = useState("");
  const [concentracionUnidad, setConcentracionUnidad] = useState("");
  const [posologiaValor, setPosologiaValor] = useState("");
  const [posologiaUnidad, setPosologiaUnidad] = useState("");
  const [comentario, setComentario] = useState("");
  const [activo, setActivo] = useState("");

  const [visibleConcentracion, setVisibleConcentracion] = useState(false);
  const [visiblePosologia, setVisiblePosologia] = useState(false);

  const [items, setItems] = useState([
    { label: "Miligramos (mg)", value: "mg" },
    { label: "Microgramos (mcg)", value: "mcg" },
    { label: "Gramos (g)", value: "g" },
  ]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const guardarMedicamento = async () => {
    if (
      !nombre ||
      !presentacion ||
      !concentracionValor ||
      !concentracionUnidad ||
      !posologiaValor ||
      !posologiaUnidad
    ) {
      Alert.alert("Error", "Faltan campos obligatorios");
      return;
    }

    try {
      await insertarMedicamento({
        id: "",
        nombre,
        presentacion: "",
        concentracionValor: parseFloat(concentracionValor),
        concentracionUnidad,
        posologiaValor: parseFloat(posologiaValor),
        posologiaUnidad,
        comentario,
        activo: Boolean(activo),
      });

      Alert.alert("Éxito", "Medicamento guardado");

      // Limpia el formulario
      setNombre("");
      setPresentacion("");
      setConcentracionValor("");
      setConcentracionUnidad("");
      setPosologiaValor("");
      setPosologiaUnidad("");

      // Navega de vuelta a la pantalla anterior (opcional)
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar medicamento", error);
      Alert.alert("Error", "No se pudo guardar el medicamento");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#fff",
      }}
      enableOnAndroid={true}
      extraScrollHeight={20} // Empuja un poco cuando se abre el teclado
      keyboardShouldPersistTaps="handled"
    >
      {/*Titulo*/}
      <Text style={styles.title}>Agregar Medicamento</Text>
      
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej: Enrofloxacina"
        style={styles.input}
      />

      <Text style={styles.label}>Presentación</Text>
      <TextInput
        value={presentacion}
        onChangeText={setPresentacion}
        placeholder="Ej: tabletas"
        style={styles.input}
      />

      <Text style={styles.label}>Concentración</Text>
      <TextInput
        value={concentracionValor}
        onChangeText={setConcentracionValor}
        placeholder="Ej: 100"
        keyboardType="decimal-pad"
        style={styles.input}
      />
      
      <Text style={styles.label}>Unidad de concentración</Text>
      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={() => setVisibleConcentracion(true)}
      >
        <Text
          style={[
            styles.dropdownText,
            !concentracionUnidad && styles.placeholderText, // aplica estilo si está vacío
          ]}
        >
          {concentracionUnidad || "Selecciona unidad de concentración"}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="gray" />
      </TouchableOpacity>
    
      <Portal>
        <Dialog
          visible={visibleConcentracion}
          onDismiss={() => setVisibleConcentracion(false)}
        >
          <Dialog.Title>Selecciona una unidad</Dialog.Title>
          <Dialog.Content>
            {UNIDADES_CONCENTRACION.map((unidad) => (
              <List.Item
                key={unidad}
                title={unidad}
                onPress={() => {
                  setConcentracionUnidad(unidad);
                  setVisibleConcentracion(false);
                }}
              />
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>
      
      <Text style={styles.label}>Posología</Text>
      <TextInput
        value={posologiaValor}
        onChangeText={setPosologiaValor}
        placeholder="Ej: 5"
        keyboardType="decimal-pad"
        style={styles.input}
      />
      
      <Text style={styles.label}>Unidad de posología</Text>
      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={() => setVisiblePosologia(true)}
      >
        <Text
          style={[
            styles.dropdownText,
            !posologiaUnidad && styles.placeholderText, // aplica estilo si está vacío
          ]}
        >
          {posologiaUnidad || "Selecciona unidad de posología"}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="gray" />
      </TouchableOpacity>
    
      <Portal>
        <Dialog
          visible={visiblePosologia}
          onDismiss={() => setVisiblePosologia(false)}
        >
          <Dialog.Title>Selecciona una unidad</Dialog.Title>
          <Dialog.Content>
            {UNIDADES_POSOLOGIA.map((unidad) => (
              <List.Item
                key={unidad}
                title={unidad}
                onPress={() => {
                  setPosologiaUnidad(unidad);
                  setVisiblePosologia(false);
                }}
              />
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>
      
      {/*Boton*/}
      <TouchableOpacity
        onPress={guardarMedicamento}
        style={styles.botonGuardar}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotonGuardar}>Guardar</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "white",
  },
  picker: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 1,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white", // Fondo blanco
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    color: "#aaa", // gris claro
    fontStyle: "italic", // opcional
    fontWeight: "normal", // evita que se vea en negrita
  },
  botonGuardar: {
    backgroundColor: "#4CAF50", // verde vibrante, puedes cambiar por otro
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // para Android
    marginTop: 20,
  },
  textoBotonGuardar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
