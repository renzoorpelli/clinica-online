export interface Especialista {
  docRefUsuario?: string;
  docRefEspecialista?:string;
  idUsuarioUid?: string;
  nombre?: string;
  apellido?: string;
  edad?: number;
  dni?: string;
  especialidad?: string | string[];
  mail?: string;
  password?: string;
  perfilImagen?: string;
  estado: string;
}
