type Props = {
  text: string;
};

export function Title({ text }: Props) {
  return <h1 className="font-semibold text-3xl mt-5">{text}</h1>;
}
