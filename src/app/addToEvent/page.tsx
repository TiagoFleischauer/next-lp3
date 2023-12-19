/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { Title } from "../components/Title";

import { Deputado } from "../types/deputado";
import { fetchDeputado, fetchEventos } from "../utils";
import { Event } from "../types/event";
import { Button } from "../components/Button";

export default function AddToEvent() {
  const props = useSearchParams();

  const [deputadoSelecionado, setDeputadoSelecionado] = useState<Deputado>();
  const [eventos, setEventos] = useState<Event[]>([]);
  const [eventoSelecionado, setEventoSelecionado] = useState("");

  async function fetchData() {
    const id = props.get("id");
    if (!id) {
      return;
    }
    const data = await fetchDeputado(id);
    if (data) {
      setDeputadoSelecionado(data);
    }
    const eventos = await fetchEventos();
    if (eventos) {
      let uniqueNames: { [key: string]: boolean } = {};
      let result: Event[] = [];

      for (const evento of eventos) {
        if (!uniqueNames[evento.descricaoTipo]) {
          uniqueNames[evento.descricaoTipo] = true;
          result.push(evento);
        }
      }
      setEventos(result);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(eventoSelecionado);
  }, [eventoSelecionado]);

  return (
    <main className="flex flex-1 flex-col p-6">
      <Title text="Inscrever em Evento" />
      <div className="flex flex-1 gap-24 justify-center items-center">
        {deputadoSelecionado ? (
          <>
            <div className="flex flex-col gap-2 w-72 bg-white/5 p-3 rounded-md">
              <Image
                src="/test.jpg"
                className="w-full"
                width={256}
                height={256}
                alt={`Deputado ${deputadoSelecionado.nome}`}
              />
              <div className="flex flex-col gap-1">
                <strong className="font-semibold text-2xl">
                  {deputadoSelecionado.nome}
                </strong>
                <span className="text-lg text-zinc-400">{`Partido: ${deputadoSelecionado.siglaPartido}`}</span>
                <span className="text-lg text-zinc-400">{`UF: ${deputadoSelecionado.siglaUf}`}</span>
              </div>
            </div>
            <div className="flex flex-col gap-6 items-center">
              {eventos.length > 0 ? (
                <select
                  name="select"
                  className="flex items-center w-64 h-16 bg-zinc-200 px-4 text-zinc-950 font-semibold rounded-md"
                  onChange={(e) => {
                    setEventoSelecionado(e.target.value);
                  }}
                  defaultValue={"placeholder"}
                >
                  <option value="placeholder" disabled hidden>
                    Selecione o evento
                  </option>
                  {eventos.map((evento) => {
                    return (
                      <option
                        key={evento.id}
                        className="bg-zinc-200"
                        value={evento.id}
                      >
                        {evento.descricaoTipo}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <div className="flex items-center w-64 h-16 bg-zinc-200 px-4 text-zinc-950 font-semibold rounded-md">
                  <span>Carregando...</span>
                </div>
              )}
              <Button
                label="Inscrever"
                onPress={{
                  href: {
                    pathname: "/eventosDeputado",
                    query: {
                      id: deputadoSelecionado.id,
                    },
                  },
                }}
                fullWidth
                color="SECONDARY"
                disabled={!eventoSelecionado}
              />
            </div>
          </>
        ) : (
          <strong className="font-semibold text-2xl">
            Deputado não encontrado.
          </strong>
        )}
      </div>
    </main>
  );
}
