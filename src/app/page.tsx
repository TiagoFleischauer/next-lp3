"use client";

import Image from "next/image";
import { fetchDeputados } from "./utils";
import { useEffect, useState } from "react";
import { Deputado } from "./types/deputado";
import Link from "next/link";
import { Title } from "./components/Title";

export default function Home() {
  const [deputados, setDeputados] = useState<Deputado[]>([]);

  async function fetchData() {
    const data = await fetchDeputados();
    if (data && data.length > 0) {
      setDeputados(data);
      for (const deputado of data) {
        console.log(deputado.urlFoto);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-1 p-6">
      <Title text="Deputados" />
      {deputados.length > 0 ? (
        <div className="grid grid-cols-8 gap-4 mt-4">
          {deputados.map((deputado) => {
            return (
              <Link
                key={deputado.id}
                href={{
                  pathname: "/deputado",
                  query: { id: deputado.id },
                }}
                className="bg-white/5 p-3 rounded-md flex flex-col gap-2 hover:bg-white/10"
              >
                <Image
                  src={deputado.urlFoto}
                  className="w-full"
                  width={120}
                  height={120}
                  alt={`Deputado ${deputado.nome}`}
                />
                <strong className="font-semibold">{deputado.nome}</strong>
                <span className="text-sm text-zinc-500">
                  {`${deputado.siglaPartido} | ${deputado.siglaUf}`}
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex h-full justify-center items-center">
          <strong className="font-semibold text-2xl">
            Nenhum deputado encontrado.
          </strong>
        </div>
      )}
    </main>
  );
}
