"use client";

import type { AsteroidObject } from "@/types/galaxy";
import Asteroid from "@/components/Asteroid";
import SectionShell from "./SectionShell";
import CardSide from "./CardSide";
import ObjectContentCard from "./ObjectContentCard";

type Props = {
  obj: AsteroidObject;
  index: number;
  overlap: number;
  onOpen: (obj: AsteroidObject) => void;
};

export default function AsteroidSection({ obj, index, overlap, onOpen }: Props) {
  const isEven = index % 2 === 0;
  const positioned = {
    ...obj,
    position: { x: isEven ? "60%" : "14%", y: obj.position.y },
  };

  return (
    <SectionShell id={obj.id} index={index} overlap={overlap} sectionHeight={62}>
      <Asteroid obj={positioned} onOpen={onOpen} />
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
