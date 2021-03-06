import { Endereco } from './endereco-model';
import { Restricao } from 'app/common/base/model/restricao-model';

export class Diarista {
  id: number;
  uuid: string;
  email: string;
  password: string;
  ddd1: number;
  numero1: number;
  ddd2: number;
  numero2: number;
  endereco: Endereco;
  nome: string;
  sobreNome: string;
  documento: number;
  dataNascimento: number;
  valorMinimoDiaria: number;
  valorMaximoDiaria: number;
  restricoes: Restricao[];

  constructor() { }
}

