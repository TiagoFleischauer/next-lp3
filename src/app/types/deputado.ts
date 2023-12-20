import { Event } from "./event";

export type Deputado = {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
  eventos: Event[];
};
