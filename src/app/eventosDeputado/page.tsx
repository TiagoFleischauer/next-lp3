/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";

import { Title } from "../components/Title";
import { useLayoutEffect, useState } from "react";
import { Deputado } from "../types/deputado";
import { deleteEvent, editEvent, fetchDeputado } from "../utils";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/Button";

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

  async function handleEditEvent(id: number, newName: string | null) {
    if (!newName) {
      return;
    }
    await editEvent(id, newName);
    await fetchData();
  }

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex flex-1 flex-col p-6">
      {deputadoSelecionado && deputadoSelecionado.eventos.length > 0 ? (
        <>
          <Title text={`Eventos de ${deputadoSelecionado.nome}`} />
          <div className="grid grid-cols-5 gap-4 mt-4 items-center">
            {deputadoSelecionado.eventos.map((evento) => {
              return (
                <div
                  key={evento.id}
                  className="bg-white/5 p-6 rounded-md flex gap-2 h-full items-center justify-between"
                >
                  <strong className="text-lg overflow-hidden text-ellipsis">
                    {evento.descricaoTipo}
                  </strong>
                  <div className="flex gap-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-400 p-2 rounded-md"
                      onClick={() => {
                        const newValue = window.prompt(
                          "Digite um novo nome para o evento",
                          evento.descricaoTipo
                        );
                        handleEditEvent(evento.id, newValue);
                      }}
                    >
                      <Pencil />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-400 p-2 rounded-md"
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
                    </button>
                  </div>
                </div>
              );
            })}
            <Link
              href={{
                pathname: "/addToEvent",
                query: { id: deputadoSelecionado.id },
              }}
            >
              <div className="bg-blue-500 hover:bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center">
                <Plus />
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6 h-full justify-center items-center">
          <strong className="font-semibold text-2xl">
            {`Nenhum evento cadastrado ${
              deputadoSelecionado ? `para ${deputadoSelecionado.nome}` : ""
            }`}
          </strong>
          {deputadoSelecionado && (
            <Button
              label="Adicionar"
              onPress={{
                href: {
                  pathname: "/addToEvent",
                  query: { id: deputadoSelecionado.id },
                },
              }}
            />
          )}
        </div>
      )}
    </main>
  );
}
