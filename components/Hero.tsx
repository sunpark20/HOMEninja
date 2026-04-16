import Image from "next/image";
import Link from "next/link";
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

      <div
        className="mt-8 flex flex-wrap justify-center gap-4 text-xs"
        style={{ color: "oklch(0.4 0.01 260)" }}
      >
        <a
          href="mailto:sun.park20@gmail.com"
          className="transition-colors duration-200 hover:text-white/60"
        >
          sun.park20@gmail.com
        </a>
        <a
          href="https://x.com/ppjp334"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 hover:text-white/60"
        >
          @ppjp334
        </a>
        <Link
          href="/privacy"
          className="transition-colors duration-200 hover:text-white/60"
        >
          개인정보처리방침
        </Link>
      </div>
      <p
        className="mt-2 text-xs"
        style={{ color: "oklch(0.35 0.01 260)" }}
      >
        &copy; {new Date().getFullYear()} NINJA TURTLE(SUN)
      </p>

      <ScrollIndicator />
    </section>
  );
}
