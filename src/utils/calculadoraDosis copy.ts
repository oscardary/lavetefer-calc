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
    console.log(">Concentración:", medicamento.concentracionValor, medicamento.concentracionUnidad);
    console.log(">Posología:", medicamento.posologiaValor, medicamento.posologiaUnidad);

  console.log("Convertir Posología:", posologia.cantidad, posologia.tipo);
  console.log("Convertir Concentración:", concentracion.cantidad, concentracion.tipo);

  console.log(":: cantidad = peso * posologia.cantidad = ", cantidad, posologia.tipo);

  console.log(":: volumen = cantidad / concentracion.cantidad = ", volumen, concentracion.tipo);

  console.log("Resultado:", `${volumen.toFixed(3)} ${concentracion.tipo}`);
};

export const convertirPosologiaAMgPorKg = (
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

export const convertirConcentracionAMgPorMl = (
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
    case "mg/tab":
      return valor;
    default:
      throw new Error(`Unidad de concentración no soportada: ${unidad}`);
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

    return `${volumenML.toFixed(3)} ml`;
  } catch (error: any) {
    console.error("❌ Error en cálculo:", error.message);
    return "Error";
  }
};

export const calcularDosisV2 = (
  medicamento: iMedicamento,
  textoPeso: string
): string => {
  const peso = convertirPeso(textoPeso);
  if (isNaN(peso)) return "...";
  //console.log("\n");
  //console.log("Peso:", peso);
  //console.log("Medicamento:", medicamento.nombre);
  //console.log(medicamento);
  try {
    const posologia = convertirPosologia(
      medicamento.posologiaValor,
      medicamento.posologiaUnidad
    );
    //console.log("Convertir Posología:", posologia.cantidad, posologia.tipo);

    const concentracion = convertirConcentracion(
      medicamento.concentracionValor,
      medicamento.concentracionUnidad
    );
    //console.log("Convertir Concentración:", concentracion.cantidad, concentracion.tipo);

    const cantidad = peso * posologia.cantidad;
    //console.log("cantidad = peso * posologia.cantidad\n");
    //console.log("cantidad = ", peso, "kg *", posologia.cantidad, posologia.tipo, "\n");
    //console.log("cantidad = ", cantidad, posologia.tipo);

    const volumen = cantidad / concentracion.cantidad;
    //console.log("volumen = cantidad / concentracion.cantidad\n");
    //console.log("volumen = ", cantidad, posologia.tipo, "/", concentracion.cantidad, concentracion.tipo, "\n");
    //console.log("volumen = ", volumen, concentracion.tipo);

    //console.log("Resultado:", `${volumen.toFixed(3)} ${concentracion.tipo}`);
    imprimir(peso, medicamento, posologia, concentracion, cantidad, volumen);
    return `${volumen.toFixed(3)} ${concentracion.tipo}`;
  } catch (error: any) {
    console.error("❌ Error en cálculo:", error.message);
    return "Error";
  }
};
