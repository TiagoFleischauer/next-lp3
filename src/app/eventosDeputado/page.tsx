/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";

import { Title } from "../components/Title";
import { useEffect, useState } from "react";
import { Deputado } from "../types/deputado";
import { deleteEvent, fetchDeputado } from "../utils";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EventosDeputado() {
  const props = useSearchParams();

  const idDeputado = props.get("id");
  const [deputadoSelecionado, setDeputadoSelecionado] = useState<Deputado>();

  async function fetchData() {
    if (!idDeputado) {
      return;
    }
    const data = await fetchDeputado(idDeputado);
    if (data) {
      setDeputadoSelecionado(data);
    }
  }

  async function handleDeleteEvent(id: number) {
    await deleteEvent(id);
    await fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex flex-1 flex-col p-6">
      {deputadoSelecionado && deputadoSelecionado.eventos.length > 0 ? (
        <>
          <Title text={`Eventos de ${deputadoSelecionado.nome}`} />
          <div className="grid grid-cols-5 gap-4 mt-4">
            {deputadoSelecionado.eventos.map((evento) => {
              return (
                <div
                  key={evento.id}
                  className="bg-white/5 p-6 rounded-md flex gap-2 items-center justify-between"
                >
                  <strong className="text-lg overflow-hidden text-ellipsis">
                    {evento.descricaoTipo}
                  </strong>
                  <div className="flex gap-3">
                    <Link
                      className="bg-blue-500 hover:bg-blue-400 p-2 rounded-md"
                      href={""}
                    >
                      <Pencil />
                    </Link>
                    <Link
                      className="bg-red-500 hover:bg-red-400 p-2 rounded-md"
                      href={""}
                      onClick={() => {
                        const confirmed = window
                          .confirm(
                            "Tem certeza que deseja deletar esse evento?"
                          )
                          .valueOf();
                        if (confirmed) {
                          handleDeleteEvent(evento.id);
                        }
                      }}
                    >
                      <Trash2 />
                    </Link>
                  </div>
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
