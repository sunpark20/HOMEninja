import type { NebulaObject } from "@/types/galaxy";
import NebulaOrb from "@/components/NebulaOrb";
import SectionShell from "./SectionShell";
import CardSide from "./CardSide";
import ObjectContentCard from "./ObjectContentCard";

type Props = {
  obj: NebulaObject;
  index: number;
  overlap: number;
};

export default function NebulaSection({ obj, index, overlap }: Props) {
  const isEven = index % 2 === 0;
  const positioned = {
    ...obj,
    position: { x: isEven ? "60%" : "14%", y: obj.position.y },
  };

  return (
    <SectionShell index={index} overlap={overlap} sectionHeight={68}>
      <NebulaOrb obj={positioned} />
      <CardSide isEven={isEven}>
        <ObjectContentCard
          title={obj.name}
          description={obj.hint}
          comingSoon
        />
      </CardSide>
    </SectionShell>
  );
}
