import { IEndereco } from './iendereco.interface';

export interface IDiarista {
  id: number;
  uuid: string;
  email: string;
  ddd1: number;
  numero1: number;
  ddd2: number;
  numero2: number;
  endereco: IEndereco;
  nome: string;
  sobreNome: string;
  documento: number;
  dataNascimento: number;
  valorMinimoDiaria: number;
  valorMaximoDiaria: number;
}
