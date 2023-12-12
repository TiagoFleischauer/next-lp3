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
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex-1 p-6">
      <Title text="Deputados" />
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
                src="/test.jpg"
                className="w-full"
                width={120}
                height={120}
                alt={`Deputado ${deputado.nomeCivil}`}
              />
              <strong className="font-semibold">{deputado.nomeCivil}</strong>
              <span className="text-sm text-zinc-500">
                {`${deputado.siglaPartido} | ${deputado.siglaUf}`}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
