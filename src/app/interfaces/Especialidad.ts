export interface Especialidad{
  nombre:string;
  agenda:Agenda;
}

export interface Agenda{
  dia: string;
  desde: number;
  hasta:number;
}
