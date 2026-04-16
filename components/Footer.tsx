import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative z-10 py-16 px-6 text-center"
      style={{ color: "oklch(0.45 0.01 260)" }}
    >
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex justify-center gap-6 text-sm">
          <a
            href="mailto:contact@example.com"
            className="transition-colors duration-200 hover:text-white/70"
          >
            이메일
          </a>
          <Link
            href="/privacy"
            className="transition-colors duration-200 hover:text-white/70"
          >
            개인정보처리방침
          </Link>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} Sunguk Park</p>
      </div>
    </footer>
  );
}
