import { galaxies } from "@/data/galaxies";
import GalaxyExplorer from "@/components/GalaxyExplorer";

export default function Home() {
  return <GalaxyExplorer galaxies={galaxies} />;
}
