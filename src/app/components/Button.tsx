import Link from "next/link";

type ColorProps = "PRIMARY" | "SECONDARY";

type Props = {
  label: string;
  color?: ColorProps;
  path: string;
};

export function Button({ color = "PRIMARY", label, path }: Props) {
  const customColor =
    color === "PRIMARY"
      ? "bg-green-600 hover:bg-green-500"
      : "bg-sky-600 hover:bg-sky-500";

  return (
    <Link
      href={path}
      className={`flex h-16 w-44 rounded-md justify-center items-center ${customColor}`}
    >
      <strong className="font-semibold text-lg">{label}</strong>
    </Link>
  );
}
