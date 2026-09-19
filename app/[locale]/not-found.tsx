import Link from "next/link";
import { localePath } from "@/i18n";

export default function LocalizedNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold tracking-tight font-[family-name:var(--font-display)]" style={{ color: "var(--c-title)" }}>404</h1>
      <p className="mt-4 text-lg" style={{ color: "var(--c-secondary)" }}>This village path does not exist.</p>
      <Link href={localePath("en")} className="mt-8 px-5 py-2.5 text-sm rounded-full transition-all duration-300 hover:scale-105" style={{ border: "1px solid var(--c-border)", color: "var(--c-body)" }}>Back to App Village</Link>
    </main>
  );
}
