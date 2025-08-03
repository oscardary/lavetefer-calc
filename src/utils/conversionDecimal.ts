/**
 * Convierte un string con coma o punto decimal a número.
 * Ejemplo: "1,5" -> 1.5
 */
export function convertirDecimal(texto: string): number | null {
  const limpio = texto.replace(",", ".");
  const numero = parseFloat(limpio);

  return isNaN(numero) ? null : numero;
}

/**
 * Verifica si el input es un número válido (considerando coma o punto como decimal)
 */
export function esDecimalValido(texto: string): boolean {
  return !isNaN(parseFloat(texto.replace(",", ".")));
}

/**
 * Convierte un número a string con separador decimal personalizable
 * Ejemplo: 1.5 -> "1,5" si se elige separador ","
 */
export function numeroAString(
  valor: number,
  separador: "." | "," = "."
): string {
  const texto = valor.toString();
  return separador === "," ? texto.replace(".", ",") : texto;
}
