import { Platform } from "react-native";
import { MedicamentosRepository } from "./MedicamentosRepository";
import { MedicamentosSQLiteRepo } from "./MedicamentosSQLiteRepo";
import { MedicamentosIndexedDBRepo } from "./MedicamentosIndexedDBRepo";

let instancia: MedicamentosRepository | null = null;

export function getMedicamentosRepository(): MedicamentosRepository {
  
  if (instancia) return instancia;

  if (Platform.OS === "web") {
    instancia = new MedicamentosIndexedDBRepo();
  } else {
    instancia = new MedicamentosSQLiteRepo();
  }

  console.log(instancia);
  return instancia;
}
