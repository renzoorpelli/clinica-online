export interface Turno {
idTurnoDocRef?:string;
especialidad?:string | undefined;
docRefPaciente?:string |undefined;
docRefEspecialista?:string | undefined;
estado?:EstadoTurno;
fechaTurno?: string;
tipo?:Tratamiento;
}


export enum EstadoTurno{
  Libre,
  Pendiente,
  Aceptado,
  Rechazado,
  Cancelado,
  Realizado
}

export enum Tratamiento{
  Tratamiento,
  Consulta
}
