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

export async function addEventToDeputado(evento: string, idDeputado: number) {
  try {
    const response = await fetch(`${url}/${idDeputado}/eventos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: evento,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteEvent(idEvento: number) {
  try {
    const response = await fetch(`${url}/eventos/${idEvento}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function editEvent(idEvento: number, newName: string) {
  try {
    const response = await fetch(`${url}/eventos/${idEvento}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: idEvento, descricaoTipo: newName }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
