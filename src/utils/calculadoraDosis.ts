import { iMedicamento } from "../types/medicamento";

export const convertirPeso = (texto: string): number => {
  return parseFloat(texto.trim().replace(",", "."));
};

export const imprimir = (
  peso: number,
  medicamento: iMedicamento,
  posologia: any,
  concentracion: any,
  cantidad: number,
  volumen: number
) => {
  console.log("\n");
  console.log("Peso:", peso, "kg");

  console.log("Medicamento:", medicamento.nombre, medicamento.presentacion);
  console.log(
    ">Concentración:",
    medicamento.concentracionValor,
    medicamento.concentracionUnidad
  );
  console.log(
    ">Posología:",
    medicamento.posologiaValor,
    medicamento.posologiaUnidad
  );

  console.log("Convertir Posología:", posologia.cantidad, posologia.tipo);
  console.log(
    "Convertir Concentración:",
    concentracion.cantidad,
    concentracion.tipo
  );

  console.log(
    ":: cantidad = peso * posologia.cantidad = ",
    cantidad,
    posologia.tipo
  );

  console.log(
    ":: volumen = cantidad / concentracion.cantidad = ",
    volumen,
    concentracion.tipo
  );

  console.log("Resultado:", `${volumen.toFixed(3)} ${concentracion.tipo}`);
};

export const convertirPosologia = (
  valor: number,
  unidad: string
): { cantidad: number; tipo: "mg" } => {
  switch (unidad) {
    case "mg/kg":
      return { cantidad: valor, tipo: "mg" };
    case "mcg/kg":
      return { cantidad: valor / 1000, tipo: "mg" };
    case "g/kg":
      return { cantidad: valor * 1000, tipo: "mg" };
    default:
      throw new Error(`Unidad de posología no soportada: ${unidad}`);
  }
};

export const convertirConcentracion = (
  valor: number,
  unidad: string
): { cantidad: number; tipo: "ml" | "tab" } => {
  switch (unidad) {
    case "mg/ml":
      return { cantidad: valor, tipo: "ml" };
    case "mcg/ml":
      return { cantidad: valor / 1000, tipo: "ml" };
    case "g/ml":
      return { cantidad: valor * 1000, tipo: "ml" };
    case "mg/tab":
      return { cantidad: valor, tipo: "tab" };
    default:
      throw new Error(`Unidad de concentración no soportada: ${unidad}`);
  }
};

export const calcularDosis = (
  medicamento: iMedicamento,
  textoPeso: string
): string => {
  const peso = convertirPeso(textoPeso);
  if (isNaN(peso)) return "...";

  try {
    const posologia = convertirPosologia(
      medicamento.posologiaValor,
      medicamento.posologiaUnidad
    );

    const concentracion = convertirConcentracion(
      medicamento.concentracionValor,
      medicamento.concentracionUnidad
    );

    const cantidad = peso * posologia.cantidad;
    const volumen = cantidad / concentracion.cantidad;

    //Imprimir valores por consola para pruebas
    imprimir(peso, medicamento, posologia, concentracion, cantidad, volumen);

    return `${volumen.toFixed(3)} ${concentracion.tipo}`;
  } catch (error: any) {
    console.error("❌ Error en cálculo:", error.message);
    return "Error";
  }
};
