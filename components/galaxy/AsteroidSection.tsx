"use client";

import type { AsteroidObject } from "@/types/galaxy";
import Asteroid from "@/components/Asteroid";
import DownloadButtons from "@/components/DownloadButtons";
import TmtSection from "@/components/TmtSection";
import { tmt } from "@/data/tmt";
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

  const isApp = !!obj.downloads?.length;
  const override = isApp ? tmt[obj.id] : undefined;
  const displayName = override?.name ?? obj.name;
  const displayDesc = override?.description ?? obj.description ?? obj.hint;
  const tmtEntries = override?.entries ?? [];

  return (
    <SectionShell id={obj.id} index={index} overlap={overlap} sectionHeight={62}>
      <Asteroid obj={positioned} onOpen={onOpen} />
      <CardSide isEven={isEven}>
        <ObjectContentCard
          title={displayName}
          description={displayDesc}
          meta={obj.meta}
          comingSoon={!isApp}
          hasBgraw={!!obj.bgrawUrl}
        >
          {isApp && obj.downloads && (
            <DownloadButtons downloads={obj.downloads} />
          )}
          {isApp && tmtEntries.length > 0 && (
            <TmtSection entries={tmtEntries} />
          )}
        </ObjectContentCard>
      </CardSide>
    </SectionShell>
  );
}
