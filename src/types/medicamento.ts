export interface iMedicamento {
    id: string,
    nombre: string,
    presentacion: string,
    concentracionValor: number,
    concentracionUnidad: string,
    posologiaValor: number,
    posologiaUnidad: string,
    comentario?: string,
    activo: boolean,
}