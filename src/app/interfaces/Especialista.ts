import { Especialidad } from "./Especialidad";
import { Turno } from "./Turno";

export interface Especialista {
  idUsuarioDocRef?: string;
  docRefEspecialista?:string;
  idUsuarioUid?: string;
  nombre?: string;
  apellido?: string;
  edad?: number;
  dni?: string;
  especialidad?: string[];
  especialidades?:Especialidad[];
  mail?: string;
  password?: string;
  imagenPerfil1?: string;
  estado?: string;
  turnos?: Turno[];
}
