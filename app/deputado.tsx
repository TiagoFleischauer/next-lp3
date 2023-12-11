import Image from "next/image";

export default function Deputado() {
  return (
    <>
      <h1 className="font-semibold text-3xl mt-5">Fulano da Silva</h1>
      <div className="grid grid-cols-8 gap-4 mt-4">
        <Image
          src="/test.jpg"
          className="w-full"
          width={120}
          height={120}
          alt="Deputado"
        />
      </div>
    </>
  );
}
