/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { Button } from "../components/Button";
import { Title } from "../components/Title";

import { Deputado } from "../types/deputado";
import { fetchDeputado } from "../utils";

export default function Deputado() {
  const props = useSearchParams();

  const [deputadoSelecionado, setDeputadoSelecionado] = useState<Deputado>();

  async function fetchData() {
    const id = props.get("id");
    if (!id) {
      return;
    }
    const data = await fetchDeputado(id);
    if (data) {
      setDeputadoSelecionado(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex flex-1 flex-col p-6">
      <Title text="Deputado" />
      <div className="flex flex-1 gap-24 justify-center items-center">
        {deputadoSelecionado ? (
          <>
            <div className="flex flex-col gap-2 w-64 bg-white/5 p-3 rounded-md">
              <img
                src={deputadoSelecionado.urlFoto}
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
            <div className="flex flex-col gap-6">
              <Button
                label="Inscrever"
                onPress={{
                  href: {
                    pathname: "/addToEvent",
                    query: { id: deputadoSelecionado.id },
                  },
                }}
              />
              <Button
                label="Ver eventos"
                onPress={{
                  href: {
                    pathname: "/eventosDeputado",
                    query: {
                      id: deputadoSelecionado.id,
                    },
                  },
                }}
                color="SECONDARY"
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
