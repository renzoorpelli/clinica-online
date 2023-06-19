import { Turno } from "./Turno";

export interface Paciente {
  idUsuarioDocRef?: string;
  docRefPaciente?:string;
  idUsuarioUid?: string;
  nombre?: string;
  apellido?: string;
  edad?: number;
  dni?: string;
  obraSocial: string;
  mail?: string;
  password?: string;
  imagenPerfil1?: string;
  imagenPerfil2?: string;
  estado:string;
  turnos?:Turno[];
  historiaClinica?:any;
}
