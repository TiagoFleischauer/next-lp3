import { Deputado } from "../types/deputado";

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
