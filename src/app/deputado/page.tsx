import Image from "next/image";
import { Button } from "../components/Button";
import { Title } from "../components/Title";

export default function Deputado() {
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
            <strong className="font-semibold text-2xl">Fulano da Silva</strong>
            <span className="text-lg text-zinc-400">Partido: TF</span>
            <span className="text-lg text-zinc-400">UF: RS</span>
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
