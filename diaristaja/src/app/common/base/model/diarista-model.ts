import { Endereco } from './endereco-model';

export class Diarista {
    id: number;
    uuid: String;
    email: String;
    password: String;
    ddd1: number;
    numero1: number;
    ddd2: number;
    numero2: number;
    endereco: Endereco;
    nome: String;
    sobreNome: String;
    documento: number;
    dataNascimento: number;
    valorMinimoDiaria: number;
    valorMaximoDiaria: number;

    constructor(){}
}

