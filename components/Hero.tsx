import Image from "next/image";
import type { AppData } from "@/types/app";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero({ apps }: { apps: AppData[] }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="NinjaTurtle 로고"
          width={48}
          height={48}
          className="w-12 h-12 object-contain"
          style={{
            mixBlendMode: "lighten",
            WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 70%)",
            maskImage: "radial-gradient(circle, black 40%, transparent 70%)",
          }}
          priority
        />
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-[family-name:var(--font-display)]"
          style={{
            color: "oklch(0.95 0.005 260)",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
          }}
        >
          NinjaTurtle
        </h1>
      </div>
      <p
        className="mt-4 text-center max-w-md"
        style={{
          color: "oklch(0.6 0.01 260)",
          fontSize: "clamp(0.9rem, 2.5vw, 1.125rem)",
        }}
      >
        앱으로 세상을 조금 더 편하게
      </p>

      <nav className="mt-8 flex flex-wrap gap-3 justify-center">
        {apps.map((app) => (
          <a
            key={app.id}
            href={`#${app.id}`}
            className="px-4 py-2 text-sm rounded-full transition-all duration-300 hover:scale-105"
            style={{
              border: "1px solid oklch(0.3 0.01 260)",
              color: "oklch(0.7 0.01 260)",
            }}
          >
            {app.name}
          </a>
        ))}
      </nav>

      <ScrollIndicator />
    </section>
  );
}
