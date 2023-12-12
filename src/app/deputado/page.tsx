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
    <main className="flex flex-1 p-6">
      <Title text="Deputado" />
      <div className="flex flex-1 gap-24 justify-center items-center">
        {deputadoSelecionado && (
          <div className="flex flex-col gap-2 w-72 bg-white/5 p-3 rounded-md">
            <Image
              src="/test.jpg"
              className="w-full"
              width={256}
              height={256}
              alt={`Deputado ${deputadoSelecionado.nomeCivil}`}
            />
            <div className="flex flex-col gap-1">
              <strong className="font-semibold text-2xl">
                {deputadoSelecionado.nomeCivil}
              </strong>
              <span className="text-lg text-zinc-400">{`Partido: ${deputadoSelecionado.siglaPartido}`}</span>
              <span className="text-lg text-zinc-400">{`UF: ${deputadoSelecionado.siglaUf}`}</span>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6">
          <Button label="Inscrever" path="" />
          <Button label="Ver eventos" path="" color="SECONDARY" />
        </div>
      </div>
    </main>
  );
}
