export interface Gasto {
    _id: string,
    idRelacionado: string[],
    concepto: string,
    cantidad: string,
    importe: string,
    fecha: Date,
    idCreador: string
}