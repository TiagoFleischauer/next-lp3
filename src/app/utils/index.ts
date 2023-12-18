import { Deputado } from "../types/deputado";
import { Event } from "../types/event";

const url = "http://localhost:8080/deputados";

export async function fetchDeputados(): Promise<Deputado[] | undefined> {
  try {
    const response = await fetch(url);
    const result: Deputado[] = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDeputado(id: string): Promise<Deputado | undefined> {
  try {
    const response = await fetch(`${url}/${id}`);
    const result: Deputado = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchEventos(): Promise<Event[] | undefined> {
  try {
    const response = await fetch(
      "https://dadosabertos.camara.leg.br/api/v2/eventos?ordem=ASC&ordenarPor=dataHoraInicio"
    );
    const result = await response.json();
    return result.dados;
  } catch (error) {
    console.log(error);
  }
}
