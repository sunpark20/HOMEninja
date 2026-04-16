import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative z-10 py-16 px-6 text-center"
      style={{ color: "oklch(0.4 0.01 260)" }}
    >
      <div className="max-w-5xl mx-auto space-y-3">
        <div className="flex flex-wrap justify-center gap-4 text-xs">
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
        <p className="text-xs" style={{ color: "oklch(0.35 0.01 260)" }}>
          &copy; {new Date().getFullYear()} NINJA TURTLE(SUN)
        </p>
      </div>
    </footer>
  );
}
