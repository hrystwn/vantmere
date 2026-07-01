export default function SectionNumeral({ n }: { n: number }) {
  return (
    <span className="font-display text-[clamp(4rem,10vw,9rem)] leading-none text-gray-1 select-none">
      {String(n).padStart(2, "0")}
    </span>
  );
}
