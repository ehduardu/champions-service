import ChampionsController from '@controllers/ChampionsController';

export interface IModelLeagueOfLegendsProvider {
  getChampions(): Promise<IResponse>;
}

type NAMES = 'Aatrox' | 'Ahri' | 'Akali' | 'Akshan' | 'Alistar' | 'Amumu'

export interface IResponse {
  type: string;
  format: string;
  version: string;
  data: {
    [K in NAMES]: IChampion;
  };
}

export interface IChampion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: INFO;
  image: IMAGE;
}

type INFO = {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

type IMAGE = {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export enum TypeEnum {
  FIGHTER = 'Fighter',
  TANK = 'Tank'
}
