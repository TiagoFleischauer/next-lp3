import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

type ColorProps = "PRIMARY" | "SECONDARY";

type Props = {
  label: string;
  color?: ColorProps;
  onPress: {
    href?: Url;
    onClick?(): void;
  };
  fullWidth?: boolean;
  disabled?: boolean;
};

export function Button({
  color = "PRIMARY",
  label,
  onPress,
  fullWidth = false,
  disabled = false,
}: Props) {
  const customColor =
    color === "PRIMARY"
      ? "bg-green-600 hover:bg-green-500"
      : "bg-sky-600 hover:bg-sky-500";

  const { href, onClick } = onPress;

  return (
    <Link
      href={href ? href : ""}
      className={`flex h-16 ${
        fullWidth ? "w-full" : "w-36"
      } rounded-md justify-center items-center ${customColor} ${
        disabled && "pointer-events-none bg-zinc-500"
      }`}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      onClick={onClick}
    >
      <strong className="font-semibold text-lg">{label}</strong>
    </Link>
  );
}
