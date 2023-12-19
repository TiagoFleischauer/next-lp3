/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";

import { Title } from "../components/Title";
import { useEffect, useState } from "react";
import { Deputado } from "../types/deputado";
import { fetchDeputado } from "../utils";

export default function EventosDeputado() {
  const props = useSearchParams();

  const [deputadoSelecionado, setDeputadoSelecionado] = useState<Deputado>();

  async function fetchData() {
    const idDeputado = props.get("id");
    if (!idDeputado) {
      return;
    }
    const data = await fetchDeputado(idDeputado);
    if (data) {
      setDeputadoSelecionado(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex flex-1 flex-col p-6">
      {deputadoSelecionado && deputadoSelecionado.eventos.length > 0 ? (
        <>
          <Title text={`Eventos de ${deputadoSelecionado.nome}`} />
          <div className="grid grid-cols-8 gap-4 mt-4">
            {deputadoSelecionado.eventos.map((evento) => {
              return (
                <div
                  key={evento.id}
                  className="bg-white/5 p-3 rounded-md flex flex-col gap-2 hover:bg-white/10"
                >
                  <strong className="font-semibold">
                    {evento.descricaoTipo}
                  </strong>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex h-full justify-center items-center">
          <strong className="font-semibold text-2xl">
            {`Nenhum evento cadastrado ${
              deputadoSelecionado ? `para ${deputadoSelecionado.nome}` : ""
            }`}
          </strong>
        </div>
      )}
    </main>
  );
}
