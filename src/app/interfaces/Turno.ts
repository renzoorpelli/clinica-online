export interface Turno {
docRef:string;
docRefConsultorio:string | undefined;
docRefEspecialdiad:string | undefined;
docRefPaciente:string |undefined;
docRefProfesional:string | undefined;
estado:EstadoTurno;
fechaTurno: Date;
tipo:Tratamiento;
}


enum EstadoTurno{
  Pendiente,
  Aceptado,
  Rechazado,
  Cancelado,
  Realizado
}

enum Tratamiento{
  Tratamiento,
  Consulta
}
