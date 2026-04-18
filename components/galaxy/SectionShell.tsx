type Props = {
  index: number;
  overlap: number;
  sectionHeight?: number;
  children: React.ReactNode;
};

export default function SectionShell({
  index,
  overlap,
  sectionHeight = 75,
  children,
}: Props) {
  const isFirst = index === 0;
  return (
    <section
      className="relative flex items-center"
      style={{
        minHeight: `${sectionHeight}vh`,
        marginTop: isFirst ? 0 : `-${overlap}vh`,
        zIndex: 10 + index,
      }}
    >
      {children}
    </section>
  );
}
