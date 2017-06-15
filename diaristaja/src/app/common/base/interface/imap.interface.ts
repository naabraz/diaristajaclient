import { IEndereco } from './../interface/iendereco.interface';

export interface IMap {
    id: number;
    nome: string;
    latitude: number;
    longitude: number;
    endereco: IEndereco;
    valorMaximoDiaria: number;
    valorMinimoDiaria: number;
}