import type { PlanetObject } from "@/types/galaxy";
import type { AppContent } from "@/data/tmt";
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
  onPlanetClick?: (obj: PlanetObject) => void;
  contentOverrides?: Record<string, AppContent>;
};

export default function PlanetSection({
  obj,
  index,
  overlap,
  onPlanetClick,
  contentOverrides,
}: Props) {
  const isEven = index % 2 === 0;
  const planet = {
    ...obj.planet,
    position: { x: isEven ? "62%" : "12%", y: obj.planet.position.y },
  };

  const override = contentOverrides?.[obj.id] ?? tmt[obj.id];
  const displayName = override?.name ?? obj.name;
  const displayDesc = override?.description ?? obj.description;
  const tmtEntries = override?.entries ?? [];

  return (
    <SectionShell id={obj.id} index={index} overlap={overlap} sectionHeight={72}>
      <Planet
        {...planet}
        onClick={
          !obj.comingSoon && onPlanetClick
            ? () => onPlanetClick(obj)
            : undefined
        }
      />
      <CardSide isEven={isEven}>
        <ObjectContentCard
          title={displayName}
          description={displayDesc}
          meta={obj.meta}
          comingSoon={obj.comingSoon}
          macOnly={obj.macOnly}
          hasBgraw={!!obj.bgrawUrl}
        >
          {obj.downloads.length > 0 && (
            <DownloadButtons downloads={obj.downloads} />
          )}
          {!obj.comingSoon && tmtEntries.length > 0 && (
            <TmtSection entries={tmtEntries} />
          )}
        </ObjectContentCard>
      </CardSide>
    </SectionShell>
  );
}
