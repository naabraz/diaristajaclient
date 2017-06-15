import { IEndereco } from './iendereco.interface';

export interface IDiarista {
    id: number;
    uuid: String;
    email: String;
    ddd1: number;
    numero1: number;
    ddd2: number,
    numero2: number,
    endereco: IEndereco;
    nome: String;
    sobreNome: String;
    documento: number;
    dataNascimento: number;
}