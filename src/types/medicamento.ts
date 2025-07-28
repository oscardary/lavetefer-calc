export interface iMedicamento {
    nombre: string,
    presentacion: string,
    concentracionValor: number,
    concentracionUnidad: string,
    posologiaValor: number,
    posologiaUnidad: string,
    comentario: string,
    activo: boolean,
}

export interface iMedicamentoId extends iMedicamento {
    id: number;
}