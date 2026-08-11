import type { BlackHoleObject, EditableAppObject } from "@/types/galaxy";
import type { AppContent } from "@/data/tmt";
import BlackHoleVisual from "@/components/BlackHoleVisual";
import DownloadButtons from "@/components/DownloadButtons";
import TmtSection from "@/components/TmtSection";
import { tmt } from "@/data/tmt";
import SectionShell from "./SectionShell";
import CardSide from "./CardSide";
import ObjectContentCard from "./ObjectContentCard";

type Props = {
  obj: BlackHoleObject;
  index: number;
  overlap: number;
  onOpenApp?: (obj: EditableAppObject) => void;
  contentOverrides?: Record<string, AppContent>;
};

export default function BlackHoleSection({
  obj,
  index,
  overlap,
  onOpenApp,
  contentOverrides,
}: Props) {
  const isEven = index % 2 === 0;
  const positioned = {
    ...obj,
    position: { x: isEven ? "58%" : "14%", y: obj.position.y },
  };

  const isApp = obj.downloads.length > 0;
  const override = isApp ? contentOverrides?.[obj.id] ?? tmt[obj.id] : undefined;
  const displayName = override?.name ?? obj.name;
  const displayDesc = override?.description ?? obj.description;
  const tmtEntries = override?.entries ?? [];

  return (
    <SectionShell id={obj.id} index={index} overlap={overlap} sectionHeight={66}>
      <BlackHoleVisual
        obj={positioned}
        onClick={isApp && onOpenApp ? () => onOpenApp(obj) : undefined}
      />
      <CardSide isEven={isEven}>
        <ObjectContentCard
          title={displayName}
          description={displayDesc}
          meta={obj.meta}
          comingSoon={!isApp}
          retired={obj.retired}
          retiredLabel={obj.retiredLabel}
          retiredImage={obj.retiredImage}
          hasBgraw={!!obj.bgrawUrl}
          reportUrl={obj.reportUrl}
        >
          {isApp && <DownloadButtons downloads={obj.downloads} />}
          {isApp && tmtEntries.length > 0 && (
            <TmtSection entries={tmtEntries} />
          )}
        </ObjectContentCard>
      </CardSide>
    </SectionShell>
  );
}
