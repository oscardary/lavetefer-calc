import { iMedicamento } from "../types/medicamento";
import { convertirDecimal, esDecimalValido, numeroAString } from "../utils/conversionDecimal";

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

const convertirPosologia = (
  valor: number,
  unidad: string
): { cantidad: number; tipo: "mg" | "UI" } => {
  switch (unidad) {
    case "mg/kg":
      return { cantidad: valor, tipo: "mg" };
    case "mcg/kg":
      return { cantidad: valor / 1000, tipo: "mg" };
    case "g/kg":
      return { cantidad: valor * 1000, tipo: "mg" };
    case "UI/kg":
      return { cantidad: valor, tipo: "UI" }
    default:
      throw new Error(`Unidad de posología no soportada: ${unidad}`);
  }
};

const convertirConcentracion = (
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
    case "UI/ml":
      return { cantidad: valor, tipo: "ml" };
    default:
      throw new Error(`Unidad de concentración no soportada: ${unidad}`);
  }
};

function decimalAFraccion(decimal: number, maxDenominador = 2): [number, number] {
  let numerador = 1;
  let denominador = 1;
  let mejorError = Math.abs(decimal - numerador / denominador);
  console.log("mejorErorr:", mejorError);

  for (let d = 1; d <= maxDenominador; d++) {
    const n = Math.round(decimal * d);
    const error = Math.abs(decimal - n / d);

    if (error < mejorError) {
      numerador = n;
      denominador = d;
      mejorError = error;
    }

    if (error === 0) break;
  }

  return [numerador, denominador];
}

function decimalATabletaFraccion(decimal: number): string {
  const entero = Math.floor(decimal);
  const fraccion = decimal - entero;

  if (fraccion < 0.01) return `${entero}`;

  const [num, den] = decimalAFraccion(fraccion);
  const fraccionTexto = `${num}/${den}`;

  return entero > 0 ? `${entero} ${fraccionTexto}` : fraccionTexto;
}


export const calcularDosis = (
  medicamento: iMedicamento,
  textoPeso: string
): string => {
  const peso = convertirDecimal(textoPeso);
  if (peso === null) return "...";

  try {
    const posologiaValor = convertirDecimal(medicamento.posologiaValor)
    if (posologiaValor === null) return "Error posologiaValor";

    const posologia = convertirPosologia(
      posologiaValor,
      medicamento.posologiaUnidad
    );

    const concentracionValor = convertirDecimal(medicamento.concentracionValor)
    if (concentracionValor === null) return "Error concentracionValor";

    const concentracion = convertirConcentracion(
      concentracionValor,
      medicamento.concentracionUnidad
    );

    const cantidad = peso * posologia.cantidad;
    const volumen = (cantidad / concentracion.cantidad);

    //const resultado = concentracion.tipo === 'tab' ? decimalATabletaFraccion(volumen) : volumen.toFixed(3)

    //Imprimir valores por consola para pruebas
    imprimir(peso, medicamento, posologia, concentracion, cantidad, volumen);

    /*if (concentracion.tipo === 'tab') {
      return `${decimalATabletaFraccion(volumen)} ${concentracion.tipo}`;
    }*/
    //return `${volumen.toFixed(3)} ${concentracion.tipo}`;
    return `${numeroAString(volumen, ',')} ${concentracion.tipo}`;
    //return `${resultado} ${concentracion.tipo}`;
    
  } catch (error: any) {
    console.error("❌ Error en cálculo:", error.message);
    return "Error";
  }
};
