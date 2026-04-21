type Props = {
  isEven: boolean;
  children: React.ReactNode;
};

export default function CardSide({ isEven, children }: Props) {
  return (
    <div
      className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex max-sm:justify-center"
      style={{ justifyContent: isEven ? "flex-start" : "flex-end" }}
    >
      <div
        className="max-w-[480px] pointer-events-auto"
        style={{ margin: isEven ? "0 0 0 4%" : "0 4% 0 0" }}
      >
        {children}
      </div>
    </div>
  );
}
