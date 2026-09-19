import "../globals.css";

export default function LegacyPrivacyLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body><main className="relative z-10">{children}</main></body></html>;
}
