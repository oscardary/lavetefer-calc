import { iMedicamento } from "../types/medicamento";

export const MEDICAMENTOS_POR_DEFECTO: iMedicamento[] = [
    { nombre: 'Quercetol Inyectable 12,5%', presentacion: 'ml', concentracionValor: '125', concentracionUnidad: 'mg/ml', posologiaValor: '12,5', posologiaUnidad: 'mg/kg', comentario: '', activo: Boolean(1) },
    { nombre: 'Quercetol Tabletas 100 mg', presentacion: 'tab', concentracionValor: '100', concentracionUnidad: 'mg/tab', posologiaValor: '12,5', posologiaUnidad: 'mg/kg', comentario: '', activo: Boolean(1)  },
    { nombre: 'Neguvon 15 g', presentacion: 'Sobre', concentracionValor: '0,97', concentracionUnidad: 'mcg/ml', posologiaValor: '50', posologiaUnidad: 'mg/kg', comentario: '', activo: Boolean(0) },
    { nombre: 'Xilasyn 2', presentacion: 'Inyectable', concentracionValor: '20', concentracionUnidad: 'mg/ml', posologiaValor: '1', posologiaUnidad: 'mg/kg', comentario: '', activo: Boolean(1) },
    { nombre: 'Anhistan', presentacion: 'Inyectable', concentracionValor: '25', concentracionUnidad: 'mg/ml', posologiaValor: '1', posologiaUnidad: 'mg/kg', comentario: 'Intravenosa lenta', activo: Boolean(1) },
  ];