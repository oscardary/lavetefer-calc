import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import { List, Dialog, Portal } from "react-native-paper";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"; // o Ionicons
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";

import { insertarMedicamento, actualizarMedicamentoPorId } from "../database/medicamento-service";

import { MedicamentoStackParamList } from "../navigation/MedicamentoStackNavigator"
import { UNIDADES_CONCENTRACION, UNIDADES_POSOLOGIA } from "../constants/units";

type MedicamentoFormScreenRouteProp = RouteProp<MedicamentoStackParamList, "MedicamentoFormScreen">;

export default function MedicamentoFormScreen() {
  const route = useRoute<MedicamentoFormScreenRouteProp>();
  const medicamento = route.params?.medicamento;

  const [nombre, setNombre] = useState(medicamento?.nombre || "");
  const [presentacion, setPresentacion] = useState(medicamento?.presentacion || "");
  const [concentracionValor, setConcentracionValor] = useState(medicamento?.concentracionValor.toString() || "");
  const [concentracionUnidad, setConcentracionUnidad] = useState(medicamento?.concentracionUnidad || "");
  const [posologiaValor, setPosologiaValor] = useState(medicamento?.posologiaValor.toString() || "");
  const [posologiaUnidad, setPosologiaUnidad] = useState(medicamento?.posologiaUnidad || "");
  const [comentario, setComentario] = useState(medicamento?.comentario || "");
  const [activo, setActivo] = useState<boolean>(medicamento?.activo ?? true);


  const [visibleConcentracion, setVisibleConcentracion] = useState(false);
  const [visiblePosologia, setVisiblePosologia] = useState(false);

  // dentro del componente MedicamentoFormScreen
  const navigation = useNavigation();

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
      if (medicamento?.id) {
        console.log("voy a actualizar...");
        await actualizarMedicamentoPorId(medicamento.id, 
          {
            nombre,
            presentacion,
            concentracionValor: parseFloat(concentracionValor),
            concentracionUnidad,
            posologiaValor: parseFloat(posologiaValor),
            posologiaUnidad,
            comentario,
            activo: Boolean(activo),
          });

      } else {
        console.log("voy a insertar...");
        await insertarMedicamento({
          nombre,
          presentacion,
          concentracionValor: parseFloat(concentracionValor),
          concentracionUnidad,
          posologiaValor: parseFloat(posologiaValor),
          posologiaUnidad,
          comentario,
          activo: Boolean(activo),
        });
      }

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Crear / Editar Medicamento
              </Text>
              {/* Aquí irán los inputs */}
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

              <Text style={styles.label}>Comentario</Text>
              <TextInput
                value={comentario}
                onChangeText={setComentario}
                placeholder="Ej: Texto descriptivo"
                style={styles.input}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 16,
                }}
              >
                <Text style={{ fontSize: 16, marginRight: 12 }}>
                  Agregar a Mi Lista
                </Text>
                <TouchableOpacity onPress={() => setActivo(activo)}>
                  <MaterialCommunityIcons
                    name="heart"
                    size={45}
                    color={activo ? "#4CAF50" : "#ccc"}
                  />
                </TouchableOpacity>
              </View>

              {/*Boton*/}
              <TouchableOpacity
                onPress={guardarMedicamento}
                style={styles.botonGuardar}
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotonGuardar}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
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
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
    flexGrow: 1,
  },
});
