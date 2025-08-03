//useMedicamentos.ts
import { useEffect, useState, useCallback } from "react";
import { iMedicamentoId } from "../types/medicamento";
import { getMedicamentosRepository } from "../data/repositories/medicamentos/MedicamentosFactory";

type UseMedicamentosOptions = {
  soloActivos?: boolean;
};

export function useMedicamentos(options: UseMedicamentosOptions = {}) {
  const { soloActivos = false } = options;
  const repo = getMedicamentosRepository();
  const [medicamentos, setMedicamentos] = useState<iMedicamentoId[]>([]);

  const cargarMedicamentos = useCallback(async () => {
    try {
      const data = soloActivos
        ? await repo.obtenerFavoritos()
        : await repo.obtenerTodos();
      setMedicamentos(data);
    } catch (error) {
      console.error("Error al cargar medicamentos:", error);
    }
  }, [soloActivos, repo]);

  const actualizarFavorito = useCallback(async (id: number, estadoActual: boolean) => {
    const nuevoEstado = !estadoActual;
    try {
      await repo.actualizarActivo(id, nuevoEstado);
      await cargarMedicamentos();
    } catch (error) {
      console.error("Error al actualizar medicamento:", error);
    }
  }, [cargarMedicamentos]);

  const guardarMedicamento = async (medicamento: iMedicamentoId): Promise<void> => {
    try {
      if (!medicamento.nombre || !medicamento.presentacion || !medicamento.concentracionValor 
          || !medicamento.concentracionUnidad || !medicamento.posologiaValor || !medicamento.posologiaUnidad) {
        throw new Error("Campos obligatorios faltantes");
      }
  
      if (medicamento.id) {
        await repo.actualizar(medicamento);
      } else {
        //delete medicamento.id
        const { id, ...sinId } = medicamento;
        await repo.insertar(sinId);
      }
  
      await cargarMedicamentos(); // Refresca la lista
    } catch (error) {
      console.error("Error al guardar medicamento:", error);
      throw error; // Deja que el componente maneje si quiere
    }
  };

  useEffect(() => {
    cargarMedicamentos();
  }, [cargarMedicamentos]);
  
  return {
    medicamentos,
    cargarMedicamentos,
    actualizarFavorito,
    guardarMedicamento
  };
}
