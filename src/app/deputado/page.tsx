"use client";

import Image from "next/image";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { useSearchParams } from "next/navigation";

export default function Deputado() {
  const props = useSearchParams();
  return (
    <main className="flex flex-1 p-6">
      <Title text="Deputado" />
      <div className="flex flex-1 gap-24 justify-center items-center">
        <div className="flex flex-col gap-2 w-72 bg-white/5 p-3 rounded-md">
          <Image
            src="/test.jpg"
            className="w-full"
            width={256}
            height={256}
            alt={`Deputado`}
          />
          <div className="flex flex-col gap-1">
            <strong className="font-semibold text-2xl">
              {props.get("nomeCivil")}
            </strong>
            <span className="text-lg text-zinc-400">{`Partido: ${props.get(
              "siglaPartido"
            )}`}</span>
            <span className="text-lg text-zinc-400">{`UF: ${props.get(
              "siglaUf"
            )}`}</span>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Button label="Inscrever" path="" />
          <Button label="Ver eventos" path="" color="SECONDARY" />
        </div>
      </div>
    </main>
  );
}
