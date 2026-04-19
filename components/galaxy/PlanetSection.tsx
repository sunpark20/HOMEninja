import type { PlanetObject } from "@/types/galaxy";
import Planet from "@/components/Planet";
import DownloadButtons from "@/components/DownloadButtons";
import TmtSection from "@/components/TmtSection";
import { tmt } from "@/data/tmt";
import SectionShell from "./SectionShell";
import CardSide from "./CardSide";
import ObjectContentCard from "./ObjectContentCard";

type Props = {
  obj: PlanetObject;
  index: number;
  overlap: number;
};

export default function PlanetSection({ obj, index, overlap }: Props) {
  const isEven = index % 2 === 0;
  const planet = {
    ...obj.planet,
    position: { x: isEven ? "62%" : "12%", y: obj.planet.position.y },
  };

  return (
    <SectionShell id={obj.id} index={index} overlap={overlap} sectionHeight={72}>
      <Planet {...planet} />
      <CardSide isEven={isEven}>
        <ObjectContentCard
          title={obj.name}
          description={obj.description}
          meta={obj.meta}
          comingSoon={obj.comingSoon}
        >
          {obj.downloads.length > 0 && (
            <DownloadButtons downloads={obj.downloads} />
          )}
          {!obj.comingSoon && (
            <TmtSection appId={obj.id} entries={tmt[obj.id] ?? []} />
          )}
        </ObjectContentCard>
      </CardSide>
    </SectionShell>
  );
}
