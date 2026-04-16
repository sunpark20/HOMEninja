import { apps } from "@/data/apps";
import Hero from "@/components/Hero";
import AppSection from "@/components/AppSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero apps={apps} />
      {apps.map((app, i) => (
        <AppSection key={app.id} app={app} index={i} />
      ))}
      <Footer />
    </>
  );
}
